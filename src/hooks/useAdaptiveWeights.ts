import { useState, useEffect } from 'react';
import { AudioMetrics } from '../types/audio';

interface AdaptiveWeights {
  physical: number;
  emotional: number;
  mental: number;
  spiritual: number;
}

export const useAdaptiveWeights = (metrics: AudioMetrics[], crowdSize: number = 100) => {
  const [weights, setWeights] = useState<AdaptiveWeights>({
    physical: 1,
    emotional: 1,
    mental: 1,
    spiritual: 1
  });

  useEffect(() => {
    if (metrics.length < 2) return;

    // Analyze recent trends
    const recent = metrics.slice(-5);
    const trends = recent.reduce((acc, curr, idx, arr) => {
      if (idx === 0) return acc;
      const prev = arr[idx - 1];
      
      return {
        physical: acc.physical + (curr.physical - prev.physical),
        emotional: acc.emotional + (curr.emotional - prev.emotional),
        mental: acc.mental + (curr.mental - prev.mental),
        spiritual: acc.spiritual + (curr.spiritual - prev.spiritual)
      };
    }, { physical: 0, emotional: 0, mental: 0, spiritual: 0 });

    // Adjust weights based on trends and crowd size
    const crowdFactor = Math.min(crowdSize / 100, 2);
    const timeOfDay = new Date().getHours();
    
    setWeights({
      physical: adjustWeight(trends.physical, crowdFactor, timeOfDay),
      emotional: adjustWeight(trends.emotional, crowdFactor, timeOfDay),
      mental: adjustWeight(trends.mental, crowdFactor, timeOfDay),
      spiritual: adjustWeight(trends.spiritual, crowdFactor, timeOfDay)
    });
  }, [metrics, crowdSize]);

  return weights;
};

const adjustWeight = (trend: number, crowdFactor: number, timeOfDay: number): number => {
  let weight = 1.0;
  
  // Adjust for trend
  weight += trend * 0.1;
  
  // Adjust for crowd size
  weight *= crowdFactor;
  
  // Adjust for time of day (peak hours get higher weights)
  const isPeakHour = timeOfDay >= 22 || timeOfDay <= 2;
  if (isPeakHour) weight *= 1.2;
  
  // Normalize between 0.5 and 2.0
  return Math.max(0.5, Math.min(2.0, weight));
};