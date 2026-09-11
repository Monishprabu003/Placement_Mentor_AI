import React, { useState, useEffect } from 'react';
import PageContainer from './ui/PageContainer';
import PageHeader from './ui/PageHeader';
import ScoreRing from './ui/ScoreRing';
import ContributionCard from './ui/ContributionCard';
import SliderInput from './ui/SliderInput';
import { Award, Zap, CheckCircle2, Printer, ArrowRight, AlertTriangle, BookOpen } from 'lucide-react';
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
  const p1Pts = (pScore * 0.7).toFixed(1);
  const p2Pts = (bScore * 0.3).toFixed(1);

  return (
    <PageContainer>
      
      {/* Header */}
      <PageHeader
        badge="Final Readiness Engine"
        title="Final Placement Readiness"
        subtitle="Your final readiness score combines technical capability and interview behavior."
        rightActions={
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center space-x-2 shadow-2xs transition-all"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Export Official Report</span>
          </button>
        }
      />

      <div className="space-y-8">
        
        {/* TOP SECTION: OVERALL READINESS SCORE RING */}
        <div className="bg-white p-8 sm:p-10 rounded-2xl border border-slate-200 shadow-card text-center space-y-6 max-w-3xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
            OVERALL READINESS
          </div>

          <ScoreRing score={finalScore} tier={tier} size={220} />

          <div className="max-w-md mx-auto pt-2">
            <div className="flex justify-between text-xs font-semibold text-slate-400">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
              <div
                className="bg-[#635BFF] h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, finalScore || 0))}%` }}
              />
            </div>
          </div>
        </div>

        {/* TWO CONTRIBUTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <ContributionCard
            phase="Phase 1"
            title="Technical Skills"
            weight="70%"
            pts={p1Pts}
            colorClass="border-indigo-200 bg-indigo-50/40 text-[#635BFF]"
          />
          <ContributionCard
            phase="Phase 2"
            title="Interview Behavior"
            weight="30%"
            pts={p2Pts}
            colorClass="border-blue-200 bg-blue-50/40 text-blue-600"
          />
        </div>

        {/* FINAL SCORE FORMULA & ADJUSTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-5xl mx-auto">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              WEIGHTED INPUT ADJUSTER
            </h3>

            <SliderInput
              label="Phase 1 Placement Score (70% Weight)"
              value={pScore}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(val) => setPScore(parseFloat(val))}
            />

            <SliderInput
              label="Phase 2 Posture Score (30% Weight)"
              value={bScore}
              min={0}
              max={100}
              step={1}
              unit="%"
              onChange={(val) => setBScore(parseFloat(val))}
            />

            {/* Formula Display Box */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-600 space-y-1.5">
              <div className="text-slate-400 font-extrabold uppercase text-[10px] tracking-wider">FINAL SCORE FORMULA:</div>
              <div className="text-slate-700 font-semibold">
                (Phase 1 × 70%) + (Phase 2 × 30%)
              </div>
              <div className="text-[#635BFF] font-bold pt-1">
                Final = ({pScore} × 0.70) + ({bScore} × 0.30) = {p1Pts} + {p2Pts} = {finalScore}%
              </div>
            </div>
          </div>

          {/* Breakdown & Recommendations Column */}
          <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-card space-y-5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 border-b border-slate-100 pb-2">
              DIAGNOSTIC SUMMARY & RECOMMENDATIONS
            </h3>

            <div className="space-y-4 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1 font-medium">
                <span className="font-extrabold flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Strengths</span>
                </span>
                <p>High technical competence in core engineering skills and steady interview posture stability.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-1 font-medium">
                <span className="font-extrabold flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Skill Gaps</span>
                </span>
                <p>Maintain consistent eye focus and enhance cloud / DevOps domain knowledge prior to Tier 1 interviews.</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 space-y-1 font-medium">
                <span className="font-extrabold flex items-center space-x-1.5">
                  <BookOpen className="w-4 h-4 text-[#635BFF]" />
                  <span>Final Recommendation</span>
                </span>
                <p>Candidate is ready for campus recruitment drives. Conduct 1 additional mock interview to fine-tune posture confidence.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </PageContainer>
  );
}
