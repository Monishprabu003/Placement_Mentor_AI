import React from 'react';
import PageContainer from './ui/PageContainer';
import PageHeader from './ui/PageHeader';
import StatusBadge from './ui/StatusBadge';
import ProgressBar from './ui/ProgressBar';
import { BrainCircuit, Video, Award, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

export default function OverviewDashboard({ setActiveTab, placementScore, behaviourScore, finalScore }) {
  const pStatus = placementScore !== null ? 'completed' : 'not_evaluated';
  const bStatus = behaviourScore !== null ? 'completed' : 'not_evaluated';
  const fStatus = finalScore !== null ? 'ready' : (placementScore !== null || behaviourScore !== null ? 'in_progress' : 'not_evaluated');

  return (
    <PageContainer>
      
      {/* Top Header */}
      <PageHeader
        badge="AI-POWERED PLACEMENT READINESS"
        title="Master Your Placement Readiness"
        subtitle="Your central AI dashboard evaluating technical competencies and non-verbal interview behavior with precision ML models."
      />

      {/* 3 Summary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch mb-12">
        
        {/* Card 1: Phase 1 */}
        <div 
          onClick={() => setActiveTab('placement')}
          className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-[#635BFF]">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <StatusBadge status={pStatus} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phase 1</span>
              <h3 className="text-lg font-extrabold text-slate-900">Academic & Technical Skills</h3>
              <p className="text-xs text-slate-500 mt-1">Random Forest score prediction on 15 skill parameters.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {placementScore !== null ? `${placementScore}%` : '—'}
                </div>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Placement Probability</p>
              </div>
            </div>

            <ProgressBar value={placementScore || 0} colorClass="bg-[#635BFF]" />

            <button className="w-full py-2.5 rounded-xl bg-indigo-50 text-[#635BFF] hover:bg-[#635BFF] hover:text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 border border-indigo-100">
              <span>Open Phase 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 2: Phase 2 */}
        <div 
          onClick={() => setActiveTab('interview')}
          className="bg-white p-7 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Activity className="w-5 h-5" />
              </div>
              <StatusBadge status={bStatus} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Phase 2</span>
              <h3 className="text-lg font-extrabold text-slate-900">Posture & Interview Behavior</h3>
              <p className="text-xs text-slate-500 mt-1">YOLO26-Pose 17 COCO keypoint non-verbal analysis.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {behaviourScore !== null ? `${behaviourScore.toFixed(1)}%` : '—'}
                </div>
                <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Behavioral Score</p>
              </div>
            </div>

            <ProgressBar value={behaviourScore || 0} colorClass="bg-blue-600" />

            <button className="w-full py-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 border border-blue-100">
              <span>Open Phase 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 3: Final Score */}
        <div 
          onClick={() => setActiveTab('final')}
          className="bg-gradient-to-br from-white via-indigo-50/20 to-purple-50/30 p-7 rounded-2xl border-2 border-indigo-200/80 shadow-md hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between h-full relative overflow-hidden"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                <Zap className="w-5 h-5" />
              </div>
              <StatusBadge status={fStatus} />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#635BFF] uppercase tracking-wider">Final Engine</span>
              <h3 className="text-lg font-extrabold text-slate-900">Placement Readiness</h3>
              <p className="text-xs text-slate-500 mt-1">Weighted composite readiness index.</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-indigo-100/80 space-y-4">
            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-3xl font-extrabold text-[#635BFF] tracking-tight">
                  {finalScore !== null ? `${finalScore}%` : 'Pending'}
                </div>
                <p className="text-[11px] text-slate-500 font-semibold mt-0.5">Composite Score</p>
              </div>
            </div>

            <ProgressBar value={finalScore || 0} colorClass="bg-[#635BFF]" />

            <button className="w-full py-2.5 rounded-xl bg-[#635BFF] text-white hover:bg-[#5349E0] font-bold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-xs">
              <span>View Final Score</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Analytics & Readiness Weighting Overview Section */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-card space-y-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Readiness Overview
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Dual-engine evaluation breakdown and component weighting matrix.
            </p>
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/70">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#635BFF]"></span>
              <span>70% Technical</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span>30% Behavior</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50/60 p-5 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Technical Capability</span>
            <div className="text-2xl font-extrabold text-slate-900">
              {placementScore !== null ? `${placementScore}%` : 'Not Evaluated'}
            </div>
            <p className="text-xs text-slate-500 font-medium">Contributes 70% to composite readiness</p>
          </div>

          <div className="bg-slate-50/60 p-5 rounded-xl border border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Interview Behavior</span>
            <div className="text-2xl font-extrabold text-slate-900">
              {behaviourScore !== null ? `${behaviourScore.toFixed(1)}%` : 'Not Evaluated'}
            </div>
            <p className="text-xs text-slate-500 font-medium">Contributes 30% to composite readiness</p>
          </div>

          <div className="bg-indigo-50/40 p-5 rounded-xl border border-indigo-100 space-y-2">
            <span className="text-[11px] font-bold text-[#635BFF] uppercase tracking-wider">Final Readiness Score</span>
            <div className="text-2xl font-extrabold text-[#635BFF]">
              {finalScore !== null ? `${finalScore}%` : 'Pending Evaluation'}
            </div>
            <p className="text-xs text-slate-600 font-medium">Weighted matrix: (P1 × 0.7) + (P2 × 0.3)</p>
          </div>
        </div>

      </div>

    </PageContainer>
  );
}
