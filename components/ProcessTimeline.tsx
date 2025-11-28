import React from 'react';
import { PROCESS_STEPS, STEP_ICONS } from '../constants';

const StepCard: React.FC<{ step: typeof PROCESS_STEPS[0]; index: number; total: number }> = ({ step, index, total }) => {
  const Icon = STEP_ICONS[step.icon];
  
  // Refined color palettes for "Trap" aesthetic (darker backgrounds, neon borders)
  const styles = {
    blue:   { border: "group-hover:border-blue-500/40", icon: "text-blue-400", bg: "group-hover:bg-blue-500/5", glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]" },
    emerald:{ border: "group-hover:border-emerald-500/40", icon: "text-emerald-400", bg: "group-hover:bg-emerald-500/5", glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.1)]" },
    rose:   { border: "group-hover:border-rose-500/40", icon: "text-rose-400", bg: "group-hover:bg-rose-500/5", glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.1)]" },
    amber:  { border: "group-hover:border-amber-500/40", icon: "text-amber-400", bg: "group-hover:bg-amber-500/5", glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]" },
    purple: { border: "group-hover:border-purple-500/40", icon: "text-purple-400", bg: "group-hover:bg-purple-500/5", glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]" },
  };

  const activeStyle = styles[step.color];
  const isLast = index === total - 1;

  return (
    <div className="relative pl-10 sm:pl-12 group print:break-inside-avoid print:pl-0 print:mb-6">
      
      {/* Connector Line (Desktop/Mobile) */}
      {!isLast && (
        <div className="absolute left-[20px] sm:left-[24px] top-10 bottom-[-20px] w-px bg-zinc-800 group-hover:bg-zinc-700 transition-colors print:hidden"></div>
      )}

      {/* Node Dot */}
      <div className="absolute left-[13px] sm:left-[17px] top-5 w-[14px] h-[14px] rounded-full bg-zinc-900 border-2 border-zinc-700 z-10 group-hover:border-white transition-colors print:hidden">
         <div className={`w-full h-full rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-current ${activeStyle.icon}`}></div>
      </div>

      <div className={`relative p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 transition-all duration-300 ${activeStyle.border} ${activeStyle.bg} ${activeStyle.glow} print:print-force-white`}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-600 group-hover:text-zinc-400 transition-colors print:text-gray-500">
                    Step {String(step.id).padStart(2, '0')}
                </span>
            </div>
            <Icon className={`w-5 h-5 ${activeStyle.icon} opacity-60 group-hover:opacity-100 transition-opacity print:text-black`} />
        </div>

        <h3 className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors mb-2 print:text-black">
            {step.title}
        </h3>

        <p className="text-sm text-zinc-500 mb-4 leading-relaxed group-hover:text-zinc-400 transition-colors print:text-gray-700">
          {step.description}
        </p>

        {step.command && (
            <div className="inline-block w-full">
                <div className="px-3 py-2 rounded-md bg-black/50 border border-zinc-800/50 font-mono text-xs text-zinc-400 truncate hover:text-zinc-300 transition-colors print:bg-gray-100 print:text-black print:border-gray-300 print:whitespace-pre-wrap">
                    <span className="text-zinc-600 mr-2 select-none print:hidden">$</span>
                    {step.command}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export const ProcessTimeline: React.FC = () => {
  return (
    <div className="space-y-4">
      {PROCESS_STEPS.map((step, idx) => (
        <StepCard key={step.id} step={step} index={idx} total={PROCESS_STEPS.length} />
      ))}
    </div>
  );
};