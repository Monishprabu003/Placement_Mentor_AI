import React from 'react';

export default function StatusBadge({ status = 'not_evaluated', customText = null }) {
  const getBadgeConfig = () => {
    switch (status) {
      case 'completed':
        return {
          icon: '✓',
          text: customText || 'Completed',
          className: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        };
      case 'in_progress':
        return {
          icon: '◐',
          text: customText || 'In Progress',
          className: 'bg-amber-50 text-amber-700 border-amber-200/80',
        };
      case 'ready':
        return {
          icon: '★',
          text: customText || 'Ready',
          className: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        };
      case 'not_evaluated':
      default:
        return {
          icon: '○',
          text: customText || 'Not Evaluated',
          className: 'bg-slate-100 text-slate-600 border-slate-200/80',
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-colors ${config.className}`}>
      <span className="text-[11px] leading-none">{config.icon}</span>
      <span>{config.text}</span>
    </span>
  );
}
