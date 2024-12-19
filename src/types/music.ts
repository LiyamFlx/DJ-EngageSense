export interface TrackInsight {
  trackId: string;
  trackName: string;
  artist: string;
  rating: number;
  engagementScore: number;
  playCount: number;
  recommendation?: string;
  peakMoments: number;
  genre: string;
  bpm: number;
}

export interface PlaylistMetrics {
  averageEnergy: number;
  genreDistribution: Record<string, number>;
  bpmRange: {
    min: number;
    max: number;
    average: number;
  };
  duration: number;
}