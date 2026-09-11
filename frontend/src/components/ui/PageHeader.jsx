import React from 'react';

export default function PageHeader({ badge, title, subtitle, rightActions }) {
  return (
    <div className="mb-8 pb-6 border-b border-slate-200/80 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
      <div className="space-y-1.5">
        {badge && (
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#635BFF] text-xs font-bold uppercase tracking-wider mb-1">
            {badge}
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-slate-600 max-w-3xl font-normal leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {rightActions && (
        <div className="shrink-0">
          {rightActions}
        </div>
      )}
    </div>
  );
}
