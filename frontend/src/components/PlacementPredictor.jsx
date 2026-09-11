import React, { useState } from 'react';
import { BrainCircuit, Sparkles, AlertTriangle, CheckCircle2, BookOpen, UserCheck, ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function PlacementPredictor({ onScoreCalculated }) {
  const { authHeaders } = useAuth();
  const [formData, setFormData] = useState({
    CGPA: 7.5,
    Python_Skill: 7,
    Java_Skill: 6,
    SQL_Skill: 7,
    DSA_Skill: 7,
    Web_Development_Skill: 6,
    Cloud_Skill: 5,
    ML_Skill: 5,
    Cybersecurity_Skill: 4,
    Aptitude_Score: 75,
    Communication_Skill: 7,
    Problem_Solving_Skill: 7,
    Confidence_Level: 7,
    Projects_Count: 3,
    Certifications_Count: 2,
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
    { key: 'SQL_Skill', label: 'SQL & Databases', min: 0, max: 10, step: 1, category: 'Core Engineering' },
    { key: 'Web_Development_Skill', label: 'Full Stack Web Dev', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Cloud_Skill', label: 'Cloud & DevOps', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'ML_Skill', label: 'Machine Learning & AI', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Cybersecurity_Skill', label: 'Cybersecurity & Networks', min: 0, max: 10, step: 1, category: 'Domain Specialties' },
    { key: 'Communication_Skill', label: 'Communication Skill', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Problem_Solving_Skill', label: 'Problem Solving & Logic', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Confidence_Level', label: 'Confidence Level', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Projects_Count', label: 'Completed Projects', min: 0, max: 15, step: 1, category: 'Soft Skills & Portfolio' },
    { key: 'Certifications_Count', label: 'Verified Certifications', min: 0, max: 10, step: 1, category: 'Soft Skills & Portfolio' },
  ];

  const categories = ['Academic & Aptitude', 'Core Engineering', 'Domain Specialties', 'Soft Skills & Portfolio'];

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Preset Selector */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Phase 1 Evaluation Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Academic & Technical Skill Predictor
          </h2>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            Calibrated Random Forest Regressor trained on 2,000+ placement records to forecast hiring probability.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm text-xs">
          <span className="text-slate-400 px-2 font-medium">Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset('zero')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => loadPreset('average')}
            className="px-2.5 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium transition-colors border border-slate-200/60"
          >
            Average
          </button>
          <button
            type="button"
            onClick={() => loadPreset('elite')}
            className="px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold transition-colors border border-indigo-100"
          >
            Elite (90%+)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form Column */}
        <div className="lg:col-span-7 space-y-6">
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-card space-y-8">
            
            {categories.map((cat) => (
              <div key={cat} className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {cat}
                  </h3>
                  <span className="text-[11px] text-slate-400 font-medium">Scale 0–10</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  {skillFields
                    .filter((f) => f.category === cat)
                    .map((field) => (
                      <div key={field.key} className="space-y-1.5 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                          <label htmlFor={field.key} className="cursor-pointer">{field.label}</label>
                          <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
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
                          className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center space-x-2.5 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Random Forest ML Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Calculate Placement Score</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-5 space-y-6">
          {error && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 text-sm">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>{error}</div>
            </div>
          )}

          {result ? (
            <div className="space-y-6">
              
              {/* Score Display Card */}
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card text-center relative overflow-hidden">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Phase 1 Result
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                    result.prediction >= 70 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    result.prediction >= 50 ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    result.prediction >= 35 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-rose-50 text-rose-700 border-rose-200'
                  }`}>
                    {result.status}
                  </span>
                </div>
                
                {/* Circular Score Highlight */}
                <div className="my-5 inline-flex items-center justify-center w-36 h-36 rounded-full bg-indigo-50 border-4 border-indigo-100 p-2 shadow-inner">
                  <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center shadow-sm border border-slate-100">
                    <span className="text-4xl font-extrabold text-slate-900">{result.prediction}%</span>
                    <span className="text-[11px] text-slate-400 font-medium">Readiness</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center space-x-2 text-xs font-medium text-slate-700">
                  <UserCheck className="w-4 h-4 text-[#635BFF]" />
                  <span>Recommended Role: <strong className="text-slate-900 font-semibold">{result.role}</strong></span>
                </div>
              </div>

              {/* Weak Areas Card */}
              {result.weak_areas && result.weak_areas.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Identified Skill Gaps</span>
                  </h4>
                  <ul className="space-y-2">
                    {result.weak_areas.map((area, idx) => (
                      <li key={idx} className="text-xs text-slate-700 flex items-start space-x-2.5 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learning Recommendations */}
              {result.recommendations && result.recommendations.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#635BFF] flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-[#635BFF]" />
                    <span>Recommended Action Plan</span>
                  </h4>
                  <div className="space-y-2.5">
                    {result.recommendations.map((rec, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start space-x-3 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-dashed border-slate-200 shadow-card flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-4 text-[#635BFF]">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No Prediction Executed Yet</h3>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Adjust candidate parameters on the left and click "Calculate Placement Score" to run Phase 1 evaluation.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
