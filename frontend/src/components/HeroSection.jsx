import React from 'react';
import { Sparkles, BrainCircuit, Video, ArrowRight, ShieldCheck, Zap, Activity, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ setActiveTab, placementScore, behaviourScore, finalScore }) {
  return (
    <div className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Content Box */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>AI-Powered Placement Readiness Platform</span>
          </div>

          {/* Controlled Large Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Master Your <span className="text-[#635BFF]">Placement Readiness</span>
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Evaluate your technical skills and interview readiness with AI-powered assessments designed to help you identify strengths, close skill gaps, and prepare with confidence.
          </p>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('placement')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white text-sm font-semibold shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-200" />
              <span>Predict Placement Score</span>
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-7 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150"
            >
              <Video className="w-4 h-4 text-[#635BFF]" />
              <span>Analyze Mock Interview Video</span>
            </button>
          </div>

        </div>

        {/* Evaluation Overview Cards Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Phase 1 */}
          <div 
            onClick={() => setActiveTab('placement')}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF]">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  placementScore !== null
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {placementScore !== null ? 'Completed' : 'Not Evaluated'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phase 1</span>
                <h3 className="text-base font-bold text-slate-900">Academic & Skills</h3>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {placementScore !== null ? `${placementScore}%` : '—'}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">15 parameters analyzed</p>
              </div>
              <span className="text-xs font-semibold text-[#635BFF] flex items-center hover:underline">
                Evaluate <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </div>

          {/* Card 2: Phase 2 */}
          <div 
            onClick={() => setActiveTab('interview')}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                  <Activity className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  behaviourScore !== null
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-slate-100 text-slate-600 border-slate-200'
                }`}>
                  {behaviourScore !== null ? 'Completed' : 'Not Evaluated'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phase 2</span>
                <h3 className="text-base font-bold text-slate-900">Posture & Behavior</h3>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-baseline justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {behaviourScore !== null ? `${behaviourScore.toFixed(1)}%` : '—'}
                </div>
                <p className="text-xs text-slate-500 mt-0.5">17 COCO keypoints pose analysis</p>
              </div>
              <span className="text-xs font-semibold text-[#635BFF] flex items-center hover:underline">
                Analyze <ArrowRight className="w-3 h-3 ml-1" />
              </span>
            </div>
          </div>

          {/* Card 3: Final Placement Readiness (Visually Emphasized) */}
          <div 
            onClick={() => setActiveTab('final')}
            className="bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 p-6 sm:p-7 rounded-2xl border-2 border-indigo-200/80 shadow-md hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                  finalScore !== null
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-200 font-bold'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {finalScore !== null ? 'Calculated' : 'Pending'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#635BFF] uppercase tracking-wider">Composite Readiness</span>
                <h3 className="text-base font-bold text-slate-900">Placement Readiness</h3>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-indigo-100/80">
              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#635BFF] tracking-tight">
                    {finalScore !== null ? `${finalScore}%` : 'Pending'}
                  </div>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    70% Technical Skills + 30% Interview Behavior
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#635BFF] flex items-center hover:underline">
                  View <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>

              {finalScore !== null && (
                <div className="mt-3 w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-[#635BFF] h-full rounded-full transition-all duration-500" 
                    style={{ width: `${Math.min(100, Math.max(0, finalScore))}%` }}
                  />
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
