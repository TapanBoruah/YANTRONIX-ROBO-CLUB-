import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const RosterTable = ({ roster, loggedInUser, onEdit, onDelete }) => {
  return (
    <table className="w-full text-left border-collapse min-w-[700px]">
      <thead>
        <tr className="bg-cyber-darker/60 border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase">
          <th className="px-6 py-4">Name</th>
          <th className="px-6 py-4">Roll No.</th>
          <th className="px-6 py-4">Phone No.</th>
          <th className="px-6 py-4">Email Address</th>
          <th className="px-6 py-4">Year & Sem</th>
          {loggedInUser?.role === 'super' && <th className="px-6 py-4">Credentials</th>}
          <th className="px-6 py-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-cyber-border/40 text-sm">
        {roster.map((m) => (
          <tr key={m.id} className="hover:bg-cyber-darker/30 transition-colors">
            <td className="px-6 py-4 font-semibold text-white whitespace-nowrap">{m.name}</td>
            <td className="px-6 py-4 font-mono text-xs text-gray-300">{m.roll}</td>
            <td className="px-6 py-4 text-xs text-gray-300">{m.phone}</td>
            <td className="px-6 py-4 text-xs text-gray-300">{m.email}</td>
            <td className="px-6 py-4 text-xs text-gray-400 whitespace-nowrap">
              {m.year} / {m.sem}
            </td>
            {loggedInUser?.role === 'super' && (
              <td className="px-6 py-4 font-mono text-xs text-cyan-400 select-all">
                {m.username ? `${m.username} / ${m.password}` : 'None'}
              </td>
            )}
            <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
              <button
                onClick={() => onEdit(m)}
                className="p-1.5 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
                title="Edit"
              >
                <Edit className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(m.id)}
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

export default RosterTable;
