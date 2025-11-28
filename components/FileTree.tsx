import React from 'react';
import { FileNode } from '../types';
import { Folder, FileText, FileCode, CornerDownRight } from 'lucide-react';
import { OUTPUT_TREE } from '../constants';

const TreeNode: React.FC<{ node: FileNode; level?: number; isLastChild?: boolean }> = ({ node, level = 0, isLastChild = false }) => {
  const isFolder = node.type === 'folder';
  const Icon = isFolder ? Folder : (node.name.endsWith('.xml') ? FileCode : FileText);
  
  // Tree structure line styling
  const indentClass = level > 0 ? "border-l border-zinc-800 ml-4 pl-4" : "";

  return (
    <div className={`relative ${level > 0 ? 'ml-2' : ''}`}>
      <div 
        className="group flex items-center gap-2 py-1.5 px-2 rounded hover:bg-zinc-800/50 transition-colors print:hover:bg-transparent"
      >
        <span className="text-zinc-700 font-mono print:hidden">
            {level > 0 && (isLastChild ? '└─' : '├─')}
        </span>
        
        <Icon className={`w-4 h-4 ${isFolder ? 'text-indigo-400 fill-indigo-400/10' : 'text-zinc-500'} print:text-black`} />
        
        <span className={`font-mono text-sm ${isFolder ? 'font-bold text-indigo-100' : 'text-zinc-300'} print:text-black`}>
            {node.name}
        </span>
        
        {node.description && (
          <span className="hidden sm:inline-block ml-auto text-xs font-mono text-zinc-600 group-hover:text-zinc-500 print:text-gray-500 print:italic">
            # {node.description}
          </span>
        )}
      </div>
      
      {node.children && (
        <div className={`ml-2 border-l border-zinc-800/50 print:border-gray-300 pl-1`}>
          {node.children.map((child, idx) => (
            <TreeNode 
                key={idx} 
                node={child} 
                level={level + 1} 
                isLastChild={idx === node.children!.length - 1} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC = () => {
  return (
    <div className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/20 backdrop-blur-sm print:print-force-white">
        <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800/50 print:border-gray-200">
            <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 print:hidden"></div>
            <h3 className="text-xs font-mono font-bold text-zinc-500 uppercase tracking-widest print:text-black">
                ./output_tree
            </h3>
        </div>
        <div className="pl-1">
            <TreeNode node={OUTPUT_TREE} />
        </div>
    </div>
  );
};