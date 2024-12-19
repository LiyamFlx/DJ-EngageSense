import React from 'react';
import { AudioMetrics } from '../../types/audio';
import { calculateAverageMetrics } from '../../utils/reportAnalysis';
import { MetricDisplay } from './MetricDisplay';

interface ReportMetricsProps {
  metrics: AudioMetrics[];
}

export const ReportMetrics: React.FC<ReportMetricsProps> = ({ metrics }) => {
  const averageMetrics = calculateAverageMetrics(metrics);

  return (
    <div className="bg-white/5 rounded-lg p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Average Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        <MetricDisplay label="Physical" value={averageMetrics.physical} />
        <MetricDisplay label="Emotional" value={averageMetrics.emotional} />
        <MetricDisplay label="Mental" value={averageMetrics.mental} />
        <MetricDisplay label="Spiritual" value={averageMetrics.spiritual} />
      </div>
    </div>
  );
};