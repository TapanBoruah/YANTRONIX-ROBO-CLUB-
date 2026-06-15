import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ClubContext } from '../context/ClubContext';
import { Shield, Lock, User, AlertCircle, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminLogin = () => {
  const { login, isAdminLoggedIn } = useContext(ClubContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (isAdminLoggedIn) {
      navigate('/admin/dashboard');
    }
  }, [isAdminLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    await new Promise(resolve => setTimeout(resolve, 800));

    const success = await login(username, password);
    setLoading(false);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid access clearance credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-cyber-bg relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none"></div>

      {}
      <div className="absolute top-8 left-8 z-10">
        <Link
          to="/"
          className="flex items-center space-x-2 text-xs font-mono text-gray-400 hover:text-cyber-glow transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME</span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-4">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-cyber-card border border-cyber-glow/30 flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Shield className="w-6 h-6 text-cyber-glow" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold tracking-tight text-white font-sans">
          ADMIN GATEWAY
        </h2>
        <p className="text-center text-xs text-cyan-500 font-mono tracking-widest uppercase">
          Authorization Clearance Required
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="glass-card py-8 px-6 sm:px-10 rounded-2xl relative overflow-hidden">
          
          {}
          <div className="absolute inset-x-0 top-0 h-0.5 bg-cyber-glow opacity-30 cyber-scanner"></div>

          <form className="space-y-6 text-left" onSubmit={handleSubmit}>
            {}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg border border-red-500/30 bg-red-500/5 text-xs text-red-400 font-mono flex items-center space-x-2"
              >
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-wider text-gray-400 uppercase">
                Operator Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Clearance ID"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-cyber-border bg-cyber-darker text-sm text-gray-200 focus:outline-none focus:border-cyber-glow/50 transition-colors"
                />
              </div>
            </div>

            {}
            <div className="space-y-2">
              <label className="block text-xs font-mono tracking-wider text-gray-400 uppercase">
                Access Passwordcode
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-cyber-border bg-cyber-darker text-sm text-gray-200 focus:outline-none focus:border-cyber-glow/50 transition-colors"
                />
              </div>
            </div>

            {}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg text-sm font-mono tracking-wider bg-gradient-to-r from-cyber-glow to-cyan-500 text-black font-semibold hover:scale-101 active:scale-99 transition-all duration-200 shadow-[0_0_12px_rgba(6,182,212,0.3)] disabled:opacity-50"
              >
                {loading ? 'VERIFYING SYSTEM KEY...' : 'REQUEST SYSTEM ENTRY'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
