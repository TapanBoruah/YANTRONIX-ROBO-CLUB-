import React, { useContext } from 'react';
import { ClubContext } from '../context/ClubContext';
import { Mail, Phone, Shield, GraduationCap, Award, RotateCcw } from 'lucide-react';
import { getUploadsUrl, formatDate } from '../utils/api';

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

const formatAcademic = (year, sem) => {
  const cleanYear = year && year !== 'Pending' ? year.trim() : '';
  const cleanSem = sem && sem !== 'Pending' ? sem.trim() : '';
  if (cleanYear && cleanSem) return `${cleanYear} · ${cleanSem}`;
  if (cleanYear) return cleanYear;
  if (cleanSem) return cleanSem;
  return null;
};

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

  const { coordinator, president, core, members, past } = team;

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
      
      {/* Header section */}
      <div className="space-y-2 mb-16 text-center lg:text-left">
        <h1 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">ORGANIZATION</h1>
        <p className="text-3xl sm:text-4xl font-bold font-sans">Meet the यंत्रonix Crew</p>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          The builders, programmers, and strategists coordinating robotics development, competitive hackathons, and administrative routines for NIT Arunachal Pradesh.
        </p>
      </div>

      {/* Leadership Section: Faculty & President */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Faculty Coordinator */}
        {coordinator && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start border-l-4 border-l-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.15)] transition-all">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center shadow-inner">
              {coordinator.image ? (
                <img src={getUploadsUrl(coordinator.image)} alt={coordinator.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-2xl select-none">
                  {getInitials(coordinator.name)}
                </div>
              )}
            </div>
            <div className="space-y-3 text-center sm:text-left flex-grow min-w-0">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-cyan-400 font-mono text-xs">
                <GraduationCap className="w-4 h-4" />
                <span>FACULTY ADVISOR</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-sans text-white">{coordinator.name}</h2>
                <p className="text-sm text-gray-400 font-medium leading-tight mt-0.5">{coordinator.role}</p>
              </div>

              {/* Contact Information */}
              <div className="space-y-1.5 pt-1 text-xs font-mono">
                {coordinator.email && coordinator.email !== 'Pending' && (
                  <a
                    href={`mailto:${coordinator.email}`}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-cyber-glow hover:text-white transition-colors duration-200 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
                    <span className="truncate">{coordinator.email}</span>
                  </a>
                )}
                {coordinator.phone && coordinator.phone !== 'Pending' && (
                  <a
                    href={`tel:${coordinator.phone}`}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-emerald-400 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                    <span>{coordinator.phone}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Club President */}
        {president && (
          <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start border-l-4 border-l-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center shadow-inner">
              {president.image ? (
                <img src={getUploadsUrl(president.image)} alt={president.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-2xl select-none">
                  {getInitials(president.name)}
                </div>
              )}
            </div>
            <div className="space-y-3 text-center sm:text-left flex-grow min-w-0">
              <div className="flex items-center justify-center sm:justify-start space-x-1.5 text-emerald-400 font-mono text-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>EXECUTIVE PANEL</span>
              </div>
              <div>
                <h2 className="text-xl font-bold font-sans text-white">{president.name}</h2>
                <p className="text-sm text-gray-400 font-medium leading-tight mt-0.5">{president.role}</p>
                {formatAcademic(president.year, president.sem) && (
                  <span className="inline-block text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/25 mt-1.5">
                    {formatAcademic(president.year, president.sem)}
                  </span>
                )}
              </div>

              {/* Contact Information */}
              <div className="space-y-1.5 pt-1 text-xs font-mono">
                {president.email && president.email !== 'Pending' && (
                  <a
                    href={`mailto:${president.email}`}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-cyber-glow hover:text-white transition-colors duration-200 truncate"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
                    <span className="truncate">{president.email}</span>
                  </a>
                )}
                {president.phone && president.phone !== 'Pending' && (
                  <a
                    href={`tel:${president.phone}`}
                    className="flex items-center justify-center sm:justify-start space-x-2 text-emerald-400 hover:text-white transition-colors duration-200"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 text-emerald-400" />
                    <span>{president.phone}</span>
                  </a>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-center sm:justify-start space-x-3 pt-1 border-t border-cyber-border/20">
                {president.github && (
                  <a href={president.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors" title="GitHub">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {president.linkedin && (
                  <a href={president.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors" title="LinkedIn">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Core Committee & Officers Section (Vice Presidents, Web Coordinators, Core Members) */}
      <div className="space-y-6 mb-16">
        <div className="flex items-center space-x-2 border-b border-cyber-border/30 pb-3">
          <Award className="w-5 h-5 text-cyber-glow" />
          <h2 className="text-lg font-bold font-sans uppercase tracking-wider">Vice Presidents & Core Committee</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {core && core.map((member) => (
            <div
              key={member.id}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between space-y-4 border border-cyber-border/40 hover:border-cyber-glow/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.12)] transition-all group"
            >
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative group-hover:border-cyber-glow/50 transition-colors flex items-center justify-center shadow-inner">
                  {member.image ? (
                    <img src={getUploadsUrl(member.image)} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-xl select-none">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
                
                <div className="space-y-1.5 flex-grow min-w-0">
                  <h3 className="text-base font-bold font-sans text-white leading-tight truncate" title={member.name}>{member.name}</h3>
                  <span className="inline-block text-[11px] font-mono text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/25">
                    {member.role || 'Core Committee'}
                  </span>
                  {formatAcademic(member.year, member.sem) && (
                    <div className="text-[10px] font-mono text-gray-400 mt-1">
                      {formatAcademic(member.year, member.sem)}
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Information & Academic Details */}
              <div className="p-3 rounded-xl bg-cyber-darker/60 border border-cyber-border/30 space-y-2 text-xs font-mono">
                {member.email && member.email !== 'Pending' ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center space-x-2 text-gray-300 hover:text-cyber-glow transition-colors truncate"
                    title={member.email}
                  >
                    <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600 truncate">
                    <Mail className="w-3.5 h-3.5 flex-shrink-0 opacity-40" />
                    <span className="truncate text-[11px]">Email: Not set</span>
                  </div>
                )}

                {member.phone && member.phone !== 'Pending' ? (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-3.5 h-3.5 flex-shrink-0 opacity-40" />
                    <span className="text-[11px]">Phone: Not set</span>
                  </div>
                )}
              </div>

              {/* Socials & Links */}
              <div className="w-full flex justify-end space-x-3 pt-2 border-t border-cyber-border/15">
                {member.github ? (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors duration-200" title="GitHub">
                    <GithubIcon className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-gray-700 cursor-not-allowed">
                    <GithubIcon className="w-4 h-4 opacity-30" />
                  </span>
                )}
                {member.linkedin ? (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors duration-200" title="LinkedIn">
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                ) : (
                  <span className="text-gray-700 cursor-not-allowed">
                    <LinkedinIcon className="w-4 h-4 opacity-30" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* General Club Members Section */}
      <div className="space-y-6">
        <div className="flex items-center space-x-2 border-b border-cyber-border/30 pb-3">
          <Shield className="w-4.5 h-4.5 text-cyan-500" />
          <h2 className="text-lg font-bold font-sans uppercase tracking-wider">Club Members</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {members && members.map((member) => (
            <div
              key={member.id}
              className="glass-card p-5 rounded-xl flex flex-col justify-between space-y-3.5 border border-cyber-border/30 hover:border-cyber-glow/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.08)] transition-all group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center shadow-inner">
                  {member.image ? (
                    <img src={getUploadsUrl(member.image)} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-xs select-none">
                      {getInitials(member.name)}
                    </div>
                  )}
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold font-sans text-white truncate leading-tight" title={member.name}>{member.name}</h3>
                  <p className="text-[10px] text-gray-500 font-mono mt-0.5">Club Member</p>
                  {formatAcademic(member.year, member.sem) && (
                    <span className="inline-block text-[9px] font-mono text-amber-400 bg-amber-950/40 px-1.5 py-0.2 rounded border border-amber-500/20 mt-1">
                      {formatAcademic(member.year, member.sem)}
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="p-2.5 rounded-lg bg-cyber-darker/50 border border-cyber-border/20 space-y-1.5 text-[11px] font-mono">
                {member.email && member.email !== 'Pending' ? (
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center space-x-1.5 text-gray-400 hover:text-cyber-glow transition-colors truncate"
                    title={member.email}
                  >
                    <Mail className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                    <span className="truncate">{member.email}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-1.5 text-gray-600 truncate text-[10px]">
                    <Mail className="w-3 h-3 flex-shrink-0 opacity-40" />
                    <span className="truncate">Email: Not set</span>
                  </div>
                )}

                {member.phone && member.phone !== 'Pending' ? (
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center space-x-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                ) : (
                  <div className="flex items-center space-x-1.5 text-gray-600 text-[10px]">
                    <Phone className="w-3 h-3 flex-shrink-0 opacity-40" />
                    <span>Phone: Not set</span>
                  </div>
                )}
              </div>

              {/* Social Links */}
              <div className="flex justify-end space-x-2.5 pt-2 border-t border-cyber-border/10 w-full">
                {member.github ? (
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors" title="GitHub">
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-gray-700 cursor-not-allowed">
                    <GithubIcon className="w-3.5 h-3.5 opacity-30" />
                  </span>
                )}
                {member.linkedin ? (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors" title="LinkedIn">
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

      {/* Past Members & Alumni Section */}
      {past && past.length > 0 && (
        <div className="space-y-6 pt-16 border-t border-cyber-border/20 mt-16 text-left">
          <div className="flex items-center space-x-2 border-b border-cyber-border/30 pb-3">
            <RotateCcw className="w-5 h-5 text-cyber-glow" />
            <h2 className="text-lg font-bold font-sans uppercase tracking-wider">Past Members & Alumni</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {past.map((member) => (
              <div key={member.id} className="glass-card p-5 rounded-xl flex flex-col justify-between space-y-4 border border-cyber-border/20 opacity-90 hover:opacity-100 hover:border-cyber-glow/30 transition-all group">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 border border-cyber-border flex-shrink-0 relative flex items-center justify-center grayscale group-hover:grayscale-0 transition-all shadow-inner">
                    {member.image ? (
                      <img src={getUploadsUrl(member.image)} alt={member.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyber-darker to-cyber-border text-cyber-glow font-mono font-bold text-xl select-none">
                        {getInitials(member.name)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-grow min-w-0">
                    <h3 className="text-sm font-bold font-sans text-white leading-tight truncate">{member.name}</h3>
                    <span className="inline-block text-[10px] font-mono text-gray-400 bg-cyber-border/40 px-2 py-0.5 rounded border border-cyber-border/10">
                      {member.role || 'Member'}
                    </span>
                    <p className="text-[10px] font-mono text-cyan-400/80 mt-1">
                      {formatDate(member.startDate)} &mdash; {formatDate(member.endDate)}
                    </p>
                  </div>
                </div>

                {/* Contact & Academic Details */}
                {(member.email || member.phone || formatAcademic(member.year, member.sem)) && (
                  <div className="p-2.5 rounded-lg bg-cyber-darker/40 border border-cyber-border/20 space-y-1 text-[10px] font-mono text-gray-400">
                    {formatAcademic(member.year, member.sem) && (
                      <div className="text-cyan-400/80">{formatAcademic(member.year, member.sem)}</div>
                    )}
                    {member.email && member.email !== 'Pending' && (
                      <div className="truncate">{member.email}</div>
                    )}
                    {member.phone && member.phone !== 'Pending' && (
                      <div className="text-emerald-400/80">{member.phone}</div>
                    )}
                  </div>
                )}

                <div className="w-full flex justify-end space-x-3 pt-2 border-t border-cyber-border/10">
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
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyber-glow transition-colors">
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
      )}

    </div>
  );
};

export default Team;
