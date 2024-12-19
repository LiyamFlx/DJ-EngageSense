import React, { useState, useCallback } from 'react';
import { AudioControlPanel } from '../audio/AudioControlPanel';
import { VisualizationPanel } from '../visualizations/VisualizationPanel';
import { useAudioProcessor } from '../../hooks/useAudioProcessor';
import { Card } from '../ui/Card';

export const DJDashboard: React.FC = () => {
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

  const handleStartRecording = useCallback(async () => {
    setIsAnalyzing(true);
    await startRecording();
    setIsAnalyzing(false);
  }, [startRecording]);

  const handleStopRecording = useCallback(async () => {
    await stopRecording();
  }, [stopRecording]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {error ? (
        <Card className="p-4 bg-red-500/20">
          <p className="text-white">{error.message}</p>
        </Card>
      ) : (
        <>
          <AudioControlPanel
            isRecording={isRecording}
            isAnalyzing={isAnalyzing}
            onStartRecording={handleStartRecording}
            onStopRecording={handleStopRecording}
          />
          
          <VisualizationPanel
            audioData={audioData}
            isRecording={isRecording}
          />
        </>
      )}
    </div>
  );
};