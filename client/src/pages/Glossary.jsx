import React, { useState, useContext } from 'react';
import { ClubContext } from '../context/ClubContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Search, Compass, BookOpen, Layers } from 'lucide-react';

const ComponentDiagram = ({ symbol }) => {
  
  switch (symbol) {
    case 'MCU':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="50" y="50" width="100" height="100" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
          {}
          <rect x="70" y="70" width="60" height="60" rx="4" fill="#020617" stroke="#1e293b" strokeWidth="2" />
          <Cpu className="w-8 h-8 text-cyber-glow/80 absolute inset-0 m-auto animate-pulse" style={{ left: '42%', top: '42%', width: '32px', height: '32px', position: 'absolute' }} />
          
          {}
          {[...Array(6)].map((_, i) => (
            <React.Fragment key={i}>
              {}
              <line x1="30" y1={65 + i * 15} x2="50" y2={65 + i * 15} stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
              {}
              <line x1="150" y1={65 + i * 15} x2="170" y2={65 + i * 15} stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
              {}
              <line x1={65 + i * 15} y1="30" x2={65 + i * 15} y2="50" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
              {}
              <line x1={65 + i * 15} y1="150" x2={65 + i * 15} y2="170" stroke="#06b6d4" strokeWidth="3.5" strokeLinecap="round" />
            </React.Fragment>
          ))}

          {}
          <circle cx="85" cy="85" r="3" fill="#10b981" className="animate-ping" />
          <circle cx="115" cy="115" r="3" fill="#00f2fe" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        </svg>
      );

    case 'MOTOR':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="60" y="70" width="80" height="70" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
          {}
          <line x1="100" y1="35" x2="100" y2="70" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
          <line x1="100" y1="20" x2="100" y2="35" stroke="#00f2fe" strokeWidth="5" strokeLinecap="round" />
          
          {}
          <g transform="translate(100, 28)" className="origin-center animate-[spin_3s_linear_infinite]">
            <line x1="-15" y1="0" x2="15" y2="0" stroke="#00f2fe" strokeWidth="2" />
            <circle cx="-15" cy="0" r="3" fill="#00f2fe" />
            <circle cx="15" cy="0" r="3" fill="#00f2fe" />
          </g>

          {}
          <line x1="75" y1="140" x2="75" y2="165" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          <line x1="125" y1="140" x2="125" y2="165" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
          <circle cx="75" cy="165" r="4" fill="#ef4444" />
          <circle cx="125" cy="165" r="4" fill="#3b82f6" />

          {}
          <path d="M 40 80 Q 25 105 40 130" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" className="animate-pulse" />
          <path d="M 160 80 Q 175 105 160 130" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" className="animate-pulse" />
        </svg>
      );

    case 'US_SENS':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <circle cx="65" cy="100" r="28" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
          <circle cx="135" cy="100" r="28" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
          
          {}
          <circle cx="65" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="135" cy="100" r="20" fill="none" stroke="#1e293b" strokeWidth="1.5" strokeDasharray="4 2" />

          {}
          <circle cx="65" cy="100" r="6" fill="#00f2fe" />
          <circle cx="135" cy="100" r="6" fill="#00f2fe" />

          {}
          <path d="M 50 55 A 50 50 0 0 0 20 100 A 50 50 0 0 0 50 145" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" className="animate-ping" style={{ transformOrigin: '65px 100px' }} />
          
          {}
          <path d="M 150 65 A 40 40 0 0 1 170 100 A 40 40 0 0 1 150 135" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
        </svg>
      );

    case 'TX_RX':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="50" y="60" width="100" height="110" rx="15" fill="#0f172a" stroke="#06b6d4" strokeWidth="3" />
          
          {}
          <line x1="100" y1="20" x2="100" y2="60" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="20" r="6" fill="#00f2fe" filter="url(#glow)" />
          
          {}
          <circle cx="75" cy="100" r="18" fill="#020617" stroke="#1e293b" strokeWidth="2" />
          <circle cx="125" cy="100" r="18" fill="#020617" stroke="#1e293b" strokeWidth="2" />
          
          {}
          <circle cx="78" cy="97" r="6" fill="#06b6d4" />
          <line x1="75" y1="100" x2="78" y2="97" stroke="#06b6d4" strokeWidth="2" />

          {}
          <circle cx="122" cy="103" r="6" fill="#06b6d4" />
          <line x1="125" y1="100" x2="122" y2="103" stroke="#06b6d4" strokeWidth="2" />

          {}
          <path d="M 85 10 A 25 25 0 0 1 115 10" fill="none" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 3" className="animate-bounce" />
          <path d="M 70 -2 A 45 45 0 0 1 130 -2" fill="none" stroke="#00f2fe" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
        </svg>
      );

    case 'FC_UAV':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="50" y="50" width="100" height="100" rx="6" fill="#083344" stroke="#06b6d4" strokeWidth="3" transform="rotate(45 100 100)" />
          
          {}
          <rect x="82" y="82" width="36" height="36" rx="3" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          
          {}
          <path d="M 100 65 L 100 90 M 93 75 L 100 65 L 107 75" fill="none" stroke="#00f2fe" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <circle cx="65" cy={65 + i * 22} r="3" fill="#f59e0b" />
              <circle cx="135" cy={65 + i * 22} r="3" fill="#f59e0b" />
            </React.Fragment>
          ))}
          
          {}
          <circle cx="88" cy="130" r="3.5" fill="#ef4444" className="animate-pulse" />
          <circle cx="112" cy="130" r="3.5" fill="#10b981" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
        </svg>
      );

    case 'DHT22':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="65" y="45" width="70" height="110" rx="6" fill="#1e3a8a" stroke="#06b6d4" strokeWidth="3" />
          
          {}
          {[...Array(6)].map((_, i) => (
            <rect key={i} x="75" y={58 + i * 14} width="50" height="5" rx="1.5" fill="#0f172a" />
          ))}

          {}
          <line x1="80" y1="155" x2="80" y2="185" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="93" y1="155" x2="93" y2="185" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="107" y1="155" x2="107" y2="185" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
          <line x1="120" y1="155" x2="120" y2="185" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />

          {}
          <circle cx="50" cy="70" r="2.5" fill="#38bdf8" className="animate-bounce" />
          <circle cx="150" cy="120" r="2" fill="#38bdf8" className="animate-bounce" style={{ animationDelay: '0.6s' }} />
        </svg>
      );

    case 'IR_SENS':
      return (
        <svg viewBox="0 0 200 200" className="w-48 h-48 mx-auto filter drop-shadow-[0_0_15px_rgba(6,182,212,0.2)]">
          {}
          <rect x="55" y="70" width="90" height="90" rx="8" fill="#14532d" stroke="#06b6d4" strokeWidth="3" />
          
          {}
          <rect x="75" y="40" width="16" height="30" rx="6" fill="#0369a1" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="83" cy="48" r="4" fill="#38bdf8" />
          
          {}
          <rect x="109" y="40" width="16" height="30" rx="6" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
          <circle cx="117" cy="48" r="4" fill="#1e293b" />

          {}
          <circle cx="100" cy="120" r="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
          <line x1="100" y1="120" x2="100" y2="108" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />

          {}
          <path d="M 83 25 L 83 5 Q 100 -5 117 5 L 117 25" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" className="animate-pulse" />
        </svg>
      );

    default:
      return (
        <div className="w-40 h-40 flex items-center justify-center border border-dashed border-cyber-border rounded-lg text-gray-500">
          <BookOpen className="w-10 h-10 animate-pulse" />
        </div>
      );
  }
};

const Glossary = () => {
  const { glossary } = useContext(ClubContext);
  const [selectedId, setSelectedId] = useState(glossary[0]?.id || '');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGlossary = glossary.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.theory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedItem = glossary.find(item => item.id === selectedId) || glossary[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left min-h-screen">
      
      {}
      <div className="space-y-2 mb-12">
        <h1 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">KNOWLEDGE HUB</h1>
        <p className="text-3xl sm:text-4xl font-bold font-sans">Robotics Component Glossary</p>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Deep-dive into the technical details, electrical characteristics, and physical working principles of core hardware elements used in modern robotics engineering.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-cyber-border bg-cyber-card text-sm text-gray-200 focus:outline-none focus:border-cyber-glow/50 transition-colors"
            />
          </div>

          <div className="glass-card rounded-xl overflow-hidden p-2 flex flex-col gap-1 max-h-[500px] overflow-y-auto">
            {filteredGlossary.length > 0 ? (
              filteredGlossary.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg text-left text-sm font-medium tracking-wide transition-all duration-200 ${
                    selectedItem?.id === item.id
                      ? 'bg-cyber-glow/15 text-cyber-glow border-l-2 border-cyber-glow'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Cpu className="w-4 h-4 opacity-70" />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-50 bg-cyber-border/80 px-1.5 py-0.5 rounded">
                    {item.symbol}
                  </span>
                </button>
              ))
            ) : (
              <div className="py-8 text-center text-xs text-gray-500 font-mono">
                No matching components found.
              </div>
            )}
          </div>
        </div>

        {}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            {selectedItem ? (
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                {}
                <div className="glass-card p-6 sm:p-8 rounded-2xl grid grid-cols-1 sm:grid-cols-12 gap-8 items-center border-b border-cyber-border/30">
                  <div className="sm:col-span-4 flex justify-center bg-black/30 rounded-xl py-4 border border-cyber-border/40">
                    <ComponentDiagram symbol={selectedItem.symbol} />
                  </div>
                  <div className="sm:col-span-8 space-y-4 text-left">
                    <span className="inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-cyber-glow/10 text-cyber-glow border border-cyber-glow/30">
                      ID: {selectedItem.symbol}
                    </span>
                    <h2 className="text-2xl font-bold font-sans text-white">{selectedItem.name}</h2>
                    <p className="text-sm text-gray-300 leading-relaxed">{selectedItem.theory}</p>
                  </div>
                </div>

                {}
                <div className="glass-card p-6 sm:p-8 rounded-2xl space-y-6 text-left">
                  <div className="flex items-center space-x-2 border-b border-cyber-border/20 pb-3">
                    <Compass className="w-5 h-5 text-cyber-glow" />
                    <h3 className="text-lg font-bold font-sans">Working Principle & Data Flow</h3>
                  </div>

                  <div className="relative border-l border-cyber-border/60 pl-6 ml-3 space-y-6">
                    {selectedItem.working && selectedItem.working.map((step, idx) => (
                      <div key={idx} className="relative">
                        {}
                        <div className="absolute -left-[35px] top-0.5 w-6 h-6 rounded-full bg-cyber-card border border-cyber-glow/50 text-[10px] font-mono text-cyber-glow flex items-center justify-center shadow-[0_0_8px_rgba(6,182,212,0.15)]">
                          {idx + 1}
                        </div>
                        <p className="text-sm text-gray-300 leading-relaxed font-sans">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ) : (
              <div className="glass-card p-12 rounded-2xl text-center text-gray-500 font-mono">
                Select a component from the menu to inspect details.
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Glossary;
