import { TrendData, TrackRecommendation } from '../types/audience';

const TRACK_DATABASE: TrackRecommendation[] = [
  {
    id: '1',
    title: 'Euphoria',
    artist: 'Deep House Master',
    bpm: 128,
    energy: 85,
    genre: 'Deep House',
    confidence: 0.9,
    reason: 'High energy, perfect for peak time',
  },
  // Add more tracks to the database
];

export const getRecommendations = (trends: TrendData): TrackRecommendation[] => {
  const { currentEnergy, crowdMomentum } = trends;
  
  // Calculate target energy based on current trends
  const targetEnergy = calculateTargetEnergy(currentEnergy, crowdMomentum);
  
  // Find matching tracks
  return TRACK_DATABASE
    .filter(track => {
      const energyMatch = Math.abs(track.energy - targetEnergy) <= 15;
      return energyMatch;
    })
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, 3);
};

const calculateTargetEnergy = (currentEnergy: number, momentum: number): number => {
  if (momentum > 70) {
    // Crowd is highly engaged, maintain or slightly increase energy
    return Math.min(currentEnergy + 10, 100);
  } else if (momentum < 30) {
    // Crowd energy is low, suggest tracks to boost engagement
    return Math.min(currentEnergy + 20, 100);
  }
  // Maintain current energy level
  return currentEnergy;
};