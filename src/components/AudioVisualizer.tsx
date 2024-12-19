import React from 'react';
import { Play, Pause, Upload } from 'lucide-react';

const AudioVisualizer = () => {
  return (
    <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Live Audio Analysis</h2>
        <div className="flex space-x-3">
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Play className="h-5 w-5 text-white" />
          </button>
          <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <Upload className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
      
      <div className="h-48 bg-black/20 rounded-lg flex items-center justify-center">
        <p className="text-white/60">Audio visualization will appear here</p>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" style={{
            animationDelay: `${i * 0.2}s`
          }} />
        ))}
      </div>
    </div>
  );
};

export default AudioVisualizer;