import React, { useContext } from 'react';
import { ClubContext } from '../context/ClubContext';
import { Mail, Shield, GraduationCap, Award } from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Team = () => {
  const { team, loading } = useContext(ClubContext);

  const getInitials = (name) => {
    if (!name) return 'Y';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin"></div>
        <p className="text-sm font-mono text-cyan-400 animate-pulse tracking-wider">LOADING TEAM DIRECTORY...</p>
      </div>
    );
  }

  const { coordinator, president, core, members } = team;

  if (!coordinator && !president && core.length === 0 && members.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="p-6 rounded-full bg-cyan-500/5 border border-cyan-500/20 text-cyan-400 animate-pulse">
          <Shield className="w-16 h-16" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">Crew Assembly Pending</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            The यंत्रonix crew list is being assembled. Please check back soon as clearance levels are established.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left min-h-screen">
      
      {}
      <div className="space-y-2 mb-16 text-center lg:text-left">
        <h1 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">ORGANIZATION</h1>
        <p className="text-3xl sm:text-4xl font-bold font-sans">Meet the यंत्रonix Crew</p>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          The builders, programmers, and strategists coordinating robotics development, competitive hackathons, and administrative routines for NIT Arunachal Pradesh.
        </p>
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {}
        {coordinator && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-center border-l-4 border-l-cyan-500">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center">
              {coordinator.image ? (
                <img src={coordinator.image} alt={coordinator.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-2xl select-none">
                  {getInitials(coordinator.name)}
                </div>
              )}
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-cyan-400 font-mono text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>FACULTY ADVISOR</span>
              </div>
              <h2 className="text-xl font-bold font-sans text-white">{coordinator.name}</h2>
              <p className="text-sm text-gray-400 font-medium leading-tight">{coordinator.role}</p>
              {coordinator.email && (
                <a
                  href={`mailto:${coordinator.email}`}
                  className="inline-flex items-center space-x-1 text-xs font-mono text-cyber-glow hover:text-white transition-colors duration-200"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{coordinator.email}</span>
                </a>
              )}
            </div>
          </div>
        )}

        {}
        {president && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-center border-l-4 border-l-emerald-500">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center">
              {president.image ? (
                <img src={president.image} alt={president.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-2xl select-none">
                  {getInitials(president.name)}
                </div>
              )}
            </div>
            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-emerald-400 font-mono text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>EXECUTIVE PANEL</span>
              </div>
              <h2 className="text-xl font-bold font-sans text-white">{president.name}</h2>
              <p className="text-sm text-gray-400 font-medium leading-tight">{president.role}</p>
              <div className="flex justify-center sm:justify-start space-x-3 pt-1">
                {president.github && (
                  <a href={president.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {president.linkedin && (
                  <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {}
      <div className="space-y-6 mb-16">
        <div className="flex items-center space-x-2 border-b border-cyber-border/30 pb-3">
          <Award className="w-5 h-5 text-cyber-glow" />
          <h2 className="text-lg font-bold font-sans uppercase tracking-wider">Core Committee</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {core && core.map((member) => (
            <div key={member.id} className="glass-card p-5 rounded-xl flex flex-col items-center text-center justify-center space-y-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative group-hover:border-cyber-glow/50 transition-colors flex items-center justify-center">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-xl select-none">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
              <div className="space-y-1.5 w-full">
                <h3 className="text-base font-bold font-sans text-white leading-tight">{member.name}</h3>
                <span className="inline-block text-[11px] font-mono text-cyber-glow/80 bg-cyber-glow/5 px-2 py-0.5 rounded border border-cyber-glow/15">
                  {member.role}
                </span>
              </div>
              <div className="w-full flex justify-center space-x-3 pt-2 border-t border-cyber-border/10">
                <a href={member.github || 'https://github.com'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyber-glow transition-colors duration-200">
                  <GithubIcon className="w-3.5 h-3.5" />
                </a>
                <a href={member.linkedin || 'https://linkedin.com'} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyber-glow transition-colors duration-200">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-cyber-border/30 pb-3">
          <Shield className="w-4.5 h-4.5 text-cyan-500" />
          <h2 className="text-lg font-bold font-sans uppercase tracking-wider">Club Members</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {members && members.map((member) => (
            <div
              key={member.id}
              className="glass-card p-4 rounded-xl flex flex-col items-center text-center justify-center space-y-3 border border-cyber-border/30"
            >
              <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-xs select-none">
                    {getInitials(member.name)}
                  </div>
                )}
              </div>
              <div className="w-full truncate">
                <h3 className="text-xs font-bold font-sans text-white truncate leading-tight">{member.name}</h3>
                <p className="text-[9px] text-gray-500 font-mono mt-0.5">Club Member</p>
              </div>
              <div className="flex justify-center space-x-2.5 pt-1.5 border-t border-cyber-border/10 w-full">
                {member.github ? (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyber-glow transition-colors">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-gray-700 cursor-not-allowed">
                    <GithubIcon className="w-3.5 h-3.5 opacity-30" />
                  </span>
                )}
                {member.linkedin ? (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-cyber-glow transition-colors">
                    <LinkedinIcon className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-gray-700 cursor-not-allowed">
                    <LinkedinIcon className="w-3.5 h-3.5 opacity-30" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Team;
