import { useState, useEffect } from 'react';
import { AudioMetrics, TrendData } from '../types/audience';
import { analyzeTrends } from '../utils/trendAnalysis';
import { getRecommendations } from '../utils/recommendations';

export const useAudienceAnalysis = (audioData: AudioData | null) => {
  const [trends, setTrends] = useState<TrendData>({
    currentEnergy: 0,
    crowdMomentum: 0,
    peakMoments: [],
    recommendations: [],
  });

  useEffect(() => {
    if (!audioData) return;

    const analyzedTrends = analyzeTrends(audioData);
    const recommendations = getRecommendations(analyzedTrends);

    setTrends({
      ...analyzedTrends,
      recommendations,
    });
  }, [audioData]);

  return trends;
};