import { AudioMetrics } from '../../types/audio';
import { TrackRecommendation } from '../../types/audience';

export class TrackRecommender {
  private readonly ENERGY_WEIGHT = 0.4;
  private readonly MOOD_WEIGHT = 0.3;
  private readonly GENRE_WEIGHT = 0.3;

  recommendTracks(
    currentMetrics: AudioMetrics,
    recentHistory: AudioMetrics[],
    currentGenre?: string
  ): TrackRecommendation[] {
    const energyTrend = this.analyzeEnergyTrend(recentHistory);
    const targetEnergy = this.calculateTargetEnergy(currentMetrics.physical, energyTrend);
    
    return this.findMatchingTracks(targetEnergy, currentMetrics, currentGenre);
  }

  private analyzeEnergyTrend(history: AudioMetrics[]): 'rising' | 'falling' | 'stable' {
    if (history.length < 2) return 'stable';

    const recent = history.slice(-5);
    const energyChange = recent[recent.length - 1].physical - recent[0].physical;

    if (Math.abs(energyChange) < 10) return 'stable';
    return energyChange > 0 ? 'rising' : 'falling';
  }

  private calculateTargetEnergy(currentEnergy: number, trend: string): number {
    switch (trend) {
      case 'rising':
        return Math.min(currentEnergy + 10, 100);
      case 'falling':
        return Math.min(currentEnergy + 20, 100);
      default:
        return currentEnergy;
    }
  }

  private findMatchingTracks(
    targetEnergy: number,
    metrics: AudioMetrics,
    currentGenre?: string
  ): TrackRecommendation[] {
    // This would typically query a music database
    // For now, return mock recommendations
    return [
      {
        id: '1',
        title: 'Energy Boost',
        artist: 'DJ Pulse',
        bpm: 128,
        energy: targetEnergy,
        genre: 'House',
        confidence: 0.85,
        reason: 'Matches current energy level and maintains momentum'
      },
      {
        id: '2',
        title: 'Crowd Pleaser',
        artist: 'Beat Master',
        bpm: 130,
        energy: targetEnergy + 5,
        genre: 'Tech House',
        confidence: 0.75,
        reason: 'Popular track that fits the current mood'
      }
    ];
  }
}