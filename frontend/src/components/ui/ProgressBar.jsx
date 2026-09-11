import React from 'react';

export default function ProgressBar({ value = 0, max = 100, label = null, colorClass = 'bg-[#635BFF]', height = 'h-2' }) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>{label}</span>
          <span className="font-bold text-slate-900">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${height}`}>
        <div
          className={`${colorClass} ${height} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
