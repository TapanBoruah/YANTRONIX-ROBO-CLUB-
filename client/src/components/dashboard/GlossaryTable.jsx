import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const GlossaryTable = ({ glossary, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-cyber-darker/60 border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase">
          <th className="px-6 py-4">Component Name</th>
          <th className="px-6 py-4">Symbol ID</th>
          <th className="px-6 py-4">Working Steps Count</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-cyber-border/40 text-sm">
        {glossary.map((item) => (
          <tr key={item.id} className="hover:bg-cyber-darker/30 transition-colors">
            <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{item.name}</td>
            <td className="px-6 py-4 font-mono text-xs text-cyber-glow">{item.symbol}</td>
            <td className="px-6 py-4 text-xs text-gray-400">{item.working?.length || 0} stages</td>
            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
              <button
                onClick={() => onEdit(item)}
                className="p-1.5 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded border border-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GlossaryTable;
