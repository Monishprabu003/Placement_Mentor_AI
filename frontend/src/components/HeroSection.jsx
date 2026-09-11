import React from 'react';
import { Sparkles, BrainCircuit, Video, ArrowRight, Activity, Zap } from 'lucide-react';

export default function HeroSection({ setActiveTab, placementScore, behaviourScore, finalScore }) {
  return (
    <div className="py-10 sm:py-14">
      <div className="app-container">
        
        {/* Top Hero Section */}
        <div className="text-center max-w-4xl mx-auto space-y-5">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[#635BFF] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>AI-Powered Readiness Dashboard</span>
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Master Your <span className="text-[#635BFF]">Placement Readiness</span>
          </h1>

          {/* Short Explanation */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Evaluate your academic & technical skills, analyze your non-verbal interview behavior with YOLO26-Pose, and track your overall job readiness index in real time.
          </p>

          {/* Direct CTA Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('placement')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3 rounded-xl bg-[#635BFF] hover:bg-[#5349E0] text-white text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <BrainCircuit className="w-4 h-4 text-indigo-200" />
              <span>Predict Placement Score</span>
              <ArrowRight className="w-4 h-4 text-indigo-200" />
            </button>

            <button
              onClick={() => setActiveTab('interview')}
              className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-sm font-bold border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-150"
            >
              <Video className="w-4 h-4 text-[#635BFF]" />
              <span>Analyze Interview</span>
            </button>
          </div>

        </div>

        {/* 3 Equal-Height Evaluation Cards Grid */}
        <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Phase 1 */}
          <div 
            onClick={() => setActiveTab('placement')}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
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
                  {placementScore !== null ? 'Evaluated' : 'Not Evaluated'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phase 1</span>
                <h3 className="text-lg font-bold text-slate-900">Academic & Skills</h3>
                <p className="text-xs text-slate-500 mt-1">Random Forest score prediction on 15 skill parameters.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {placementScore !== null ? `${placementScore}%` : '—'}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Placement Probability</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-indigo-50 text-[#635BFF] hover:bg-[#635BFF] hover:text-white font-bold text-xs transition-colors flex items-center space-x-1">
                <span>Evaluate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 2: Phase 2 */}
          <div 
            onClick={() => setActiveTab('interview')}
            className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
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
                  {behaviourScore !== null ? 'Evaluated' : 'Not Evaluated'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Phase 2</span>
                <h3 className="text-lg font-bold text-slate-900">Posture & Behavior</h3>
                <p className="text-xs text-slate-500 mt-1">YOLO26-Pose 17 COCO keypoint non-verbal analysis.</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {behaviourScore !== null ? `${behaviourScore.toFixed(1)}%` : '—'}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Behavioral Score</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center space-x-1">
                <span>Analyze</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Final Score */}
          <div 
            onClick={() => setActiveTab('final')}
            className="bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 p-6 sm:p-7 rounded-2xl border-2 border-indigo-200/80 shadow-md hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
                  <Zap className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                  finalScore !== null
                    ? 'bg-indigo-100 text-indigo-800 border-indigo-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                  {finalScore !== null ? 'Calculated' : 'Pending'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-[#635BFF] uppercase tracking-wider">Final Engine</span>
                <h3 className="text-lg font-bold text-slate-900">Overall Readiness</h3>
                <p className="text-xs text-slate-500 mt-1">Weighted Readiness Index (70% Technical + 30% Posture).</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-indigo-100/80 flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#635BFF] tracking-tight">
                  {finalScore !== null ? `${finalScore}%` : 'Pending'}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Composite Score</p>
              </div>
              <button className="px-4 py-2 rounded-xl bg-[#635BFF] text-white hover:bg-[#5349E0] font-bold text-xs transition-colors flex items-center space-x-1 shadow-xs">
                <span>View Results</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
