import React, { useState } from 'react';
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle2, BookOpen, UserCheck, ArrowRight, Loader2 } from 'lucide-react';
import MetricCard from './MetricCard';
import { useAuth } from '../context/AuthContext';

export default function PlacementPredictor({ onScoreCalculated }) {
  const { authHeaders } = useAuth();
  const [formData, setFormData] = useState({
    CGPA: 0,
    Python_Skill: 0,
    Java_Skill: 0,
    SQL_Skill: 0,
    DSA_Skill: 0,
    Web_Development_Skill: 0,
    Cloud_Skill: 0,
    ML_Skill: 0,
    Cybersecurity_Skill: 0,
    Aptitude_Score: 0,
    Communication_Skill: 0,
    Problem_Solving_Skill: 0,
    Confidence_Level: 0,
    Projects_Count: 0,
    Certifications_Count: 0,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const loadPreset = (preset) => {
    if (preset === 'zero') {
      setFormData({
        CGPA: 0, Python_Skill: 0, Java_Skill: 0, SQL_Skill: 0, DSA_Skill: 0,
        Web_Development_Skill: 0, Cloud_Skill: 0, ML_Skill: 0, Cybersecurity_Skill: 0,
        Aptitude_Score: 0, Communication_Skill: 0, Problem_Solving_Skill: 0,
        Confidence_Level: 0, Projects_Count: 0, Certifications_Count: 0
      });
    } else if (preset === 'average') {
      setFormData({
        CGPA: 7.0, Python_Skill: 6, Java_Skill: 5, SQL_Skill: 6, DSA_Skill: 6,
        Web_Development_Skill: 6, Cloud_Skill: 4, ML_Skill: 4, Cybersecurity_Skill: 3,
        Aptitude_Score: 65, Communication_Skill: 6, Problem_Solving_Skill: 6,
        Confidence_Level: 6, Projects_Count: 3, Certifications_Count: 2
      });
    } else if (preset === 'elite') {
      setFormData({
        CGPA: 9.2, Python_Skill: 9, Java_Skill: 8, SQL_Skill: 9, DSA_Skill: 9,
        Web_Development_Skill: 9, Cloud_Skill: 8, ML_Skill: 9, Cybersecurity_Skill: 7,
        Aptitude_Score: 95, Communication_Skill: 9, Problem_Solving_Skill: 9,
        Confidence_Level: 9, Projects_Count: 5, Certifications_Count: 4
      });
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...authHeaders(),
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
      if (onScoreCalculated && data.prediction !== undefined) {
        onScoreCalculated(data.prediction);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to process prediction. Please verify the Flask server is running.');
    } finally {
      setLoading(false);
    }
  };

  const skillFields = [
    { key: 'CGPA', label: 'CGPA Score', min: 0, max: 10, step: 0.1, category: 'Academic & Aptitude' },
    { key: 'Aptitude_Score', label: 'Aptitude Test Score (%)', min: 0, max: 100, step: 1, category: 'Academic & Aptitude' },
    { key: 'DSA_Skill', label: 'Data Structures & Algorithms', min: 0, max: 10, step: 1, category: 'Core Engineering' },
    { key: 'Python_Skill', label: 'Python Programming', min: 0, max: 10, step: 1, category: 'Core Engineering' },
    { key: 'Java_Skill', label: 'Java OOP Skill', min: 0, max: 10, step: 1, category: 'Core Engineering' },
    { key: 'SQL_Skill', label: 'SQL & Relational DBs', min: 0, max: 10, step: 1, category: 'Core Engineering' },
    { key: 'Web_Development_Skill', label: 'Full Stack Web Development', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Cloud_Skill', label: 'Cloud & DevOps (AWS/Azure)', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'ML_Skill', label: 'Machine Learning & AI', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Cybersecurity_Skill', label: 'Cybersecurity & Networks', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Communication_Skill', label: 'Communication Skill', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Problem_Solving_Skill', label: 'Problem Solving & Logic', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Confidence_Level', label: 'Self Confidence Level', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Projects_Count', label: 'Completed Projects', min: 0, max: 15, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Certifications_Count', label: 'Verified Certifications', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
  ];

  const categories = ['Academic & Aptitude', 'Core Engineering', 'Domain Specialties', 'Soft Skills & Portfolio'];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>Phase 1 Evaluation</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Academic & Technical Skill Predictor
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
            Calibrated Random Forest Regressor trained on 2,000+ candidate data points for highly accurate, realistic placement probability.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center space-x-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800 text-xs">
          <span className="text-slate-500 px-2 font-mono uppercase text-[10px]">Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('zero')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-rose-500/20 hover:text-rose-300 text-slate-300 transition-all font-medium"
          >
            All Zeros
          </button>
          <button
            type="button"
            onClick={() => loadPreset('average')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 transition-all font-medium"
          >
            Average
          </button>
          <button
            type="button"
            onClick={() => loadPreset('elite')}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-emerald-500/20 hover:text-emerald-300 text-slate-300 transition-all font-medium"
          >
            Elite (Top Tier)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-8">
            
            {categories.map((cat) => (
              <div key={cat} className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                  {cat}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {skillFields
                    .filter((f) => f.category === cat)
                    .map((field) => (
                      <div key={field.key} className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
                          <label htmlFor={field.key}>{field.label}</label>
                          <span className="font-mono text-indigo-400 font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {formData[field.key]}
                          </span>
                        </div>
                        <input
                          type="range"
                          id={field.key}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          value={formData[field.key]}
                          onChange={(e) => handleInputChange(field.key, e.target.value)}
                          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 hover:accent-cyan-400 transition-all"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold text-base shadow-xl shadow-indigo-600/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Evaluating Random Forest ML Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Calculate Placement Score</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {error && (
            <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300 flex items-start space-x-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {result ? (
            <div className="space-y-6">
              
              {/* Score Display Card */}
              <div className="glass-panel p-8 rounded-3xl border-indigo-500/30 text-center relative overflow-hidden bg-gradient-to-b from-indigo-900/20 via-slate-900/60 to-slate-950">
                <div className="absolute top-0 right-0 p-3">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full border font-bold ${
                    result.prediction >= 70 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                    result.prediction >= 50 ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                    result.prediction >= 35 ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                    'bg-rose-500/10 text-rose-400 border-rose-500/20'
                  }`}>
                    {result.status}
                  </span>
                </div>

                
                <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">Phase 1 Placement Score</p>
                
                <div className="my-4 inline-flex items-center justify-center w-36 h-36 rounded-full bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[3px] shadow-2xl shadow-indigo-500/30">
                  <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white">{result.prediction}</span>
                    <span className="text-xs text-slate-400 font-mono">/ 100</span>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-center space-x-2 text-sm text-indigo-300 font-medium">
                  <UserCheck className="w-4 h-4 text-cyan-400" />
                  <span>Recommended Role: <strong className="text-white">{result.role}</strong></span>
                </div>
              </div>

              {/* Weak Areas Card */}
              <div className="glass-panel p-6 rounded-3xl border-amber-500/20">
                <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-2 mb-4">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Identified Skill Gaps</span>
                </h4>
                <ul className="space-y-2">
                  {result.weak_areas.map((area, idx) => (
                    <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Recommendations */}
              <div className="glass-panel p-6 rounded-3xl border-cyan-500/20">
                <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-2 mb-4">
                  <BookOpen className="w-4 h-4" />
                  <span>Recommended Action Plan</span>
                </h4>
                <div className="space-y-2.5">
                  {result.recommendations.map((rec, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="glass-panel p-12 rounded-3xl text-center border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <BrainCircuit className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Prediction Executed Yet</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Adjust the candidate parameters on the left and click "Calculate Placement Score" to launch Phase 1 evaluation.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
