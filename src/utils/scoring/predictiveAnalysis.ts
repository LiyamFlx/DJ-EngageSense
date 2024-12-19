import { AudioMetrics } from '../../types/audio';

export interface PredictiveInsight {
  metric: keyof AudioMetrics;
  prediction: number;
  confidence: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}

export const analyzePredictiveInsights = (history: AudioMetrics[]): PredictiveInsight[] => {
  if (history.length < 2) return [];

  const insights: PredictiveInsight[] = [];
  const metrics = Object.keys(history[0]) as Array<keyof AudioMetrics>;

  metrics.forEach(metric => {
    const values = history.map(h => h[metric]);
    const trend = analyzeTrend(values);
    const prediction = predictNextValue(values);
    const confidence = calculateConfidence(values);

    insights.push({
      metric,
      prediction,
      confidence,
      trend
    });
  });

  return insights;
};

const analyzeTrend = (values: number[]): PredictiveInsight['trend'] => {
  const recentValues = values.slice(-5);
  const average = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
  const firstHalf = average - recentValues[0];
  
  if (Math.abs(firstHalf) < 5) return 'stable';
  return firstHalf > 0 ? 'increasing' : 'decreasing';
};

const predictNextValue = (values: number[]): number => {
  const recentValues = values.slice(-3);
  const trend = recentValues.reduce((acc, val, i, arr) => {
    if (i === 0) return 0;
    return acc + (val - arr[i - 1]);
  }, 0) / (recentValues.length - 1);

  const lastValue = recentValues[recentValues.length - 1];
  return Math.min(Math.max(Math.round(lastValue + trend), 0), 100);
};

const calculateConfidence = (values: number[]): number => {
  const variance = values.reduce((acc, val) => {
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    return acc + Math.pow(val - mean, 2);
  }, 0) / values.length;

  return Math.max(0, Math.min(100, 100 - Math.sqrt(variance)));
};