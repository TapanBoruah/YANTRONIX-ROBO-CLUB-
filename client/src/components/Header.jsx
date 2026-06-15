import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Cpu, Users, Calendar, BookOpen, Shield, LogOut } from 'lucide-react';
import { ClubContext } from '../context/ClubContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdminLoggedIn, logout } = useContext(ClubContext);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Home', href: '/', icon: Cpu },
    { name: 'Glossary', href: '/glossary', icon: BookOpen },
    { name: 'Events', href: '/events', icon: Calendar },
    { name: 'Team', href: '/team', icon: Users },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-cyber-card border border-cyber-glow/30 group-hover:border-cyber-glow/80 transition-colors duration-300">
              <Cpu className="w-5 h-5 text-cyber-glow animate-pulse" />
              <div className="absolute inset-0 rounded-lg bg-cyber-glow/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider font-sans bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-200 to-cyber-glow group-hover:neon-text-cyan transition-all duration-300">
                YANTRONIX
              </span>
              <span className="text-[10px] text-cyan-400 font-mono tracking-widest leading-none">
                NIT ARUNACHAL PRADESH
              </span>
            </div>
          </Link>

          {}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium tracking-wide transition-colors duration-300 flex items-center space-x-1.5 ${
                  isActive(item.href) ? 'text-cyber-glow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyber-glow to-transparent shadow-[0_0_8px_#06b6d4]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {}
          <div className="hidden md:flex items-center space-x-4">
            {isAdminLoggedIn ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/admin/dashboard"
                  className="px-4 py-1.5 rounded-md text-xs font-mono border border-cyber-glow/50 text-cyber-glow bg-cyber-glow/5 hover:bg-cyber-glow/20 transition-all duration-300 shadow-[0_0_10px_rgba(6,182,212,0.1)] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                >
                  DASHBOARD
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-1.5 rounded-md border border-red-500/30 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors duration-300"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/admin/login"
                className="flex items-center space-x-1.5 px-4 py-1.5 rounded-md text-xs font-mono text-gray-400 hover:text-cyber-glow border border-transparent hover:border-cyber-glow/30 transition-all duration-300"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>PORTAL</span>
              </Link>
            )}
          </div>

          {}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-cyber-glow hover:bg-cyber-card transition-colors duration-300 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-cyber-border/40 bg-cyber-bg/95 backdrop-blur-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href) ? 'bg-cyber-glow/10 text-cyber-glow border-l-2 border-cyber-glow' : 'text-gray-400 hover:text-gray-200 hover:bg-cyber-card/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-cyber-border/50 mt-4 px-3 flex flex-col gap-3">
                {isAdminLoggedIn ? (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="w-full text-center px-4 py-2.5 rounded-md text-sm font-mono border border-cyber-glow/50 text-cyber-glow bg-cyber-glow/5"
                    >
                      ADMIN COCKPIT
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                        navigate('/');
                      }}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono border border-red-500/30 text-red-400 bg-red-500/5"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>LOGOUT</span>
                    </button>
                  </>
                ) : (
                  <Link
                    to="/admin/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-mono border border-cyber-border text-gray-400"
                  >
                    <Shield className="w-4 h-4" />
                    <span>ADMIN PORTAL</span>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
