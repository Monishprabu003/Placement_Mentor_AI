"""
PlacementMentorAI - Flask Application
Phase 1: Placement Score Prediction (Random Forest)
Phase 2: Interview Behaviour Analysis (YOLO26-Pose + Behaviour Classifier)
"""

import os
import re
import sqlite3
import pickle
import traceback
from pathlib import Path
from datetime import datetime, timedelta, timezone
from functools import wraps

import jwt
from flask import (
    Flask, render_template, request, jsonify, g,
    redirect, url_for, send_from_directory
)
from flask_cors import CORS
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

import numpy as np
import pandas as pd

# ─────────────────────────────────────────────
# App Configuration
# ─────────────────────────────────────────────
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100 MB max upload
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET', 'placement-mentor-ai-secret-key-2026')
app.config['JWT_EXPIRATION_HOURS'] = 24

app.config['UPLOAD_FOLDER'] = os.path.join(os.path.dirname(__file__), 'uploads')
app.config['OUTPUT_FOLDER'] = os.path.join(os.path.dirname(__file__), 'cv_module', 'outputs')

ALLOWED_IMAGE_EXTENSIONS = {'jpg', 'jpeg', 'png'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

# Ensure directories exist
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)
os.makedirs(app.config['OUTPUT_FOLDER'], exist_ok=True)

# ─────────────────────────────────────────────
# SQLite Database Setup (users.db)
# ─────────────────────────────────────────────
DB_PATH = os.path.join(os.path.dirname(__file__), 'users.db')


def get_db():
    """Get a database connection for the current request."""
    if 'db' not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db


@app.teardown_appcontext
def close_db(exception):
    """Close database connection at end of request."""
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    """Initialize the users table if it doesn't exist."""
    conn = sqlite3.connect(DB_PATH)
    conn.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT (datetime('now'))
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Users database initialized")


init_db()


# ─────────────────────────────────────────────
# JWT Authentication Helpers
# ─────────────────────────────────────────────

def generate_token(user_id, email, name):
    """Generate a JWT token for an authenticated user."""
    payload = {
        'user_id': user_id,
        'email': email,
        'name': name,
        'exp': datetime.now(timezone.utc) + timedelta(hours=app.config['JWT_EXPIRATION_HOURS']),
        'iat': datetime.now(timezone.utc),
    }
    return jwt.encode(payload, app.config['JWT_SECRET_KEY'], algorithm='HS256')


def token_required(f):
    """Decorator that protects a route with JWT authentication."""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization', '')
        if auth_header.startswith('Bearer '):
            token = auth_header.split(' ', 1)[1]

        if not token:
            return jsonify({'error': 'Authentication token is missing'}), 401

        try:
            payload = jwt.decode(token, app.config['JWT_SECRET_KEY'], algorithms=['HS256'])
            request.current_user = payload
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired, please login again'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid authentication token'}), 401

        return f(*args, **kwargs)
    return decorated

# ─────────────────────────────────────────────
# Phase 1: Load Placement Prediction Model
# ─────────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'model.pkl')

placement_model = None
try:
    with open(MODEL_PATH, 'rb') as f:
        placement_model = pickle.load(f)
    print(f"✅ Placement model loaded from {MODEL_PATH}")
except Exception as e:
    print(f"⚠️  Could not load placement model: {e}")

FEATURES = [
    'CGPA', 'Python_Skill', 'Java_Skill', 'SQL_Skill', 'DSA_Skill',
    'Web_Development_Skill', 'Cloud_Skill', 'ML_Skill', 'Cybersecurity_Skill',
    'Aptitude_Score', 'Communication_Skill', 'Problem_Solving_Skill',
    'Confidence_Level', 'Projects_Count', 'Certifications_Count'
]

# ─────────────────────────────────────────────
# Phase 2: Lazy-load CV Analyzers (heavy models)
# ─────────────────────────────────────────────
_image_analyzer = None
_video_analyzer = None


def get_image_analyzer():
    """Lazy-load the image behaviour analyzer."""
    global _image_analyzer
    if _image_analyzer is None:
        from cv_module import ImageBehaviourAnalyzer
        custom_model = os.path.join(os.path.dirname(__file__), 'cv_module', 'models', 'best.pt')
        model_path = custom_model if os.path.exists(custom_model) else None
        _image_analyzer = ImageBehaviourAnalyzer(model_path=model_path)
        print("✅ Image Behaviour Analyzer loaded")
    return _image_analyzer


def get_video_analyzer():
    """Lazy-load the video behaviour analyzer."""
    global _video_analyzer
    if _video_analyzer is None:
        from cv_module import VideoBehaviourAnalyzer
        custom_model = os.path.join(os.path.dirname(__file__), 'cv_module', 'models', 'best.pt')
        model_path = custom_model if os.path.exists(custom_model) else None
        _video_analyzer = VideoBehaviourAnalyzer(model_path=model_path, fps_target=5)
        print("✅ Video Behaviour Analyzer loaded")
    return _video_analyzer


def allowed_file(filename, allowed_extensions):
    """Check if file extension is allowed."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in allowed_extensions


def get_status(score):
    """Get placement status from score."""
    if score >= 85:
        return "Excellent – Highly Placed"
    elif score >= 70:
        return "Very Good – Strong Candidate"
    elif score >= 55:
        return "Good – Competitive"
    elif score >= 35:
        return "Average – Needs Improvement"
    else:
        return "Beginner – Focus on Skill Building"


def get_suggested_role(features_dict):
    """Suggest a role based on strongest skills, handling zero/beginner baseline."""
    skill_roles = {
        'DSA_Skill': 'Software Development Engineer (SDE)',
        'Python_Skill': 'Python Developer / Data Scientist',
        'Java_Skill': 'Java Backend Developer',
        'SQL_Skill': 'Database Engineer / Data Analyst',
        'Web_Development_Skill': 'Full Stack Web Developer',
        'Cloud_Skill': 'Cloud Engineer / DevOps Specialist',
        'ML_Skill': 'Machine Learning Engineer',
        'Cybersecurity_Skill': 'Cybersecurity Analyst',
    }
    tech_skills = {k: features_dict.get(k, 0) for k in skill_roles}
    max_val = max(tech_skills.values()) if tech_skills else 0
    if max_val < 3.0:
        return "Beginner / Foundation Skill Building Stage"
    best_skill = max(tech_skills, key=tech_skills.get)
    return skill_roles[best_skill]


def get_weak_areas(features_dict):
    """Identify weak skill areas (< 6 out of 10 or < 60 for aptitude)."""
    weak = []
    # If all or mostly zero
    vals = list(features_dict.values())
    if sum(vals) == 0:
        return [
            "All technical & academic parameters are at baseline (0).",
            "Start by building foundational coding skills (DSA, Python/Java).",
            "Prepare for aptitude assessments and build portfolio projects."
        ]

    for key, val in features_dict.items():
        clean_name = key.replace('_', ' ')
        if key == 'CGPA':
            if val < 7.0:
                weak.append(f"CGPA ({val}) – Aim for 7.0+ for top tier eligibility")
        elif key == 'Aptitude_Score':
            if val < 60:
                weak.append(f"Aptitude Score ({val}%) – Practice quantitative & logical reasoning")
        elif key in ('Projects_Count', 'Certifications_Count'):
            if val < 3:
                weak.append(f"{clean_name} ({int(val)}) – Build more hands-on proof-of-work projects")
        else:
            if val < 6:
                weak.append(f"{clean_name} ({val}/10) – Needs practical practice & improvement")
    return weak if weak else ["No major weaknesses detected. Excellent profile!"]


def get_recommendations(features_dict):
    """Generate learning recommendations based on weak areas."""
    vals = list(features_dict.values())
    if sum(vals) == 0:
        return [
            "Enroll in a CS Fundamentals & Data Structures bootcamp.",
            "Learn Python or Java for core problem-solving.",
            "Complete 2-3 real-world full-stack or data projects on GitHub.",
            "Practice aptitude tests weekly to build speed and accuracy."
        ]

    recs = []
    if features_dict.get('DSA_Skill', 10) < 6:
        recs.append("Practice DSA daily on LeetCode/HackerRank — aim for 150+ problems")
    if features_dict.get('Python_Skill', 10) < 6:
        recs.append("Complete a Python bootcamp on Coursera or freeCodeCamp")
    if features_dict.get('Java_Skill', 10) < 6:
        recs.append("Practice Java OOP through HackerRank and Spring Boot guides")
    if features_dict.get('SQL_Skill', 10) < 6:
        recs.append("Learn SQL on SQLZoo or LeetCode Database section")
    if features_dict.get('Web_Development_Skill', 10) < 6:
        recs.append("Build 2–3 full-stack projects with React & modern backend frameworks")
    if features_dict.get('Cloud_Skill', 10) < 6:
        recs.append("Earn AWS Certified Cloud Practitioner or Azure Fundamentals")
    if features_dict.get('ML_Skill', 10) < 6:
        recs.append("Take Andrew Ng's Machine Learning specialization on Coursera")
    if features_dict.get('Cybersecurity_Skill', 10) < 6:
        recs.append("Practice on TryHackMe or Hack The Box for cybersecurity basics")
    if features_dict.get('Communication_Skill', 10) < 6:
        recs.append("Practice mock interviews with peers to improve speaking clarity")
    if features_dict.get('Problem_Solving_Skill', 10) < 6:
        recs.append("Solve algorithmic puzzles and participate in weekly coding contests")
    if features_dict.get('Confidence_Level', 10) < 6:
        recs.append("Record practice interview self-introductions to build confidence")
    if not recs:
        recs.append("Continue your excellent preparation! Focus on mock technical rounds and networking.")
    return recs



# ═══════════════════════════════════════════════
# AUTH ROUTES
# ═══════════════════════════════════════════════

@app.route('/api/auth/register', methods=['POST'])
def register():
    """Register a new user account."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400

        name = (data.get('name') or '').strip()
        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''

        # Validation
        if not name or len(name) < 2:
            return jsonify({'error': 'Name must be at least 2 characters'}), 400
        if not email or not re.match(r'^[\w.+-]+@[\w-]+\.[\w.]+$', email):
            return jsonify({'error': 'Please provide a valid email address'}), 400
        if len(password) < 6:
            return jsonify({'error': 'Password must be at least 6 characters'}), 400

        db = get_db()

        # Check if email already exists
        existing = db.execute('SELECT id FROM users WHERE email = ?', (email,)).fetchone()
        if existing:
            return jsonify({'error': 'An account with this email already exists'}), 409

        # Create user
        password_hash = generate_password_hash(password)
        cursor = db.execute(
            'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)',
            (name, email, password_hash)
        )
        db.commit()

        return jsonify({
            'message': 'Account created successfully',
            'user': {'id': cursor.lastrowid, 'name': name, 'email': email}
        }), 201

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Registration failed: {str(e)}'}), 500


@app.route('/api/auth/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Request body is required'}), 400

        email = (data.get('email') or '').strip().lower()
        password = data.get('password') or ''

        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400

        db = get_db()
        user = db.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()

        if not user or not check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid email or password'}), 401

        token = generate_token(user['id'], user['email'], user['name'])

        return jsonify({
            'message': 'Login successful',
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
            }
        })

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Login failed: {str(e)}'}), 500


@app.route('/api/auth/me', methods=['GET'])
@token_required
def get_current_user():
    """Return the current authenticated user's profile."""
    return jsonify({
        'user': {
            'id': request.current_user['user_id'],
            'name': request.current_user['name'],
            'email': request.current_user['email'],
        }
    })


# ═══════════════════════════════════════════════
# PROTECTED ROUTES
# ═══════════════════════════════════════════════

# ─────────────────────────────────────────────
# Phase 1 Routes
# ─────────────────────────────────────────────

@app.route('/')
def home():
    """Serve the placement score prediction form."""
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
@token_required
def predict():
    """Process placement score prediction (protected)."""
    is_json_req = request.is_json or request.headers.get('Accept') == 'application/json'

    if placement_model is None:
        err_data = {
            'prediction': 0,
            'status': "Model not loaded",
            'role': "N/A",
            'weak_areas': ["Placement model could not be loaded."],
            'recommendations': ["Check that model.pkl exists."]
        }
        return jsonify(err_data) if is_json_req else render_template('result.html', **err_data)

    try:
        # Collect form or JSON data
        features_dict = {}
        data_src = request.get_json(silent=True) if request.is_json else request.form
        if not data_src:
            data_src = request.form

        for feature in FEATURES:
            val = data_src.get(feature, 0)
            features_dict[feature] = float(val)

        # Create input array
        input_data = pd.DataFrame([features_dict])
        input_array = input_data[FEATURES]

        # Predict
        prediction = placement_model.predict(input_array)[0]
        prediction = round(float(prediction), 1)

        # Clamp to 0–100
        prediction = max(0, min(100, prediction))

        status = get_status(prediction)
        role = get_suggested_role(features_dict)
        weak_areas = get_weak_areas(features_dict)
        recommendations = get_recommendations(features_dict)

        result_payload = {
            'prediction': prediction,
            'status': status,
            'role': role,
            'weak_areas': weak_areas,
            'recommendations': recommendations
        }

        if is_json_req:
            return jsonify(result_payload)

        return render_template('result.html', **result_payload)

    except Exception as e:
        traceback.print_exc()
        err_payload = {
            'prediction': 0,
            'status': "Error",
            'role': "N/A",
            'weak_areas': [f"Error: {str(e)}"],
            'recommendations': ["Please try again."]
        }
        if is_json_req:
            return jsonify(err_payload), 500
        return render_template('result.html', **err_payload)



# ─────────────────────────────────────────────
# Phase 2 Routes
# ─────────────────────────────────────────────

@app.route('/interview')
def interview():
    """Serve the interview behaviour analysis page."""
    placement_score = request.args.get('placement_score', None)
    return render_template('interview_analysis.html',
                           placement_score=placement_score)


@app.route('/analyze-image', methods=['POST'])
@token_required
def analyze_image():
    """Analyze interview behaviour from an uploaded image (protected)."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename, ALLOWED_IMAGE_EXTENSIONS):
            return jsonify({'error': 'Invalid file type. Allowed: JPG, PNG'}), 400

        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Analyze
        analyzer = get_image_analyzer()
        result = analyzer.analyze_image(filepath)

        if result.get('error'):
            return jsonify(result), 400

        # Convert processed image path to serve via Flask
        if result.get('processed_image_path'):
            processed_name = os.path.basename(result['processed_image_path'])
            result['processed_image_path'] = url_for('serve_output',
                                                      filename=processed_name)

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500


@app.route('/analyze-video', methods=['POST'])
@token_required
def analyze_video():
    """Analyze interview behaviour from an uploaded video (protected)."""
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file uploaded'}), 400

        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400

        if not allowed_file(file.filename, ALLOWED_VIDEO_EXTENSIONS):
            return jsonify({'error': 'Invalid file type. Allowed: MP4, AVI, MOV, MKV'}), 400

        # Save uploaded file
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)

        # Analyze
        analyzer = get_video_analyzer()
        result = analyzer.analyze_video(filepath)

        if result.get('error'):
            return jsonify(result), 400

        # Convert processed video path to serve via Flask
        if result.get('processed_video_path'):
            processed_name = os.path.basename(result['processed_video_path'])
            result['processed_video_path'] = url_for('serve_output',
                                                      filename=processed_name)

        return jsonify(result)

    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': f'Analysis failed: {str(e)}'}), 500


@app.route('/calculate-final-score', methods=['POST'])
@token_required
def calculate_final_score():
    """
    Calculate the final placement readiness score.
    Formula: final_score = (placement_score * 0.7) + (behaviour_score * 0.3)
    """
    try:
        data = request.get_json()
        placement_score = float(data.get('placement_score', 0))
        behaviour_score = float(data.get('behaviour_score', 0))

        # Clamp values
        placement_score = max(0, min(100, placement_score))
        behaviour_score = max(0, min(100, behaviour_score))

        final_score = round((placement_score * 0.7) + (behaviour_score * 0.3), 1)

        return jsonify({
            'placement_score': placement_score,
            'behaviour_score': behaviour_score,
            'final_score': final_score,
            'formula': '(placement_score × 0.7) + (behaviour_score × 0.3)',
        })

    except Exception as e:
        return jsonify({'error': f'Calculation failed: {str(e)}'}), 400


# ─────────────────────────────────────────────
# File Serving Routes
# ─────────────────────────────────────────────

@app.route('/outputs/<path:filename>')
def serve_output(filename):
    """Serve processed output files (images/videos)."""
    return send_from_directory(app.config['OUTPUT_FOLDER'], filename)


# ─────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────

if __name__ == '__main__':
    print("=" * 60)
    print("  PlacementMentorAI")
    print("  Phase 1: Placement Score Prediction")
    print("  Phase 2: Interview Behaviour Analysis")
    port = int(os.environ.get('PORT', 5001))
    print(f"🚀 Running on http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)

