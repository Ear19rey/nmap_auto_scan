export interface ScriptStep {
  id: number;
  title: string;
  command?: string;
  description: string;
  icon: 'terminal' | 'folder' | 'search' | 'shield' | 'activity' | 'file-text' | 'check';
  color: 'blue' | 'emerald' | 'rose' | 'amber' | 'purple';
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  description?: string;
  children?: FileNode[];
}
