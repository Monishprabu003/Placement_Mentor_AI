import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'indigo', progress }) {
  const colorStyles = {
    indigo: {
      bg: 'bg-indigo-50',
      border: 'border-indigo-100',
      text: 'text-[#635BFF]',
      bar: 'bg-[#635BFF]',
    },
    cyan: {
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      text: 'text-blue-600',
      bar: 'bg-blue-600',
    },
    emerald: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      text: 'text-emerald-600',
      bar: 'bg-emerald-600',
    },
    rose: {
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      text: 'text-rose-600',
      bar: 'bg-rose-600',
    },
    amber: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      text: 'text-amber-600',
      bar: 'bg-amber-600',
    },
  }[color] || {
    bg: 'bg-slate-50',
    border: 'border-slate-100',
    text: 'text-slate-700',
    bar: 'bg-slate-700',
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-card hover:shadow-card-hover transition-all group">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        {Icon && (
          <div className={`p-2.5 rounded-xl ${colorStyles.bg} ${colorStyles.border} ${colorStyles.text} border`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline space-x-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{value}</h3>
        {subtitle && <span className="text-xs text-slate-500 font-medium">{subtitle}</span>}
      </div>

      {typeof progress === 'number' && (
        <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
          <div
            className={`h-full ${colorStyles.bar} rounded-full transition-all duration-500`}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        </div>
      )}
    </div>
  );
}
