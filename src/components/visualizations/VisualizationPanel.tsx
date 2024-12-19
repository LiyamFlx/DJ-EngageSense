import React from 'react';
import { EngagementMetrics } from '../metrics/EngagementMetrics';
import { FrequencyVisualizer } from './frequency/FrequencyVisualizer';
import { EngagementHeatmap } from './EngagementHeatmap';
import { Card } from '../ui/Card';
import type { AudioData } from '../../types/audio';

interface VisualizationPanelProps {
  audioData: AudioData | null;
  isRecording: boolean;
}

export const VisualizationPanel: React.FC<VisualizationPanelProps> = ({
  audioData,
  isRecording,
}) => (
  <div className="space-y-6">
    {audioData?.metrics ? (
      <>
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Real-time Analysis</h3>
          <EngagementMetrics metrics={audioData.metrics} />
        </Card>

        {audioData.analyzerNode && (
          <FrequencyVisualizer
            analyzerNode={audioData.analyzerNode}
            isActive={isRecording}
          />
        )}

        <EngagementHeatmap history={[audioData.metrics]} />
      </>
    ) : (
      <Card className="p-6 text-center">
        <p className="text-white/60">
          Start recording to see real-time visualizations
        </p>
      </Card>
    )}
  </div>
);