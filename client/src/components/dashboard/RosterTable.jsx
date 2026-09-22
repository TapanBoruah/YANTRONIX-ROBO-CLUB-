import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Search, Copy, Check, Filter, RotateCcw, Phone, Mail, User } from 'lucide-react';
import { formatDate } from '../../utils/api';

const RosterTable = ({ roster = [], loggedInUser, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedId, setCopiedId] = useState(null);

  const isPastMember = (endDate) => {
    if (!endDate) return false;
    const clean = endDate.trim().toLowerCase();
    if (clean === '' || clean === 'present' || clean === 'till present') return false;
    const time = Date.parse(endDate);
    if (!isNaN(time)) return time < Date.now();
    if (/^[12][0-9]{3}$/.test(clean)) return parseInt(clean) < new Date().getFullYear();
    return true;
  };

  const handleCopy = (text, key) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedId(key);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredRoster = useMemo(() => {
    return roster.filter((m) => {
      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (m.name && m.name.toLowerCase().includes(q)) ||
        (m.roll && m.roll.toLowerCase().includes(q)) ||
        (m.phone && m.phone.toLowerCase().includes(q)) ||
        (m.email && m.email.toLowerCase().includes(q)) ||
        (m.username && m.username.toLowerCase().includes(q)) ||
        (m.year && m.year.toLowerCase().includes(q)) ||
        (m.sem && m.sem.toLowerCase().includes(q));

      // Year filter
      const matchesYear = yearFilter === 'all' || m.year === yearFilter;

      // Status filter
      const isPast = isPastMember(m.endDate);
      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && !isPast) ||
        (statusFilter === 'past' && isPast);

      return matchesSearch && matchesYear && matchesStatus;
    });
  }, [roster, searchQuery, yearFilter, statusFilter]);

  const activeCount = useMemo(() => roster.filter((m) => !isPastMember(m.endDate)).length, [roster]);
  const pastCount = roster.length - activeCount;

  const resetFilters = () => {
    setSearchQuery('');
    setYearFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="p-4 sm:p-6 space-y-4 text-left">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between pb-2 border-b border-cyber-border/30">
        <div className="relative flex-grow max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, roll no, email, phone..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-cyber-darker border border-cyber-border/60 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-cyber-darker border border-cyber-border/60 text-xs text-cyan-400 font-mono focus:outline-none cursor-pointer"
          >
            <option value="all">All Status ({roster.length})</option>
            <option value="active">Active Only ({activeCount})</option>
            <option value="past">Past / Alumni ({pastCount})</option>
          </select>

          {/* Academic Year Filter */}
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-cyber-darker border border-cyber-border/60 text-xs text-cyan-400 font-mono focus:outline-none cursor-pointer"
          >
            <option value="all">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>

          {(searchQuery || yearFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={resetFilters}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg border border-cyber-border text-xs text-gray-400 hover:text-white hover:bg-cyber-card transition-colors font-mono"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Info & Result Counter */}
      <div className="flex justify-between items-center text-[11px] font-mono text-gray-400 px-1">
        <div>
          Showing <span className="text-cyan-400 font-semibold">{filteredRoster.length}</span> of{' '}
          <span className="text-white">{roster.length}</span> members
        </div>
        <div className="text-[10px] text-gray-500 hidden sm:block">
          💡 Tip: Scroll sideways to view contact and login details. Member names and actions stay fixed!
        </div>
      </div>

      {/* Scrollable Table Container with Sticky Headers & Sticky Columns */}
      <div className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-320px)] min-h-[300px] border border-cyber-border/50 rounded-xl bg-slate-950/60 scrollbar-thin scrollbar-thumb-cyan-500/40 scrollbar-track-cyber-darker/60 shadow-inner relative">
        <table className="w-full text-left border-collapse min-w-[1050px]">
          <thead>
            <tr className="bg-cyber-darker/95 backdrop-blur-md border-b border-cyber-border text-xs font-mono text-cyan-400 uppercase sticky top-0 z-20 shadow-sm">
              {/* Sticky Name Header */}
              <th className="px-5 py-3.5 sticky left-0 top-0 bg-cyber-darker z-30 border-r border-cyber-border/40 shadow-[2px_0_6px_rgba(0,0,0,0.35)] min-w-[190px]">
                Member Name
              </th>
              <th className="px-5 py-3.5 min-w-[120px]">Roll No.</th>
              <th className="px-5 py-3.5 min-w-[150px]">Phone Contact</th>
              <th className="px-5 py-3.5 min-w-[200px]">Email Address</th>
              <th className="px-5 py-3.5 min-w-[130px]">Year / Sem</th>
              <th className="px-5 py-3.5 min-w-[140px]">Status / Tenure</th>
              {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && (
                <th className="px-5 py-3.5 min-w-[180px]">Login Credentials</th>
              )}
              {/* Sticky Actions Header */}
              <th className="px-4 py-3.5 text-right sticky right-0 top-0 bg-cyber-darker z-30 border-l border-cyber-border/40 shadow-[-2px_0_6px_rgba(0,0,0,0.35)] min-w-[90px]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-cyber-border/30 text-sm font-sans">
            {filteredRoster.map((m) => {
              const isPast = isPastMember(m.endDate);
              const isCredCopied = copiedId === `cred-${m.id}`;
              const isEmailCopied = copiedId === `email-${m.id}`;
              const isRollCopied = copiedId === `roll-${m.id}`;

              return (
                <tr
                  key={m.id}
                  className={`hover:bg-cyan-950/20 transition-colors group ${
                    isPast ? 'opacity-80 bg-slate-950/40' : 'bg-transparent'
                  }`}
                >
                  {/* Sticky Name Column */}
                  <td className="px-5 py-3.5 font-semibold text-white sticky left-0 bg-slate-950/95 group-hover:bg-slate-900/95 z-10 border-r border-cyber-border/40 shadow-[2px_0_6px_rgba(0,0,0,0.35)] whitespace-nowrap">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 flex items-center justify-center text-xs font-mono font-bold select-none flex-shrink-0">
                        {m.name ? m.name[0].toUpperCase() : 'Y'}
                      </div>
                      <span className="truncate max-w-[140px] sm:max-w-[170px]" title={m.name}>
                        {m.name}
                      </span>
                    </div>
                  </td>

                  {/* Roll Number */}
                  <td className="px-5 py-3.5 font-mono text-xs text-gray-300 whitespace-nowrap">
                    <button
                      onClick={() => handleCopy(m.roll, `roll-${m.id}`)}
                      className="inline-flex items-center space-x-1.5 hover:text-cyan-400 transition-colors cursor-pointer group/roll"
                      title="Click to copy roll number"
                    >
                      <span>{m.roll || 'Pending'}</span>
                      {isRollCopied ? (
                        <Check className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 opacity-0 group-hover/roll:opacity-100 text-gray-500 transition-opacity" />
                      )}
                    </button>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-300 whitespace-nowrap">
                    {m.phone && m.phone !== 'Pending' ? (
                      <a
                        href={`tel:${m.phone}`}
                        className="inline-flex items-center space-x-1.5 text-gray-300 hover:text-emerald-400 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-emerald-400/80 flex-shrink-0" />
                        <span>{m.phone}</span>
                      </a>
                    ) : (
                      <span className="text-gray-600">Pending</span>
                    )}
                  </td>

                  {/* Email */}
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-300 whitespace-nowrap">
                    {m.email && m.email !== 'Pending' ? (
                      <div className="flex items-center space-x-1.5">
                        <a
                          href={`mailto:${m.email}`}
                          className="hover:text-cyan-400 transition-colors truncate max-w-[170px]"
                          title={m.email}
                        >
                          {m.email}
                        </a>
                        <button
                          onClick={() => handleCopy(m.email, `email-${m.id}`)}
                          className="text-gray-500 hover:text-cyan-400 p-0.5"
                          title="Copy email"
                        >
                          {isEmailCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-600">Pending</span>
                    )}
                  </td>

                  {/* Year / Sem */}
                  <td className="px-5 py-3.5 text-xs font-mono text-gray-300 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-500/20 text-cyan-300/90 text-[11px]">
                      {m.year || '1st Year'} · {m.sem || '1st Sem'}
                    </span>
                  </td>

                  {/* Status / Tenure */}
                  <td className="px-5 py-3.5 text-xs font-mono whitespace-nowrap">
                    {isPast ? (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800/80 text-gray-400 border border-gray-700 text-[10px]">
                        <span>Past: {formatDate(m.startDate)} - {formatDate(m.endDate)}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-400 border border-emerald-500/25 text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span>Active ({m.endDate || 'Present'})</span>
                      </span>
                    )}
                  </td>

                  {/* Login Credentials */}
                  {(loggedInUser?.role === 'super' || loggedInUser?.role === 'rep') && (
                    <td className="px-5 py-3.5 font-mono text-xs text-cyan-400 whitespace-nowrap">
                      {m.username ? (
                        <div className="flex items-center space-x-2">
                          <span className="select-all bg-cyber-darker px-2 py-0.5 rounded border border-cyan-500/20 text-[11px]">
                            {m.username} / {m.password}
                          </span>
                          <button
                            onClick={() => handleCopy(`${m.username} / ${m.password}`, `cred-${m.id}`)}
                            className="p-1 text-gray-500 hover:text-cyan-400 transition-colors"
                            title="Copy credentials"
                          >
                            {isCredCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-600">None</span>
                      )}
                    </td>
                  )}

                  {/* Sticky Actions Column */}
                  <td className="px-4 py-3.5 text-right whitespace-nowrap sticky right-0 bg-slate-950/95 group-hover:bg-slate-900/95 z-10 border-l border-cyber-border/40 shadow-[-2px_0_6px_rgba(0,0,0,0.35)]">
                    <div className="flex items-center justify-end space-x-1.5">
                      <button
                        onClick={() => onEdit(m)}
                        className="p-1.5 rounded border border-cyber-border hover:border-cyan-400/60 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                        title="Edit Member"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(m.id, m.name, 'roster')}
                          className="p-1.5 rounded border border-red-500/20 hover:border-red-500/60 text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {filteredRoster.length === 0 && (
              <tr>
                <td colSpan={10} className="px-6 py-12 text-center text-xs font-mono text-gray-500">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-400">No member records found matching the current filters.</p>
                    <button
                      onClick={resetFilters}
                      className="px-3 py-1.5 rounded border border-cyber-border text-cyan-400 hover:bg-cyan-500/10 text-xs transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RosterTable;
