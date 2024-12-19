import { AudioMetrics } from '../types/audio';

export const calculateAverageMetrics = (metrics: AudioMetrics[]): AudioMetrics => {
  const initialMetrics = {
    physical: 0,
    emotional: 0,
    mental: 0,
    spiritual: 0,
  };

  const sum = metrics.reduce((acc, curr) => ({
    physical: acc.physical + curr.physical,
    emotional: acc.emotional + curr.emotional,
    mental: acc.mental + curr.mental,
    spiritual: acc.spiritual + curr.spiritual,
  }), initialMetrics);

  const count = metrics.length;

  return {
    physical: Math.round(sum.physical / count),
    emotional: Math.round(sum.emotional / count),
    mental: Math.round(sum.mental / count),
    spiritual: Math.round(sum.spiritual / count),
  };
};