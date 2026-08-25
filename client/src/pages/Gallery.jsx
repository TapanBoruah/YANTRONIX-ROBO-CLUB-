import React, { useState, useContext } from 'react';
import { ClubContext } from '../context/ClubContext';
import { Image as ImageIcon, X, Maximize2, Terminal } from 'lucide-react';
import { getUploadsUrl } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';

const Gallery = () => {
  const { gallery, loading } = useContext(ClubContext);
  const [selectedImage, setSelectedImage] = useState(null);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-cyber-glow/20 border-t-cyber-glow animate-spin"></div>
        <p className="text-sm font-mono text-cyan-400 animate-pulse tracking-wider">RETRIEVING GALLERY TELEMETRY...</p>
      </div>
    );
  }

  if (gallery.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <div className="p-6 rounded-full bg-cyber-glow/5 border border-cyber-glow/20 text-cyber-glow animate-pulse">
          <ImageIcon className="w-16 h-16" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white uppercase tracking-wider font-mono">Gallery Coming Soon</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
            Our visual records and hardware build logs are currently being compiled. Stay tuned for snapshots of our upcoming assemblies.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 text-left min-h-screen">
      
      {/* Title */}
      <div className="space-y-2 mb-12">
        <h1 className="text-xs font-mono tracking-widest text-cyber-glow uppercase">VISUAL DATABASE</h1>
        <p className="text-3xl sm:text-4xl font-bold font-sans">Yantronix Gallery</p>
        <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
          Snapshots of hardware assemblies, autonomous drone calibrations, PCB layouts, and hands-on workshops coordinated by NIT Arunachal Pradesh.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {gallery.map((item) => (
          <motion.div
            key={item.id}
            layoutId={`gallery-card-${item.id}`}
            onClick={() => setSelectedImage(item)}
            className="glass-card rounded-xl overflow-hidden group cursor-pointer border border-cyber-border/40 hover:border-cyber-glow/30 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all duration-300 relative aspect-square"
          >
            <img
              src={getUploadsUrl(item.image)}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-sm font-bold text-white font-sans truncate">{item.title}</h3>
              {item.description && (
                <p className="text-[10px] text-gray-300 font-mono truncate mt-0.5">{item.description}</p>
              )}
              <div className="absolute top-3 right-3 p-1.5 rounded bg-black/60 text-cyber-glow border border-cyber-glow/20">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Modal overlay */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl w-full bg-cyber-card border border-cyber-glow/30 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(6,182,212,0.25)] flex flex-col z-10"
            >
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img
                  src={getUploadsUrl(selectedImage.image)}
                  alt={selectedImage.title}
                  className="max-h-[75vh] w-full object-contain"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 p-2 rounded bg-black/60 text-gray-300 hover:text-white border border-cyber-border"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 text-left space-y-2 border-t border-cyber-border">
                <h3 className="text-lg font-bold text-white font-sans">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-xs text-gray-400 font-mono leading-relaxed">{selectedImage.description}</p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
