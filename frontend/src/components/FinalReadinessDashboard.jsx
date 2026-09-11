import React, { useState, useEffect } from 'react';
import { Award, Zap, CheckCircle2, Printer, ArrowRight, RotateCcw, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FinalReadinessDashboard({ placementScore, behaviourScore }) {
  const [pScore, setPScore] = useState(placementScore !== null && placementScore !== undefined ? placementScore : 85);
  const [bScore, setBScore] = useState(behaviourScore !== null && behaviourScore !== undefined ? behaviourScore : 80);
  const [finalScore, setFinalScore] = useState(null);

  const calculateFinal = (p, b) => {
    const calc = (p * 0.7) + (b * 0.3);
    const result = Math.round(calc * 10) / 10;
    setFinalScore(result);

    if (result >= 80) {
      confetti({
        particleCount: 70,
        spread: 60,
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
    if (score >= 90) return { title: 'Tier 1 – Elite Job Ready', color: 'text-emerald-700 border-emerald-200 bg-emerald-50' };
    if (score >= 80) return { title: 'Tier 2 – Highly Competitive', color: 'text-indigo-700 border-indigo-200 bg-indigo-50' };
    if (score >= 70) return { title: 'Tier 3 – Job Ready Candidate', color: 'text-blue-700 border-blue-200 bg-blue-50' };
    if (score >= 60) return { title: 'Tier 4 – Needs Technical Polish', color: 'text-amber-700 border-amber-200 bg-amber-50' };
    return { title: 'Tier 5 – Intensive Prep Needed', color: 'text-rose-700 border-rose-200 bg-rose-50' };
  };

  const tier = finalScore !== null ? getReadinessTier(finalScore) : null;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5 text-[#635BFF]" />
            <span>Integrated Readiness Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Final Placement Readiness Analytics
          </h2>
          <p className="mt-1 text-slate-600 text-sm max-w-2xl">
            Synthesizes Phase 1 Technical Skills (<strong className="text-slate-900 font-semibold">70% weight</strong>) with Phase 2 Interview Behavior (<strong className="text-slate-900 font-semibold">30% weight</strong>).
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center space-x-2 shadow-sm transition-all"
        >
          <Printer className="w-4 h-4 text-slate-500" />
          <span>Export Official Report</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-card space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Weighted Input Adjuster
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulate different academic and behavioral scores to forecast your composite rating.
              </p>
            </div>

            {/* Slider 1: Placement Score */}
            <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Phase 1 Placement Score (70% Weight)</span>
                <span className="font-mono text-[#635BFF] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                  {pScore}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={pScore}
                onChange={(e) => setPScore(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 2: Interview Posture Score */}
            <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Phase 2 Posture Score (30% Weight)</span>
                <span className="font-mono text-blue-600 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                  {bScore}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={bScore}
                onChange={(e) => setBScore(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Weighted Formula Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600 space-y-1.5">
              <div className="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Computation Formula:</div>
              <div className="text-slate-700 font-medium">
                Final = ({pScore} × 0.70) + ({bScore} × 0.30)
              </div>
              <div className="text-[#635BFF] font-bold">
                Final = {(pScore * 0.7).toFixed(1)} + {(bScore * 0.3).toFixed(1)} = {finalScore}%
              </div>
            </div>
          </div>
        </div>

        {/* Big Meter & Output Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-card text-center relative overflow-hidden">
            
            {tier && (
              <span className={`inline-block text-xs font-bold px-3.5 py-1 rounded-full border mb-6 ${tier.color}`}>
                {tier.title}
              </span>
            )}

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Calculated Overall Readiness Index
            </h4>

            {/* Main Score Ring */}
            <div className="relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-indigo-50 border-8 border-indigo-100 p-2 shadow-inner my-2">
              <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center shadow-sm border border-slate-100">
                <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{finalScore}%</span>
                <span className="text-xs text-slate-400 font-medium mt-1">Readiness Score</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-8 max-w-md mx-auto space-y-2">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-[#635BFF] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, finalScore))}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-medium text-slate-400">
                <span>0% (Unprepared)</span>
                <span>50%</span>
                <span>100% (Job Ready)</span>
              </div>
            </div>

            {/* Contribution Breakdown Grid */}
            <div className="mt-8 grid grid-cols-2 gap-4 text-left">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Phase 1 Contribution</span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  +{(pScore * 0.7).toFixed(1)} Pts
                </div>
                <span className="text-[11px] text-slate-400">From 70% Technical Weight</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 font-medium">Phase 2 Contribution</span>
                <div className="text-xl font-bold text-slate-900 mt-1">
                  +{(bScore * 0.3).toFixed(1)} Pts
                </div>
                <span className="text-[11px] text-slate-400">From 30% Posture Weight</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
