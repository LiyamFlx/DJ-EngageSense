export interface TrendPrediction {
  currentMomentum: number;
  predictedPeak: number;
  suggestedGenres: string[];
  energyForecast: number[];
  confidenceScore: number;
}

export interface SongTrend {
  genre: string;
  energyLevel: number;
  crowdResponse: number;
  timestamp: number;
}

export interface PredictiveMetrics {
  nextPeak: {
    timestamp: number;
    confidence: number;
  };
  recommendedTransition: {
    type: 'build' | 'drop' | 'maintain';
    timing: number;
  };
  crowdMood: {
    current: string;
    trend: 'rising' | 'falling' | 'stable';
  };
}