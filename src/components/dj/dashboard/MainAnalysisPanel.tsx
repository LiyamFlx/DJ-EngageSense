import React from 'react';
import { AudioAnalyzer } from '../../AudioAnalyzer';
import { SessionAnalytics } from '../SessionAnalytics';
import { EngagementHeatmap } from '../../visualizations/EngagementHeatmap';
import { FrequencyBars } from '../../visualizations/FrequencyBars';
import { MoodTransitionAlert } from '../MoodTransitionAlert';
import { Card } from '../../ui/Card';
import type { AudioData, AudioMetrics } from '../../../types/audio';
import type { TrendPrediction } from '../../../types/predictions';

interface MainAnalysisPanelProps {
  audioData: AudioData | null;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
  error: Error | null;
  history: AudioMetrics[];
  predictions: TrendPrediction | null;
  moodPrediction: any;
}

export const MainAnalysisPanel: React.FC<MainAnalysisPanelProps> = ({
  audioData,
  isRecording,
  onStartRecording,
  onStopRecording,
  error,
  history,
  predictions,
  moodPrediction
}) => (
  <div className="lg:col-span-2 space-y-6">
    <Card className="p-6">
      <AudioAnalyzer
        audioData={audioData}
        isRecording={isRecording}
        onStartRecording={onStartRecording}
        onStopRecording={onStopRecording}
        error={error}
      />
    </Card>

    {audioData?.analyzerNode && (
      <FrequencyBars
        analyzerNode={audioData.analyzerNode}
        isActive={isRecording}
      />
    )}

    {history.length > 0 && (
      <>
        <SessionAnalytics history={history} />
        <EngagementHeatmap history={history} />
      </>
    )}

    {moodPrediction && (
      <MoodTransitionAlert
        currentMood={moodPrediction.currentMood}
        nextMood={moodPrediction.nextMood}
        timeToTransition={moodPrediction.timeToTransition}
        confidence={moodPrediction.confidence}
      />
    )}
  </div>
);