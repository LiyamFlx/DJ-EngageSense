import { useState, useEffect } from 'react';
import { AudioMetrics } from '../types/audio';
import { TrendPrediction } from '../types/predictions';
import { TrendAnalyzer } from '../utils/predictions/trendAnalyzer';

export const usePredictiveAnalytics = (metrics: AudioMetrics[]) => {
  const [predictions, setPredictions] = useState<TrendPrediction | null>(null);
  const analyzer = new TrendAnalyzer();

  useEffect(() => {
    if (metrics.length > 0) {
      const newPredictions = analyzer.analyzeTrends(metrics);
      setPredictions(newPredictions);
    }
  }, [metrics]);

  return predictions;
};