// Audio Analysis Hook
import { useState, useCallback } from 'react';
import { AudioMetrics } from '../types/audio';
import { analyzePhysicalEngagement } from '../utils/audio/analysis/physical';
import { analyzeEmotionalEngagement } from '../utils/audio/analysis/emotional';
import { analyzeMentalEngagement } from '../utils/audio/analysis/mental';
import { analyzeSpiritualEngagement } from '../utils/audio/analysis/spiritual';

export const useAudioAnalysis = () => {
  const [metrics, setMetrics] = useState<AudioMetrics | null>(null);

  const analyzeAudioData = useCallback((frequency: Float32Array, amplitude: Float32Array) => {
    const physical = analyzePhysicalEngagement(amplitude);
    const emotional = analyzeEmotionalEngagement(frequency);
    const mental = analyzeMentalEngagement(frequency, amplitude);
    const spiritual = analyzeSpiritualEngagement(frequency, amplitude);

    const newMetrics = { physical, emotional, mental, spiritual };
    setMetrics(newMetrics);
    return newMetrics;
  }, []);

  return {
    metrics,
    analyzeAudioData,
  };
};