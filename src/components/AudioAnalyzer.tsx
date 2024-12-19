import React, { useEffect, useState } from 'react';
import { AudioControlPanel } from './audio/AudioControlPanel';
import { AudioVisualizer } from './audio/AudioVisualizer';
import { EngagementMetrics } from './metrics/EngagementMetrics';
import { FrequencyBars } from './visualizations/FrequencyBars';
import { EngagementHeatmap } from './visualizations/EngagementHeatmap';
import { AlertDisplay } from './alerts/AlertDisplay';
import { Card } from './ui/Card';
import { useAudioProcessor } from '../hooks/useAudioProcessor';
import { useMoodPrediction } from '../hooks/useMoodPrediction';
import type { AudioData } from '../types/audio';

interface AudioAnalyzerProps {
  audioData: AudioData | null;
  isRecording: boolean;
  isAnalyzing: boolean;
  isAutoDJMode: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onAnalyzeAudio: () => void;
  onSearchTrack: () => void;
  onToggleAutoDJ: () => void;
  onEnergyVote: (type: 'up' | 'down') => void;
  error: Error | null;
}

export const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({
  audioData,
  isRecording,
  isAnalyzing,
  isAutoDJMode,
  onStartRecording,
  onStopRecording,
  onAnalyzeAudio,
  onSearchTrack,
  onToggleAutoDJ,
  onEnergyVote,
  error
}) => {
  const [analysisHistory, setAnalysisHistory] = useState<AudioData[]>([]);
  const moodPrediction = useMoodPrediction(analysisHistory.map(data => data.metrics));

  useEffect(() => {
    if (audioData) {
      setAnalysisHistory(prev => [...prev.slice(-50), audioData]);
    }
  }, [audioData]);

  if (error) {
    return (
      <Card className="p-4 bg-red-500/20">
        <p className="text-white">{error.message}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AudioControlPanel
        isRecording={isRecording}
        isAnalyzing={isAnalyzing}
        isAutoDJMode={isAutoDJMode}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        onAnalyzeAudio={onAnalyzeAudio}
        onSearchTrack={onSearchTrack}
        onToggleAutoDJ={onToggleAutoDJ}
        onEnergyVote={onEnergyVote}
      />

      <AudioVisualizer
        data={audioData}
        isRecording={isRecording}
      />

      {audioData && (
        <>
          <EngagementMetrics metrics={audioData.metrics} />
          
          {audioData.analyzerNode && (
            <FrequencyBars
              analyzerNode={audioData.analyzerNode}
              isActive={isRecording}
            />
          )}

          <EngagementHeatmap history={analysisHistory.map(data => data.metrics)} />

          <AlertDisplay alerts={[
            {
              type: 'warning',
              metric: 'physical',
              message: 'Energy levels dropping',
              value: audioData.metrics.physical,
              threshold: 50
            }
          ]} />
        </>
      )}
    </div>
  );
};