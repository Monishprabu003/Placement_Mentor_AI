import React, { useState, useEffect } from 'react';
import { Award, Zap, CheckCircle2, Printer, ArrowRight, BarChart3, ShieldCheck } from 'lucide-react';
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
    <div className="py-8">
      <div className="app-container">
        
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
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-2 shadow-xs transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Export Official Report</span>
          </button>
        </div>

        {/* Desktop 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Weighted Input Adjuster (5 Cols) */}
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
              <div className="space-y-2.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Phase 1 Placement Score (70% Weight)</span>
                  <span className="font-mono text-[#635BFF] font-bold bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
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
              <div className="space-y-2.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Phase 2 Posture Score (30% Weight)</span>
                  <span className="font-mono text-blue-600 font-bold bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs">
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

              {/* Computation Formula Box */}
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

          {/* RIGHT COLUMN: Overall Readiness Meter & Tier (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-card text-center relative overflow-hidden space-y-6">
              
              {tier && (
                <span className={`inline-block text-xs font-bold px-4 py-1.5 rounded-full border ${tier.color}`}>
                  {tier.title}
                </span>
              )}

              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Calculated Overall Readiness Index
              </h4>

              {/* Large Score Meter Ring */}
              <div className="relative inline-flex items-center justify-center w-48 h-48 rounded-full bg-indigo-50 border-8 border-indigo-100 p-2 shadow-inner my-2">
                <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center shadow-xs border border-slate-100">
                  <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{finalScore}%</span>
                  <span className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-wider">Readiness Score</span>
                </div>
              </div>

              {/* Weighted Breakdown Progress Bars */}
              <div className="space-y-4 pt-4 border-t border-slate-100 text-left">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Phase 1 Contribution (70% Weight)</span>
                    <span className="font-bold text-[#635BFF]">{(pScore * 0.7).toFixed(1)} pts</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#635BFF] h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, pScore))}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-slate-700">
                    <span>Phase 2 Contribution (30% Weight)</span>
                    <span className="font-bold text-blue-600">{(bScore * 0.3).toFixed(1)} pts</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, Math.max(0, bScore))}%` }}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
