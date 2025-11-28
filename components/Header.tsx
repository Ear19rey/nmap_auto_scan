import React from 'react';
import { Terminal, Printer } from 'lucide-react';

export const Header: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#09090b]/80 backdrop-blur-md print:hidden">
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-zinc-900 rounded border border-zinc-800 text-indigo-500">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-zinc-200 tracking-wide">NMAP MANUAL</h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="group flex items-center gap-2 px-3 py-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors rounded border border-transparent hover:border-zinc-800 hover:bg-zinc-900"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PRINT / PDF</span>
          </button>
        </div>
      </div>
    </header>
  );
};