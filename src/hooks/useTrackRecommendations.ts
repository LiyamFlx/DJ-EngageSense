import { useState, useEffect } from 'react';
import { TrackRecommender } from '../services/recommendations/trackRecommender';
import { AudioMetrics } from '../types/audio';
import { TrackRecommendation } from '../types/audience';

export const useTrackRecommendations = (
  currentMetrics: AudioMetrics | null,
  history: AudioMetrics[]
) => {
  const [recommendations, setRecommendations] = useState<TrackRecommendation[]>([]);
  const recommender = new TrackRecommender();

  useEffect(() => {
    if (!currentMetrics) return;

    const newRecommendations = recommender.recommendTracks(
      currentMetrics,
      history
    );

    setRecommendations(newRecommendations);
  }, [currentMetrics, history]);

  return recommendations;
};