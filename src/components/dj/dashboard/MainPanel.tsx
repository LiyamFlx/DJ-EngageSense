import React from 'react';
import { AudioAnalyzer } from '../../audio/AudioAnalyzer';
import { EngagementMetrics } from '../../metrics/EngagementMetrics';
import { FrequencyBars } from '../../visualizations/FrequencyBars';
import { EngagementHeatmap } from '../../visualizations/EngagementHeatmap';
import { Card } from '../../ui/Card';
import { useAudioProcessor } from '../../../hooks/useAudioProcessor';

export const MainPanel: React.FC = () => {
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

  return (
    <div className="space-y-6">
      {/* Live Audio Analysis */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Live Analysis</h2>
        <AudioAnalyzer
          audioData={audioData}
          isRecording={isRecording}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          error={error}
        />
      </Card>

      {/* Real-time Metrics */}
      {audioData?.metrics && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Engagement Metrics</h2>
          <EngagementMetrics metrics={audioData.metrics} />
        </Card>
      )}

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {audioData?.analyzerNode && (
          <FrequencyBars
            analyzerNode={audioData.analyzerNode}
            isActive={isRecording}
          />
        )}
        {audioData?.metrics && (
          <EngagementHeatmap
            history={[audioData.metrics]}
          />
        )}
      </div>

      {!isRecording && !audioData && (
        <div className="text-center text-white/60 py-8">
          Click "Live Analyze Audio" to start the analysis
        </div>
      )}
    </div>
  );
};