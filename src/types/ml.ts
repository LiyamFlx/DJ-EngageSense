export interface CrowdPrediction {
  energyPrediction: number;
  nextPeakProbability: number;
  genrePreference: string[];
}

export interface TrainingData {
  audioFeatures: number[];
  crowdResponse: number[];
  timestamp: number;
}

export interface ModelMetrics {
  accuracy: number;
  loss: number;
  epoch: number;
}