import React from 'react';

export default function ContributionCard({ phase, title, weight, pts, colorClass = 'border-indigo-200 bg-indigo-50/40 text-[#635BFF]' }) {
  return (
    <div className={`p-5 rounded-2xl border ${colorClass} flex items-center justify-between shadow-2xs`}>
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{phase}</span>
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 font-medium">{weight} weight</p>
      </div>

      <div className="text-right">
        <div className="text-2xl font-extrabold tracking-tight">
          +{pts !== null && pts !== undefined ? pts : 0} <span className="text-xs font-bold text-slate-400">pts</span>
        </div>
      </div>
    </div>
  );
}
