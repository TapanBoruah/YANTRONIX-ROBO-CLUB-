import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const EventsTable = ({ events, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-cyber-darker/60 border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase">
          <th className="px-6 py-4">Title</th>
          <th className="px-6 py-4">Date</th>
          <th className="px-6 py-4">Type</th>
          <th className="px-6 py-4">Location</th>
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-cyber-border/40 text-sm">
        {events.map((evt) => (
          <tr key={evt.id} className="hover:bg-cyber-darker/30 transition-colors">
            <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{evt.title}</td>
            <td className="px-6 py-4 text-xs font-mono text-gray-400">{evt.date}</td>
            <td className="px-6 py-4">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">{evt.type}</span>
            </td>
            <td className="px-6 py-4 text-xs text-gray-400 truncate max-w-xs">{evt.location}</td>
            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
              <button
                onClick={() => onEdit(evt)}
                className="p-1.5 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(evt.id)}
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

export default EventsTable;
