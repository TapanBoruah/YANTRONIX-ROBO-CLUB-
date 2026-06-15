import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Robot3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[420px] mx-auto flex items-center justify-center cursor-pointer select-none"
    >
      {}
      <div className="absolute inset-0 rounded-full border border-cyber-border/20 flex items-center justify-center">
        <div className="w-[85%] h-[85%] rounded-full border border-cyber-border/40 border-dashed animate-[spin_40s_linear_infinite]" />
      </div>
      <div className="absolute inset-0 rounded-full border border-cyber-glow/5 flex items-center justify-center">
        <div className="w-[60%] h-[60%] rounded-full border border-cyber-glow/10 flex items-center justify-center">
          <div className="w-[40%] h-[40%] rounded-full bg-cyber-glow/5 blur-xl" />
        </div>
      </div>

      {}
      <svg
        viewBox="0 0 400 450"
        className="w-full h-full relative z-10 drop-shadow-[0_0_25px_rgba(6,182,212,0.15)]"
      >
        <defs>
          <linearGradient id="cyberGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="100%" stopColor="#4facfe" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {}
        <path
          d="M175 250 L225 250 L215 285 L185 285 Z"
          fill="url(#cyberGrad)"
          stroke="#1e293b"
          strokeWidth="3"
        />
        <line x1="185" y1="260" x2="215" y2="260" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="185" y1="270" x2="215" y2="270" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 3" />

        {}
        <g style={{
          transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 12}px)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.6s ease-out'
        }}>
          {}
          <path d="M160 110 L140 70" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <path d="M240 110 L260 70" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
          <circle cx="140" cy="70" r="8" fill={isHovered ? "#00f2fe" : "#06b6d4"} filter="url(#glow)" />
          <circle cx="260" cy="70" r="8" fill={isHovered ? "#00f2fe" : "#06b6d4"} filter="url(#glow)" />

          {}
          <rect
            x="130"
            y="100"
            width="140"
            height="150"
            rx="30"
            fill="url(#cyberGrad)"
            stroke={isHovered ? "#00f2fe" : "#1e293b"}
            strokeWidth="3.5"
          />

          {}
          <rect
            x="145"
            y="120"
            width="110"
            height="85"
            rx="15"
            fill="#030712"
            stroke="#0f172a"
            strokeWidth="2"
          />
          <rect
            x="147"
            y="122"
            width="106"
            height="81"
            rx="13"
            fill="#06b6d4"
            fillOpacity="0.05"
          />

          {}
          <line x1="145" y1="140" x2="255" y2="140" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="145" y1="160" x2="255" y2="160" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="145" y1="182" x2="255" y2="182" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="172" y1="120" x2="172" y2="205" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="200" y1="120" x2="200" y2="205" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />
          <line x1="228" y1="120" x2="228" y2="205" stroke="#06b6d4" strokeOpacity="0.1" strokeWidth="1" />

          {}
          <g style={{
            transform: `translate(${mousePos.x * 12}px, ${mousePos.y * 8}px)`,
            transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s ease-out'
          }}>
            {}
            <circle cx="180" cy="155" r="14" fill="#030712" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="180" cy="155" r="7" fill="url(#accentGrad)" filter="url(#glow)" />
            {isHovered && <circle cx="183" cy="152" r="2" fill="#fff" />}

            {}
            <circle cx="220" cy="155" r="14" fill="#030712" stroke="#06b6d4" strokeWidth="2.5" />
            <circle cx="220" cy="155" r="7" fill="url(#accentGrad)" filter="url(#glow)" />
            {isHovered && <circle cx="223" cy="152" r="2" fill="#fff" />}
          </g>

          {}
          <path
            d={isHovered 
              ? "M175 190 Q187 175 200 190 T225 190" 
              : "M175 190 Q187 185 200 190 T225 190"
            }
            fill="none"
            stroke="#00f2fe"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glow)"
            className="transition-all duration-300"
          />
        </g>

        {}
        <rect
          x="120"
          y="280"
          width="160"
          height="140"
          rx="25"
          fill="url(#cyberGrad)"
          stroke="#1e293b"
          strokeWidth="3.5"
        />

        {}
        <rect
          x="140"
          y="300"
          width="120"
          height="65"
          rx="10"
          fill="#020617"
          stroke="#0f172a"
          strokeWidth="2.5"
        />

        {}
        <path
          d="M 142 332 Q 157 310, 172 332 T 202 332 T 232 332 T 258 332"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.5"
          strokeDasharray="6 3"
          strokeLinecap="round"
          filter="url(#glow)"
          className="animate-[marquee_6s_linear_infinite]"
        />

        {}
        <g transform="translate(170, 390)" className="origin-center animate-[spin_10s_linear_infinite]">
          <circle cx="0" cy="0" r="14" fill="none" stroke="#06b6d4" strokeWidth="3" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="6" fill="#06b6d4" fillOpacity="0.3" />
        </g>
        <g transform="translate(230, 390)" className="origin-center animate-[spin_12s_linear_infinite_reverse]">
          <circle cx="0" cy="0" r="18" fill="none" stroke="#00f2fe" strokeWidth="3" strokeDasharray="8 5" />
          <circle cx="0" cy="0" r="8" fill="#00f2fe" fillOpacity="0.3" />
        </g>

        {}
        <circle cx="120" cy="300" r="10" fill="#020617" stroke="#1e293b" strokeWidth="2" />
        <circle cx="280" cy="300" r="10" fill="#020617" stroke="#1e293b" strokeWidth="2" />
        <circle cx="120" cy="300" r="4" fill="#06b6d4" filter="url(#glow)" />
        <circle cx="280" cy="300" r="4" fill="#06b6d4" filter="url(#glow)" />
      </svg>

      {}
      {isHovered && (
        <div className="absolute top-2 left-2 font-mono text-[9px] text-cyber-glow flex flex-col gap-0.5 bg-black/40 backdrop-blur-sm p-1.5 rounded border border-cyber-border/40">
          <span>SYS.ATTITUDE: ACTIVE</span>
          <span>SYS.RADAR_SWEEP: OK</span>
          <span>SYS.MOTOR_RPM: 2400</span>
          <span>AI.COGNITIVE_GRID: 98%</span>
        </div>
      )}

      {isHovered && (
        <div className="absolute bottom-2 right-2 font-mono text-[9px] text-green-400 flex flex-col gap-0.5 bg-black/40 backdrop-blur-sm p-1.5 rounded border border-cyber-border/40">
          <span>BATTERY: 98.4%</span>
          <span>CORE_TEMP: 34.2C</span>
          <span>LINK: ENCRYPTED</span>
        </div>
      )}
    </div>
  );
};

export default Robot3D;
