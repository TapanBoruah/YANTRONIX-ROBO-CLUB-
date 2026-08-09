import React, { useState, useContext } from 'react';
import { ClubContext } from '../context/ClubContext';
import { Calendar, MapPin, Tag, Video, Terminal } from 'lucide-react';
import { getUploadsUrl } from '../utils/api';

const Events = () => {
  const { events, loading } = useContext(ClubContext);
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All'
    ? events
    : events.filter(e => e.type.toLowerCase() === filter.toLowerCase());

  const categories = ['All', 'Workshop', 'Competition', 'Webinar'];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyber-glow/20 border-t-cyber-glow animate-spin"></div>
        <p className="text-sm font-mono text-cyan-400 animate-pulse tracking-wider">RETRIEVING DATA FROM DATABASE...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="p-6 rounded-full bg-cyber-glow/5 border border-cyber-glow/20 text-cyber-glow animate-pulse">
          <Calendar className="w-16 h-16" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">Events Coming Soon</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            We are scheduling some exciting workshops, hackathons, and hardware design challenges. Telemetry links will go live here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left min-h-screen">
      
      {}
      <div className="space-y-2 mb-12">
        <h1 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">TIMELINE</h1>
        <p className="text-3xl sm:text-4xl font-bold font-sans">Workshops & Competitions</p>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Stay updated with current schedule timelines. Participate in hands-on microcontroller build contests, drone obstacle courses, and webinars.
        </p>
      </div>

      {}
      <div className="flex flex-wrap gap-2.5 mb-12 pb-2 border-b border-cyber-border/20">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
              filter === cat
                ? 'bg-cyber-glow text-black shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold'
                : 'bg-cyber-card text-gray-400 border border-cyber-border/60 hover:text-white hover:border-cyber-border'
            }`}
          >
            {cat.toUpperCase()}S
          </button>
        ))}
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between border-l-4 border-l-cyber-glow group h-full"
            >
              <div>
                {}
                <div className="relative aspect-[2.2/1] w-full overflow-hidden bg-slate-900 border-b border-cyber-border/40">
                  <img
                    src={getUploadsUrl(event.image)}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-transparent opacity-80"></div>
                </div>

                <div className="p-6 space-y-4">
                  {}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center space-x-1 text-xs font-mono text-cyber-glow">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyber-border text-emerald-400">
                      {event.type}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-sans text-white group-hover:text-cyber-glow transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {}
              <div className="p-6 pt-0 mt-auto">
                <div className="border-t border-cyber-border/10 pt-4 flex items-center space-x-2 text-xs font-mono text-gray-500">
                  {event.location.toLowerCase().includes('meet') || event.location.toLowerCase().includes('zoom') || event.location.toLowerCase().includes('virtual') ? (
                    <Video className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <MapPin className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                  )}
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-16 text-center glass-card rounded-2xl flex flex-col items-center justify-center space-y-3">
            <Terminal className="w-10 h-10 text-gray-600 animate-pulse" />
            <p className="text-sm font-mono text-gray-500">No scheduled events found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Events;
