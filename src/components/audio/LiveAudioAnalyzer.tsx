import React, { useState } from 'react';
import { Mic, Square, Play } from 'lucide-react';
import { useAudioProcessor } from '../../hooks/useAudioProcessor';

export const LiveAudioAnalyzer: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const {
    audioData,
    isRecording,
    startRecording,
    stopRecording,
    error
  } = useAudioProcessor({
    sensitivity: 50,
    noiseThreshold: 30,
    updateInterval: 100
  });

  const handleToggleRecording = async () => {
    setIsAnalyzing(true);
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleToggleRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          isRecording 
            ? 'bg-red-600 hover:bg-red-700 text-white' 
            : 'bg-purple-600 hover:bg-purple-700 text-white'
        }`}
        disabled={isAnalyzing && !isRecording}
      >
        {isRecording ? (
          <>
            <Square className="w-5 h-5" />
            Stop Analysis
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Live Analyze Audio
          </>
        )}
      </button>

      {isRecording && (
        <div className="flex items-center gap-2 text-green-400 animate-pulse">
          <Mic className="w-4 h-4" />
          <span>Recording in progress...</span>
        </div>
      )}

      {error && (
        <div className="text-red-400 text-sm mt-2">
          {error.message}
        </div>
      )}
    </div>
  );
};