import React, { useState, useEffect } from 'react';
import { Award, Zap, Sparkles, CheckCircle2, ShieldCheck, Printer, ArrowRight, RefreshCw, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalReadinessDashboard({ placementScore, behaviourScore }) {
  const [pScore, setPScore] = useState(placementScore || 85);
  const [bScore, setBScore] = useState(behaviourScore || 80);
  const [finalScore, setFinalScore] = useState(null);

  const calculateFinal = (p, b) => {
    const calc = (p * 0.7) + (b * 0.3);
    const result = Math.round(calc * 10) / 10;
    setFinalScore(result);

    if (result >= 80) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  useEffect(() => {
    calculateFinal(pScore, bScore);
  }, [pScore, bScore]);

  const handlePrint = () => {
    window.print();
  };

  const getReadinessTier = (score) => {
    if (score >= 90) return { title: 'Tier 1 – Elite Job Ready', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
    if (score >= 80) return { title: 'Tier 2 – Highly Competitive', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' };
    if (score >= 70) return { title: 'Tier 3 – Job Ready Candidate', color: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10' };
    if (score >= 60) return { title: 'Tier 4 – Needs Technical Polish', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' };
    return { title: 'Tier 5 – Intensive Skill Prep Needed', color: 'text-rose-400 border-rose-500/30 bg-rose-500/10' };
  };

  const tier = finalScore ? getReadinessTier(finalScore) : null;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold mb-3">
            <Award className="w-4 h-4 text-purple-400" />
            <span>Integrated readiness Score Engine</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            Final Placement Readiness Analytics
          </h2>
          <p className="mt-2 text-slate-400 max-w-2xl text-sm sm:text-base">
            Combines Phase 1 Hard Skills (<strong className="text-indigo-400">70% weight</strong>) with Phase 2 Interview Behavior (<strong className="text-cyan-400">30% weight</strong>).
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl glass-panel glass-panel-hover text-slate-200 text-xs font-semibold flex items-center space-x-2 border border-slate-700"
        >
          <Printer className="w-4 h-4 text-purple-400" />
          <span>Export Official Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6">
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-purple-400 border-b border-slate-800 pb-2">
              Weighted Inputs Adjuster
            </h3>

            {/* Slider 1: Placement Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Phase 1 Placement Score (70% Weight)</span>
                <span className="font-mono text-indigo-400 font-bold">{pScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pScore}
                onChange={(e) => setPScore(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Slider 2: Interview Posture Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-slate-300">
                <span>Phase 2 Posture Score (30% Weight)</span>
                <span className="font-mono text-cyan-400 font-bold">{bScore}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={bScore}
                onChange={(e) => setBScore(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Weighted Formula Box */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 space-y-1">
              <div className="text-slate-500 font-bold uppercase text-[10px]">Algorithm Formula:</div>
              <div className="text-slate-200">
                Final = ({pScore} × 0.70) + ({bScore} × 0.30)
              </div>
              <div className="text-purple-400 font-bold">
                Final = {(pScore * 0.7).toFixed(1)} + {(bScore * 0.3).toFixed(1)} = {finalScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Big Meter & Output Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border-purple-500/30 text-center relative overflow-hidden bg-gradient-to-br from-indigo-950/30 via-slate-950 to-purple-950/30">
            
            {tier && (
              <span className={`inline-block text-xs font-mono font-bold px-4 py-1.5 rounded-full border mb-6 ${tier.color}`}>
                {tier.title}
              </span>
            )}

            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Calculated Overall Readiness Score</h4>

            {/* Main Score Ring */}
            <div className="relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-400 p-1 shadow-2xl shadow-purple-500/30 my-2">
              <div className="w-full h-full bg-slate-950 rounded-full flex flex-col items-center justify-center p-4">
                <span className="text-5xl font-extrabold text-gradient">{finalScore}%</span>
                <span className="text-xs text-slate-400 font-mono mt-1">Readiness Index</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto space-y-2">
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-500"
                  style={{ width: `${finalScore}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>0% (Unprepared)</span>
                <span>50%</span>
                <span>100% (Placement Ready)</span>
              </div>
            </div>

            {/* Breakdown Summary Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Phase 1 Contribution</span>
                <div className="text-lg font-bold text-indigo-400 mt-1">
                  +{(pScore * 0.7).toFixed(1)} Pts
                </div>
                <span className="text-[10px] text-slate-500">From 70% Hard Skill Weight</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                <span className="text-xs text-slate-400 font-medium">Phase 2 Contribution</span>
                <div className="text-lg font-bold text-cyan-400 mt-1">
                  +{(bScore * 0.3).toFixed(1)} Pts
                </div>
                <span className="text-[10px] text-slate-500">From 30% Non-Verbal Posture</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
