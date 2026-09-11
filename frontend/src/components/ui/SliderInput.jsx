import React from 'react';

export default function SliderInput({
  label,
  value,
  onChange,
  min = 0,
  max = 10,
  step = 1,
  unit = '',
  maxDisplay = null
}) {
  const displayMax = maxDisplay !== null ? maxDisplay : max;
  const formattedValue = step < 1 ? Number(value).toFixed(1) : value;

  return (
    <div className="bg-slate-50/60 p-4 rounded-xl border border-slate-200/70 space-y-2.5 hover:border-indigo-200 transition-colors">
      <div className="flex justify-between items-center text-xs font-bold text-slate-800">
        <span>{label}</span>
        <span className="font-mono text-[#635BFF] bg-white px-2.5 py-0.5 rounded border border-slate-200 shadow-2xs font-extrabold text-xs">
          {formattedValue}{unit ? ` ${unit}` : ''} / {displayMax}{unit ? ` ${unit}` : ''}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
      />

      <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-0.5">
        <span>{min}</span>
        <span>{max / 2}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
