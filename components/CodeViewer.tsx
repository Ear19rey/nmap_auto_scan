import React, { useState } from 'react';
import { Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { SCRIPT_CONTENT } from '../constants';
import { explainScriptSection } from '../services/geminiService';

export const CodeViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SCRIPT_CONTENT);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAiAnalysis = async () => {
    if (!process.env.API_KEY) {
        setAiAnalysis("Please provide a valid Gemini API Key to use AI features.");
        return;
    }
    setIsLoading(true);
    setAiAnalysis(null);
    const result = await explainScriptSection("Explain the overall strategy of this script and the specific Nmap flags used.");
    setAiAnalysis(result);
    setIsLoading(false);
  };

  // Basic syntax highlighting simulation + Line numbers
  const codeLines = SCRIPT_CONTENT.split('\n');

  return (
    <div className="group rounded-xl overflow-hidden border border-zinc-800 bg-[#0c0c0e] shadow-2xl transition-all hover:border-zinc-700 print:print-force-white">
      {/* Editor Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800 backdrop-blur-sm print:bg-gray-100 print:border-gray-300">
        <div className="flex items-center gap-3">
            <div className="flex gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                <div className="w-3 h-3 rounded-full bg-rose-500/20 border border-rose-500/50 print:bg-gray-300 print:border-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50 print:bg-gray-300 print:border-gray-400"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50 print:bg-gray-300 print:border-gray-400"></div>
            </div>
            <div className="h-4 w-px bg-zinc-800 mx-1 print:hidden"></div>
            <span className="text-xs font-mono font-medium text-zinc-400 print:text-black">nmap_auto_scan.sh</span>
        </div>
        
        <div className="flex gap-2">
            <button
                onClick={handleAiAnalysis}
                disabled={isLoading}
                className="no-print flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 rounded hover:bg-indigo-500/20 hover:text-indigo-200 transition-all disabled:opacity-50"
            >
                <Sparkles className="w-3.5 h-3.5" />
                {isLoading ? 'Processing...' : 'Analyze'}
            </button>
            <button
                onClick={handleCopy}
                className="no-print flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400 bg-zinc-800/50 border border-zinc-700 rounded hover:bg-zinc-800 hover:text-zinc-200 transition-all"
            >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
            </button>
        </div>
      </div>
      
      {/* Code Area */}
      <div className="relative overflow-x-auto custom-scrollbar bg-[#0c0c0e] print:bg-white">
          <div className="flex min-w-full font-mono text-sm leading-6">
              {/* Line Numbers */}
              <div className="flex-none py-4 px-3 text-right text-zinc-700 select-none bg-zinc-900/30 border-r border-zinc-800/50 print:text-gray-400 print:bg-transparent print:border-gray-200">
                {codeLines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
              </div>
              
              {/* Code Content */}
              <div className="flex-1 py-4 px-4 text-zinc-300 print:text-black whitespace-pre">
                  {codeLines.map((line, i) => (
                    <div key={i} className={`${line.trim().startsWith('#') ? 'text-emerald-600/80 italic print:text-gray-500' : ''}`}>
                        {line || ' '}
                    </div>
                  ))}
              </div>
          </div>
      </div>

      {/* AI Analysis Result */}
      {aiAnalysis && (
        <div className="border-t border-indigo-500/20 bg-indigo-950/10 animate-in fade-in slide-in-from-top-2 no-print">
            <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-sm font-bold text-indigo-200 uppercase tracking-wide">Analysis Report</h4>
                </div>
                <div className="prose prose-invert prose-sm max-w-none">
                    <p className="text-indigo-100/70 text-sm leading-relaxed whitespace-pre-wrap font-sans">{aiAnalysis}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};