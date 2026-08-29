"""
Generate a comprehensive, realistic Placement Readiness Dataset
and train the Random Forest Regressor model.
"""

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import pickle

np.random.seed(42)
NUM_SAMPLES = 2000

features = [
    'CGPA', 'Python_Skill', 'Java_Skill', 'SQL_Skill', 'DSA_Skill',
    'Web_Development_Skill', 'Cloud_Skill', 'ML_Skill', 'Cybersecurity_Skill',
    'Aptitude_Score', 'Communication_Skill', 'Problem_Solving_Skill',
    'Confidence_Level', 'Projects_Count', 'Certifications_Count'
]

# Generate diverse candidate profiles
data = []

# 1. Edge Case: Extreme Baselines (All Zeros / Near Zero)
for _ in range(50):
    cgpa = np.random.uniform(0.0, 3.0)
    aptitude = np.random.uniform(0, 20)
    skills = {f: np.random.uniform(0, 2) for f in [
        'Python_Skill', 'Java_Skill', 'SQL_Skill', 'DSA_Skill',
        'Web_Development_Skill', 'Cloud_Skill', 'ML_Skill', 'Cybersecurity_Skill',
        'Communication_Skill', 'Problem_Solving_Skill', 'Confidence_Level'
    ]}
    projects = np.random.randint(0, 2)
    certs = np.random.randint(0, 2)
    
    # Strictly zero baseline
    if _ < 20:
        cgpa, aptitude, projects, certs = 0.0, 0.0, 0, 0
        skills = {k: 0.0 for k in skills}

    row = {
        'CGPA': round(cgpa, 2),
        'Aptitude_Score': round(aptitude, 1),
        'Projects_Count': projects,
        'Certifications_Count': certs,
        **{k: round(v, 1) for k, v in skills.items()}
    }
    data.append(row)

# 2. General Distribution (Beginner, Intermediate, Advanced, Elite)
for _ in range(NUM_SAMPLES - 50):
    tier = np.random.choice(['beginner', 'intermediate', 'advanced', 'elite'], p=[0.25, 0.40, 0.25, 0.10])
    
    if tier == 'beginner':
        cgpa = np.random.uniform(4.0, 6.5)
        aptitude = np.random.uniform(20, 50)
        base_skill = np.random.uniform(1.0, 4.0)
        projects = np.random.randint(0, 3)
        certs = np.random.randint(0, 2)
    elif tier == 'intermediate':
        cgpa = np.random.uniform(6.5, 7.8)
        aptitude = np.random.uniform(50, 75)
        base_skill = np.random.uniform(4.0, 7.0)
        projects = np.random.randint(2, 5)
        certs = np.random.randint(1, 3)
    elif tier == 'advanced':
        cgpa = np.random.uniform(7.8, 8.8)
        aptitude = np.random.uniform(75, 90)
        base_skill = np.random.uniform(6.5, 8.5)
        projects = np.random.randint(3, 7)
        certs = np.random.randint(2, 5)
    else:  # elite
        cgpa = np.random.uniform(8.8, 9.9)
        aptitude = np.random.uniform(88, 100)
        base_skill = np.random.uniform(8.0, 10.0)
        projects = np.random.randint(4, 10)
        certs = np.random.randint(3, 7)

    tech_cols = ['Python_Skill', 'Java_Skill', 'SQL_Skill', 'DSA_Skill',
                 'Web_Development_Skill', 'Cloud_Skill', 'ML_Skill', 'Cybersecurity_Skill']
    
    # Students have strengths in 1-2 areas and average in others
    skills = {}
    strong_tech = np.random.choice(tech_cols, size=2, replace=False)
    for col in tech_cols:
        if col in strong_tech:
            skills[col] = np.clip(base_skill + np.random.uniform(0.5, 2.0), 0, 10)
        else:
            skills[col] = np.clip(base_skill + np.random.uniform(-2.0, 1.0), 0, 10)

    soft_cols = ['Communication_Skill', 'Problem_Solving_Skill', 'Confidence_Level']
    for col in soft_cols:
        skills[col] = np.clip(base_skill + np.random.uniform(-1.5, 1.5), 0, 10)

    row = {
        'CGPA': round(cgpa, 2),
        'Aptitude_Score': round(aptitude, 1),
        'Projects_Count': projects,
        'Certifications_Count': certs,
        **{k: round(v, 1) for k, v in skills.items()}
    }
    data.append(row)

df = pd.DataFrame(data)

# Compute Ground Truth Placement Score using industry-standard weighted rubric
def compute_placement_score(row):
    cgpa_score = (row['CGPA'] / 10.0) * 15.0               # 15 pts max
    aptitude_score = (row['Aptitude_Score'] / 100.0) * 15.0  # 15 pts max
    
    dsa_score = (row['DSA_Skill'] / 10.0) * 15.0           # 15 pts max
    
    tech_skills = [row['Python_Skill'], row['Java_Skill'], row['SQL_Skill'],
                   row['Web_Development_Skill'], row['Cloud_Skill'], row['ML_Skill'], row['Cybersecurity_Skill']]
    best_tech = max(tech_skills)
    avg_other_tech = (sum(tech_skills) - best_tech) / (len(tech_skills) - 1)
    
    tech_spec_score = (best_tech / 10.0) * 12.0            # 12 pts max
    tech_breadth_score = (avg_other_tech / 10.0) * 8.0     # 8 pts max
    
    ps_score = (row['Problem_Solving_Skill'] / 10.0) * 8.0  # 8 pts max
    comm_score = (row['Communication_Skill'] / 10.0) * 7.0  # 7 pts max
    conf_score = (row['Confidence_Level'] / 10.0) * 5.0     # 5 pts max
    
    proj_score = (min(row['Projects_Count'], 6) / 6.0) * 9.0  # 9 pts max
    cert_score = (min(row['Certifications_Count'], 4) / 4.0) * 6.0  # 6 pts max
    
    total = (
        cgpa_score + aptitude_score +
        dsa_score + tech_spec_score + tech_breadth_score +
        ps_score + comm_score + conf_score +
        proj_score + cert_score
    )
    
    # Add slight realistic noise (+- 1.5 pts) unless it's zero baseline
    if total > 5:
        noise = np.random.normal(0, 1.0)
        total = np.clip(total + noise, 0, 100)
    else:
        total = max(0.0, total)
        
    return round(float(total), 1)

df['Placement_Score'] = df.apply(compute_placement_score, axis=1)

# Save realistic dataset
df.to_csv('placementmentor_dataset.csv', index=False)
print(f"✅ Generated dataset with {len(df)} samples saved to placementmentor_dataset.csv")
print("Score distribution summary:")
print(df['Placement_Score'].describe())

# Train Model
X = df[features]
y = df['Placement_Score']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.15, random_state=42)

model = RandomForestRegressor(n_estimators=200, max_depth=14, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
print(f"\n📊 Model R² Score: {r2_score(y_test, y_pred):.4f}")
print(f"📊 Model RMSE: {np.sqrt(mean_squared_error(y_test, y_pred)):.4f}")

# Test Edge Cases
zero_profile = pd.DataFrame([{f: 0.0 for f in features}])
print(f"\n🧪 Test All Zeros Profile -> Predicted Score: {model.predict(zero_profile)[0]:.1f} / 100")

avg_profile = pd.DataFrame([{
    'CGPA': 7.0, 'Python_Skill': 6, 'Java_Skill': 5, 'SQL_Skill': 6, 'DSA_Skill': 6,
    'Web_Development_Skill': 6, 'Cloud_Skill': 4, 'ML_Skill': 4, 'Cybersecurity_Skill': 3,
    'Aptitude_Score': 65, 'Communication_Skill': 6, 'Problem_Solving_Skill': 6,
    'Confidence_Level': 6, 'Projects_Count': 3, 'Certifications_Count': 2
}])
print(f"🧪 Test Average Profile -> Predicted Score: {model.predict(avg_profile)[0]:.1f} / 100")

elite_profile = pd.DataFrame([{
    'CGPA': 9.2, 'Python_Skill': 9, 'Java_Skill': 8, 'SQL_Skill': 9, 'DSA_Skill': 9,
    'Web_Development_Skill': 9, 'Cloud_Skill': 8, 'ML_Skill': 9, 'Cybersecurity_Skill': 7,
    'Aptitude_Score': 95, 'Communication_Skill': 9, 'Problem_Solving_Skill': 9,
    'Confidence_Level': 9, 'Projects_Count': 5, 'Certifications_Count': 4
}])
print(f"🧪 Test Elite Profile -> Predicted Score: {model.predict(elite_profile)[0]:.1f} / 100")

# Save model
with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)
print("\n✅ Successfully updated and saved model.pkl")
