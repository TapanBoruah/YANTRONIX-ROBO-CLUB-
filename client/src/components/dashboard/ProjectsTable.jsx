import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const ProjectsTable = ({ projects, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-cyber-darker/60 border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase">
          <th className="px-6 py-4">Title</th>
          <th className="px-6 py-4">Tags</th>
          <th className="px-6 py-4">Description Preview</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-cyber-border/40 text-sm">
        {projects.map((proj) => (
          <tr key={proj.id} className="hover:bg-cyber-darker/30 transition-colors">
            <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{proj.title}</td>
            <td className="px-6 py-4">
              <div className="flex flex-wrap gap-1">
                {proj.tags && proj.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyber-border text-gray-400">{t}</span>
                ))}
              </div>
            </td>
            <td className="px-6 py-4 text-xs text-gray-400 max-w-sm truncate">{proj.description}</td>
            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
              <button
                onClick={() => onEdit(proj)}
                className="p-1.5 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(proj.id)}
                className="p-1.5 rounded border border-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-400 transition-all"
                title="Delete"
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

export default ProjectsTable;
