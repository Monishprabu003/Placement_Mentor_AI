import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, color = 'indigo', progress }) {
  const colorStyles = {
    indigo: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30 text-indigo-400',
    cyan: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    emerald: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400',
    rose: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
    amber: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
  }[color];

  return (
    <div className="glass-panel glass-panel-hover p-6 rounded-2xl relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorStyles} blur-2xl opacity-40 group-hover:opacity-70 transition-opacity`}></div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-slate-400">{title}</span>
        <div className={`p-3 rounded-xl bg-slate-900/80 border border-slate-800 ${colorStyles.split(' ').pop()}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex items-baseline space-x-2">
        <h3 className="text-3xl font-extrabold text-white tracking-tight">{value}</h3>
        {subtitle && <span className="text-xs text-slate-400 font-medium">{subtitle}</span>}
      </div>
      {typeof progress === 'number' && (
        <div className="mt-4 w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
