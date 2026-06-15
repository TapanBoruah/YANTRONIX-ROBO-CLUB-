import React from 'react';

const MyProfileSection = ({ team, loggedInUser, onEdit }) => {
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
      <div className="p-6 space-y-3">
        <p className="text-sm font-mono text-red-400">Profile not found. Your account exists but the member record is missing.</p>
        <p className="text-xs text-gray-500 font-mono">User ID: {loggedInUser?.id} — please ask your Web Coordinator to check your account in Manage Team.</p>
      </div>
    );
  }

  const isFaculty = profileType === 'coordinator' || (profileObj.role && profileObj.role.toLowerCase().includes('faculty'));

  return (
    <div className="p-6 space-y-6 text-left">
      <div className="glass-card p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start border-l-4 border-l-cyber-glow">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative">
          <img src={profileObj.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80'} alt="" className="w-full h-full object-cover" />
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
