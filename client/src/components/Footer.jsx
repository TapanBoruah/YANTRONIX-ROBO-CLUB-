import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Mail, MapPin } from 'lucide-react';

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

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cyber-darker border-t border-cyber-border/40 relative z-10">
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-cyber-card border border-cyber-glow/30 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-cyber-glow" />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">
                यंत्रonix
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              The official Robotics and Automation Club of National Institute of Technology, Arunachal Pradesh. Empowering students to build the future through engineering, robotics design, and firmware innovation.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-cyber-card border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all duration-300">
                <GithubIcon className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-cyber-card border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all duration-300">
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded bg-cyber-card border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all duration-300">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="mailto:yantronix@nitap.ac.in" className="p-2 rounded bg-cyber-card border border-cyber-border hover:border-cyber-glow/50 text-gray-400 hover:text-cyber-glow transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {}
          <div className="space-y-4">
            <h3 className="text-sm font-mono tracking-wider text-cyber-glow uppercase">NAVIGATION</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/glossary" className="text-gray-400 hover:text-white transition-colors duration-200">Component Glossary</Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-white transition-colors duration-200">Events & Workshops</Link>
              </li>
              <li>
                <Link to="/team" className="text-gray-400 hover:text-white transition-colors duration-200">Meet The Team</Link>
              </li>
            </ul>
          </div>

          {}
          <div className="space-y-4">
            <h3 className="text-sm font-mono tracking-wider text-cyber-glow uppercase">CONTACT</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4.5 h-4.5 text-cyber-glow flex-shrink-0 mt-0.5" />
                <span>
                  National Institute of Technology, Arunachal Pradesh<br />
                  Jote, Papum Pare,<br />
                  Arunachal Pradesh - 791113
                </span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-cyber-glow flex-shrink-0" />
                <span>yantronix@nitap.ac.in</span>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-6 border-t border-cyber-border/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            &copy; {currentYear} यंत्रonix NIT AP. All Rights Reserved.
          </div>
          <div className="flex space-x-4">
            <Link to="/admin/login" className="hover:text-cyber-glow transition-colors duration-200">Admin Login</Link>
            <span>&bull;</span>
            <span className="text-gray-600">Website created by Krish & Tapan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
