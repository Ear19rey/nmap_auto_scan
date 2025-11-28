import React from 'react';
import { Header } from './components/Header';
import { CodeViewer } from './components/CodeViewer';
import { ProcessTimeline } from './components/ProcessTimeline';
import { FileTree } from './components/FileTree';
import { Terminal, Play, Save, ShieldCheck, ChevronRight } from 'lucide-react';
import { EXECUTION_STEPS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative pb-20 text-zinc-300 overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-grid opacity-[0.15] pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      
      <Header />

      <main className="container mx-auto px-4 sm:px-6 py-12 max-w-7xl relative z-10">
        
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-medium mb-6 print:hidden shadow-[0_0_15px_rgba(99,102,241,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            AUTOMATION SCRIPT v5.0
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6 print:text-black">
            Nmap <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Auto Scan</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light print:text-gray-700">
            A battle-tested Bash script designed for Red Team engagements. Automates the full reconnaissance lifecycle with precision and speed.
          </p>
        </section>

        {/* Quick Start / Execution Guide */}
        <section className="mb-20 print:mb-10 print:break-inside-avoid">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-px bg-zinc-800 flex-1"></div>
                <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 print:text-black">Execution Protocol</h3>
                <div className="h-px bg-zinc-800 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {EXECUTION_STEPS.map((step, idx) => (
                    <div key={idx} className="group relative p-6 rounded-xl bg-zinc-900/50 border border-zinc-800/50 hover:bg-zinc-800/50 hover:border-indigo-500/30 transition-all duration-300 print:print-force-white">
                        <div className="absolute top-4 right-4 text-xs font-mono text-zinc-700 group-hover:text-indigo-500/50 transition-colors print:text-gray-400">{step.step}</div>
                        <div className="mb-4 p-3 w-fit rounded-lg bg-zinc-950 border border-zinc-800 group-hover:border-zinc-700 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all print:bg-gray-100 print:border-gray-200">
                           {idx === 0 && <Save className="w-5 h-5 text-indigo-400 print:text-black" />}
                           {idx === 1 && <ShieldCheck className="w-5 h-5 text-emerald-400 print:text-black" />}
                           {idx === 2 && <Play className="w-5 h-5 text-rose-400 print:text-black" />}
                           {idx === 3 && <Terminal className="w-5 h-5 text-amber-400 print:text-black" />}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2 print:text-black">{step.title}</h4>
                        <div className="px-3 py-1.5 rounded bg-black border border-zinc-800 font-mono text-xs text-zinc-400 mb-2 truncate group-hover:text-zinc-300 transition-colors print:bg-gray-50 print:text-black print:border-gray-200">
                            {step.cmd}
                        </div>
                        <p className="text-sm text-zinc-500 leading-snug print:text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Script & Artifacts */}
          <div className="lg:col-span-7 space-y-12">
            <section className="print:break-before-auto">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black">
                        <Terminal className="w-5 h-5 text-indigo-500" />
                        Source Code
                    </h3>
                </div>
                <CodeViewer />
            </section>

            <section className="print:break-inside-avoid">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 print:text-black">
                        <ChevronRight className="w-5 h-5 text-indigo-500" />
                        Directory Structure
                    </h3>
                </div>
                <FileTree />
            </section>
          </div>

          {/* Right: Technical Flow */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 print:static">
                <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-lg font-bold text-white print:text-black">Logic Flow</h3>
                    <div className="h-px bg-zinc-800 flex-1"></div>
                    <span className="text-xs font-mono text-zinc-500 print:hidden">AUTO_SEQ_01</span>
                </div>
                <ProcessTimeline />
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-zinc-900 text-center print:hidden">
            <div className="flex justify-center items-center gap-2 mb-4 opacity-50">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            </div>
            <p className="text-zinc-600 text-sm">
                Red Team Automation Manual &copy; {new Date().getFullYear()}
            </p>
        </footer>

      </main>
    </div>
  );
};

export default App;