import React from 'react';
import { getUploadsUrl } from '../../utils/api';

const MyRecordSection = ({ roster, loggedInUser, onEdit, onLogout }) => {
  const recordObj = roster.find(r => r.id === loggedInUser.id || r._id === loggedInUser.id);
  if (!recordObj) {
    return (
      <div className="p-6 text-left max-w-xl mx-auto py-12">
        <div className="glass-card p-8 rounded-2xl border-l-4 border-l-amber-500 space-y-5 shadow-[0_0_20px_rgba(245,158,11,0.15)] bg-slate-950/40">
          <div>
            <span className="text-[10px] font-mono text-amber-500 tracking-widest block uppercase mb-1">SYSTEM WARNING</span>
            <h3 className="text-xl font-bold text-white">Roster Record Missing</h3>
            <p className="text-sm font-mono text-gray-400 mt-2">
              Your account exists in local storage, but the corresponding general member roster record was not found in the database.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs font-mono text-gray-400 space-y-2">
            <p><span className="text-amber-500 font-semibold">User ID:</span> {loggedInUser?.id}</p>
            <p><span className="text-amber-500 font-semibold">Username:</span> {loggedInUser?.name}</p>
            <p><span className="text-amber-500 font-semibold">Clearance Role:</span> {loggedInUser?.role}</p>
          </div>

          <p className="text-xs text-gray-500 font-mono leading-relaxed">
            This usually happens if the database was re-seeded, or if your roster member record was deleted or re-linked by the Web Coordinator.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 text-xs font-mono rounded transition-all active:scale-95 duration-200"
            >
              Sign Out & Reset Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 text-left">
      <div className="glass-card p-8 rounded-2xl border-l-4 border-l-amber-500 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center">
          {recordObj.image ? (
            <img src={getUploadsUrl(recordObj.image)} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-3xl select-none">
              {recordObj.name ? recordObj.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'Y'}
            </div>
          )}
        </div>
        <div className="space-y-4 flex-grow w-full">
          <div>
            <span className="text-[10px] font-mono text-amber-500 tracking-widest block uppercase mb-1">MEMBER REGISTRATION RECORD</span>
            <h3 className="text-2xl font-bold text-white">{recordObj.name}</h3>
            <p className="text-xs text-gray-500 font-mono mt-0.5">Clearance: General Member</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-cyber-darker/50 border border-cyber-border/40 text-sm font-mono">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Roll Number:</span>
              <p className="text-white font-semibold">{recordObj.roll}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Phone Contact:</span>
              <p className="text-white font-semibold">{recordObj.phone}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Email Address:</span>
              <p className="text-white font-semibold">{recordObj.email}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Academic Year / Semester:</span>
              <p className="text-white font-semibold">{recordObj.year} / {recordObj.sem}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">GitHub Profile:</span>
              <a href={recordObj.github || '#'} target="_blank" rel="noopener noreferrer" className="text-cyber-glow hover:underline truncate block">
                {recordObj.github || 'None'}
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">LinkedIn Profile:</span>
              <a href={recordObj.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-cyber-glow hover:underline truncate block">
                {recordObj.linkedin || 'None'}
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onEdit(recordObj)}
              className="px-4 py-2 border border-amber-500/50 hover:bg-amber-500/10 text-amber-400 text-xs font-mono rounded transition-colors"
            >
              Edit Registration Info
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRecordSection;
