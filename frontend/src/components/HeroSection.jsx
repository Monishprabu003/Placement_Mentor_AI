import React from 'react';
import { Sparkles, BrainCircuit, Video, ArrowRight, ShieldCheck, Zap, Activity } from 'lucide-react';

export default function HeroSection({ setActiveTab, placementScore, behaviourScore, finalScore }) {
  return (
    <div className="relative overflow-hidden py-12 lg:py-16">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-xl">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>AI-Powered Dual-Phase Evaluation Platform</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.15]">
          Master Your Placement Readiness with <span className="text-gradient">Precision AI Intelligence</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed font-normal">
          Evaluate technical competence using Machine Learning models combined with Computer Vision non-verbal posture assessment (<span className="text-cyan-400 font-semibold">YOLO26-Pose</span>) to achieve complete 360° interview mastery.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap gap-4 items-center">
          <button
            onClick={() => setActiveTab('placement')}
            className="flex items-center space-x-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-bold shadow-xl shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <BrainCircuit className="w-5 h-5 text-cyan-300" />
            <span>Predict Placement Score</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className="flex items-center space-x-3 px-7 py-4 rounded-2xl glass-panel glass-panel-hover text-slate-200 font-semibold border border-slate-700/80 hover:border-indigo-500/50 transition-all"
          >
            <Video className="w-5 h-5 text-indigo-400" />
            <span>Analyze Mock Interview Video</span>
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border-indigo-500/20 relative">
            <div className="flex items-center justify-between text-slate-400 text-sm font-semibold mb-2">
              <span>Phase 1: Academic & Skills</span>
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{placementScore ? `${placementScore}%` : 'Not Evaluated'}</div>
            <p className="text-xs text-slate-400 mt-2">15 Parameters ML Random Forest Engine</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-cyan-500/20 relative">
            <div className="flex items-center justify-between text-slate-400 text-sm font-semibold mb-2">
              <span>Phase 2: Posture & Behavior</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{behaviourScore ? `${behaviourScore.toFixed(1)}%` : 'Not Evaluated'}</div>
            <p className="text-xs text-slate-400 mt-2">17 COCO Keypoints Pose Analysis</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border-purple-500/20 relative bg-gradient-to-br from-indigo-900/30 via-slate-900/60 to-purple-900/30">
            <div className="flex items-center justify-between text-slate-400 text-sm font-semibold mb-2">
              <span>Final Placement Readiness</span>
              <Zap className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-extrabold text-gradient">{finalScore ? `${finalScore}%` : 'Pending'}</div>
            <p className="text-xs text-slate-400 mt-2">Formula: 70% Hard Skills + 30% Posture</p>
          </div>
        </div>

      </div>
    </div>
  );
}
