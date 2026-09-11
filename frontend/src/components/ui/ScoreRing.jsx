import React from 'react';

export default function ScoreRing({ score = 0, label = 'Readiness Score', tier = null, size = 200 }) {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedScore = Math.min(100, Math.max(0, score || 0));
  const strokeDashoffset = circumference - (normalizedScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {tier && (
        <span className={`inline-block text-xs font-extrabold px-4 py-1.5 rounded-full border ${tier.color}`}>
          {tier.title}
        </span>
      )}

      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#635BFF"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            {score !== null ? `${score}%` : '—'}
          </span>
          <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-1">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
