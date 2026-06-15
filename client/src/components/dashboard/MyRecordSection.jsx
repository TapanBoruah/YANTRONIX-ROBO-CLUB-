import React from 'react';

const MyRecordSection = ({ roster, loggedInUser, onEdit }) => {
  const recordObj = roster.find(r => r.id === loggedInUser.id);
  if (!recordObj) return <p className="text-sm font-mono text-gray-500 p-6">Error: Member roster record not found.</p>;

  return (
    <div className="p-6 space-y-6 text-left">
      <div className="glass-card p-8 rounded-2xl border-l-4 border-l-amber-500 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative">
          <img src={recordObj.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} alt="" className="w-full h-full object-cover" />
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
