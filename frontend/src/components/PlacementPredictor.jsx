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

  const categories = [
    {
      title: 'Academic & Aptitude',
      fields: [
        { key: 'CGPA', label: 'CGPA Score', min: 0, max: 10, step: 0.1 },
        { key: 'Aptitude_Score', label: 'Aptitude Test Score (%)', min: 0, max: 100, step: 1 },
      ],
    },
    {
      title: 'Core Engineering',
      fields: [
        { key: 'DSA_Skill', label: 'Data Structures & Algorithms', min: 0, max: 10, step: 1 },
        { key: 'Python_Skill', label: 'Python Programming', min: 0, max: 10, step: 1 },
        { key: 'Java_Skill', label: 'Java OOP Skill', min: 0, max: 10, step: 1 },
        { key: 'SQL_Skill', label: 'SQL & Databases', min: 0, max: 10, step: 1 },
      ],
    },
    {
      title: 'Domain Specialties',
      fields: [
        { key: 'Web_Development_Skill', label: 'Full Stack Web Dev', min: 0, max: 10, step: 1 },
        { key: 'Cloud_Skill', label: 'Cloud & DevOps', min: 0, max: 10, step: 1 },
        { key: 'ML_Skill', label: 'Machine Learning & AI', min: 0, max: 10, step: 1 },
        { key: 'Cybersecurity_Skill', label: 'Cybersecurity & Networks', min: 0, max: 10, step: 1 },
      ],
    },
    {
      title: 'Soft Skills & Portfolio',
      fields: [
        { key: 'Communication_Skill', label: 'Communication Skill', min: 0, max: 10, step: 1 },
        { key: 'Problem_Solving_Skill', label: 'Problem Solving & Logic', min: 0, max: 10, step: 1 },
        { key: 'Confidence_Level', label: 'Confidence Level', min: 0, max: 10, step: 1 },
        { key: 'Projects_Count', label: 'Completed Projects', min: 0, max: 15, step: 1 },
        { key: 'Certifications_Count', label: 'Verified Certifications', min: 0, max: 10, step: 1 },
      ],
    },
  ];

  return (
    <div className="py-8">
      <div className="app-container">
        
        {/* Header & Presets */}
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
          <div className="flex items-center space-x-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-xs text-xs">
            <span className="text-slate-400 px-2 font-medium">Presets:</span>
            <button
              type="button"
              onClick={() => loadPreset('zero')}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-slate-200/60"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => loadPreset('average')}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold transition-colors border border-slate-200/60"
            >
              Average
            </button>
            <button
              type="button"
              onClick={() => loadPreset('elite')}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold transition-colors border border-indigo-100"
            >
              Elite
            </button>
          </div>
        </div>

        {/* Form & Desktop 2-Column Grid */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Input Sliders Grouped by Category (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {categories.map((cat, catIdx) => (
                <div key={catIdx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 border-b border-slate-100 pb-2">
                    {cat.title}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {cat.fields.map((field) => (
                      <div key={field.key} className="space-y-2 bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                          <span>{field.label}</span>
                          <span className="font-mono text-[#635BFF] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-xs shadow-2xs">
                            {formData[field.key]}
                          </span>
                        </div>
                        <input
                          type="range"
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
                className="w-full py-4 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Random Forest Model...</span>
                  </>
                ) : (
                  <>
                    <BrainCircuit className="w-4 h-4" />
                    <span>Calculate Placement Score</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </div>

            {/* RIGHT COLUMN: Prediction Result Panel (5 Cols) */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              
              {error && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-rose-600 mt-0.5" />
                  <div>
                    <span className="font-bold">Execution Error:</span>
                    <p className="mt-0.5">{error}</p>
                  </div>
                </div>
              )}

              {!result && !error && (
                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card text-center space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF] mx-auto">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base">Prediction Pending</h3>
                    <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
                      Adjust your academic and technical skill sliders on the left, then click <strong className="text-slate-800 font-semibold">Calculate Placement Score</strong>.
                    </p>
                  </div>
                </div>
              )}

              {result && (
                <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card space-y-6 animate-fade-in">
                  
                  {/* Big Score Header */}
                  <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30 border border-indigo-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Placement Score</span>
                    <div className="text-5xl font-extrabold text-[#635BFF] tracking-tight my-1">
                      {result.prediction}%
                    </div>
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {result.suggested_role || 'Job Ready'}
                    </span>
                  </div>

                  {/* Suggested Role */}
                  {result.suggested_role && (
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
                        <UserCheck className="w-4 h-4 text-[#635BFF]" />
                        <span>Recommended Role Fit</span>
                      </div>
                      <div className="text-sm font-bold text-slate-800">
                        {result.suggested_role}
                      </div>
                    </div>
                  )}

                  {/* Weak Areas */}
                  {result.weak_areas && result.weak_areas.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        <span>Key Areas to Improve</span>
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {result.weak_areas.map((weak, idx) => (
                          <span key={idx} className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200">
                            {weak}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  {result.recommendations && result.recommendations.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                        <BookOpen className="w-4 h-4 text-indigo-600" />
                        <span>Actionable Recommendations</span>
                      </h4>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {result.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start space-x-2 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        </form>

      </div>
    </div>
  );
}
