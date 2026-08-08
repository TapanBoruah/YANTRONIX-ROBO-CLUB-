import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

const TeamSection = ({ team, loggedInUser, onEdit, onDelete, onAddMember }) => {
  return (
    <div className="p-6 space-y-6 text-left">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-cyber-border/30">
        {team.coordinator && (
          <div className="p-4 rounded-lg bg-cyber-darker/40 border border-cyber-border flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 block mb-1">FACULTY COORDINATOR</span>
              <h4 className="text-base font-bold text-white">{team.coordinator.name}</h4>
              <p className="text-xs text-gray-400">{team.coordinator.role}</p>
              {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && team.coordinator.username && (
                <span className="text-[9px] font-mono text-cyan-400 select-all mt-1 block">
                  {team.coordinator.username} / {team.coordinator.password}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit({ ...team.coordinator, id: team.coordinator._id || team.coordinator.id })}
                className="p-2 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(team.coordinator._id || team.coordinator.id, team.coordinator.name, 'core')}
                className="p-2 rounded border border-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {team.president && (
          <div className="p-4 rounded-lg bg-cyber-darker/40 border border-cyber-border flex justify-between items-center">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 block mb-1">CLUB PRESIDENT</span>
              <h4 className="text-base font-bold text-white">{team.president.name}</h4>
              <p className="text-xs text-gray-400">{team.president.role}</p>
              {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && team.president.username && (
                <span className="text-[9px] font-mono text-cyan-400 select-all mt-1 block">
                  {team.president.username} / {team.president.password}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit({ ...team.president, id: team.president._id || team.president.id })}
                className="p-2 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(team.president._id || team.president.id, team.president.name, 'core')}
                className="p-2 rounded border border-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <h4 className="text-xs font-mono tracking-wider text-cyan-500 uppercase">Vice Presidents, Web Coordinators & Core Committee</h4>
        <div className="overflow-x-auto border border-cyber-border/40 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-cyber-darker/60 border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-center">Category</th>
                <th className="px-4 py-3 text-center">Order</th>
                {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && <th className="px-4 py-3">Credentials</th>}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cyber-border/40 text-sm">
              {team.core.map((member) => (
                <tr key={member.id} className="hover:bg-cyber-darker/30 transition-colors">
                  <td className="px-4 py-3 font-semibold text-white">
                    <div className="flex items-center space-x-3">
                      <img src={member.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&q=80'} alt="" className="w-8 h-8 rounded-full object-cover border border-cyber-border/60" />
                      <span>{member.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-400">{member.role}</td>
                  <td className="px-4 py-3 text-center text-xs font-mono text-cyan-400 capitalize whitespace-nowrap">
                    {member.position ? member.position.replace('_', ' ') : 'core committee'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-mono text-cyan-500 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                      #{member.order ?? 99}
                    </span>
                  </td>
                  {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && (
                    <td className="px-4 py-3 font-mono text-xs text-cyan-400 select-all">
                      {member.username ? `${member.username} / ${member.password}` : 'None'}
                    </td>
                  )}
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => onEdit({ ...member, type: member.type || 'core' })}
                      className="p-1 rounded border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(member.id, null, 'core')}
                      className="p-1 rounded border border-red-500/10 hover:border-red-500/50 text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {team.core.length === 0 && (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-xs text-gray-500 font-mono">
                    No core members yet. Use "ADD NEW ITEM" to create users.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-3 pt-6 border-t border-cyber-border/20">
        <div className="flex justify-between items-center">
          <h4 className="text-xs font-mono tracking-wider text-cyan-500 uppercase">General Members</h4>
          <button
            onClick={() => onAddMember()}
            className="px-2.5 py-1 border border-cyber-glow/40 hover:bg-cyber-glow/10 text-cyber-glow text-[10px] font-mono rounded transition-colors"
          >
            Add Member / Create User
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-lg bg-cyber-darker/20 border border-cyber-border/40">
          {team.members.map((member) => (
            <div key={member.id} className="flex items-start justify-between px-3 py-1.5 rounded bg-cyber-card border border-cyber-border text-xs text-gray-300 font-mono">
              <span className="truncate">
                <span>{member.name}</span>
                {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && member.username && (
                  <span className="block text-[9px] text-cyan-400 font-mono mt-0.5 select-all">
                    {member.username} / {member.password}
                  </span>
                )}
              </span>
              <button
                onClick={() => onDelete(member.id, member.name, 'members')}
                className="text-gray-500 hover:text-red-400 font-mono text-[10px] ml-2 mt-0.5 focus:outline-none flex-shrink-0"
                title="Remove member"
              >
                &times;
              </button>
            </div>
          ))}
          {team.members.length === 0 && (
            <div className="col-span-4 text-center text-xs text-gray-500 font-mono py-4">No general members yet.</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default TeamSection;
