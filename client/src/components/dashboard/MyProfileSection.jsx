import React from 'react';
import { getUploadsUrl } from '../../utils/api';

const MyProfileSection = ({ team, loggedInUser, onEdit, onLogout }) => {
  let profileObj = null;
  let profileType = 'core';

  if (team.coordinator && (team.coordinator.id === loggedInUser.id || team.coordinator._id === loggedInUser.id)) {
    profileObj = team.coordinator;
    profileType = 'coordinator';
  } else if (team.president && (team.president.id === loggedInUser.id || team.president._id === loggedInUser.id)) {
    profileObj = team.president;
    profileType = 'president';
  } else {
    const found = team.core.find(c => c.id === loggedInUser.id || c._id === loggedInUser.id);
    if (found) { profileObj = found; profileType = 'core'; }
  }

  if (!profileObj) {
    return (
      <div className="p-6 text-left max-w-xl mx-auto py-12">
        <div className="glass-card p-8 rounded-2xl border-l-4 border-l-red-500 space-y-5 shadow-[0_0_20px_rgba(239,68,68,0.15)] bg-slate-950/40">
          <div>
            <span className="text-[10px] font-mono text-red-400 tracking-widest block uppercase mb-1">SYSTEM WARNING</span>
            <h3 className="text-xl font-bold text-white">Profile Record Missing</h3>
            <p className="text-sm font-mono text-gray-400 mt-2">
              Your account exists in local storage, but the corresponding core member record was not found in the database.
            </p>
          </div>
          
          <div className="p-4 rounded-lg bg-red-950/20 border border-red-500/20 text-xs font-mono text-gray-400 space-y-2">
            <p><span className="text-red-400 font-semibold">User ID:</span> {loggedInUser?.id}</p>
            <p><span className="text-red-400 font-semibold">Username:</span> {loggedInUser?.name}</p>
            <p><span className="text-red-400 font-semibold">Clearance Role:</span> {loggedInUser?.role}</p>
          </div>

          <p className="text-xs text-gray-500 font-mono leading-relaxed">
            This usually happens if the database was re-seeded, or if your core member record was deleted or re-linked by the Web Coordinator.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={onLogout}
              className="px-4 py-2 border border-red-500/50 hover:bg-red-500/10 text-red-400 text-xs font-mono rounded transition-all active:scale-95 duration-200"
            >
              Sign Out & Reset Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isFaculty = profileType === 'coordinator' || (profileObj.role && profileObj.role.toLowerCase().includes('faculty'));

  return (
    <div className="p-6 space-y-6 text-left">
      <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start border-l-4 border-l-cyber-glow">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center">
          {profileObj.image ? (
            <img src={getUploadsUrl(profileObj.image)} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-3xl select-none">
              {profileObj.name ? profileObj.name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase() : 'Y'}
            </div>
          )}
        </div>
        <div className="space-y-4 flex-grow">
          <div>
            <span className="text-[10px] font-mono text-cyber-glow tracking-widest block uppercase mb-1">CORE MEMBER ACCOUNT PANEL</span>
            <h3 className="text-2xl font-bold text-white">{profileObj.name}</h3>
            <p className="text-sm text-gray-400 font-mono mt-0.5">{profileObj.role}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-cyber-darker/50 border border-cyber-border/40 text-sm font-mono text-gray-400">
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Email Address:</span>
              <p className="text-white font-semibold truncate">{profileObj.email || 'None'}</p>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">Phone Contact:</span>
              <p className="text-white font-semibold">{profileObj.phone || 'None'}</p>
            </div>
            {!isFaculty && (
              <>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">Roll Number:</span>
                  <p className="text-white font-semibold">{profileObj.roll || 'None'}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-gray-500">Academic Year / Semester:</span>
                  <p className="text-white font-semibold">{(profileObj.year && profileObj.sem) ? `${profileObj.year} / ${profileObj.sem}` : 'None'}</p>
                </div>
              </>
            )}
            <div className="space-y-1">
              <span className="text-xs text-gray-500">GitHub Profile:</span>
              <a href={profileObj.github || '#'} target="_blank" rel="noopener noreferrer" className="text-cyber-glow hover:underline truncate block">
                {profileObj.github || 'None'}
              </a>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-gray-500">LinkedIn Profile:</span>
              <a href={profileObj.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-cyber-glow hover:underline truncate block">
                {profileObj.linkedin || 'None'}
              </a>
            </div>
          </div>

          <div className="pt-4 border-t border-cyber-border/20">
            <button
              type="button"
              onClick={() => onEdit({ ...profileObj, type: profileType })}
              className="px-4 py-2 border border-cyber-glow/50 hover:bg-cyber-glow/10 text-cyber-glow text-xs font-mono rounded transition-colors"
            >
              Edit Profile Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfileSection;
