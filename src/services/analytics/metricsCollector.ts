import { AudioMetrics, TrendData } from '../../types/audience';
import { AudioCache } from '../cache/audioCache';

export class MetricsCollector {
  private cache: AudioCache;
  private metrics: AudioMetrics[] = [];
  private readonly MAX_HISTORY = 1000;

  constructor() {
    this.cache = new AudioCache({ maxSize: 50, ttl: 3600000 });
  }

  addMetrics(metrics: AudioMetrics): void {
    this.metrics.push(metrics);
    if (this.metrics.length > this.MAX_HISTORY) {
      this.metrics.shift();
    }
  }

  analyzeTrends(): TrendData {
    const recentMetrics = this.metrics.slice(-30);
    
    const currentEnergy = this.calculateAverageEnergy(recentMetrics);
    const crowdMomentum = this.calculateMomentum(recentMetrics);
    
    return {
      currentEnergy,
      crowdMomentum,
      peakMoments: this.detectPeakMoments(),
      recommendations: [],
    };
  }

  private calculateAverageEnergy(metrics: AudioMetrics[]): number {
    return metrics.reduce((sum, m) => sum + m.physical, 0) / metrics.length;
  }

  private calculateMomentum(metrics: AudioMetrics[]): number {
    if (metrics.length < 2) return 0;
    
    const recent = metrics.slice(-10);
    const trend = recent.reduce((acc, curr, idx) => {
      if (idx === 0) return acc;
      return acc + (curr.physical - recent[idx - 1].physical);
    }, 0);

    return Math.max(0, Math.min(100, 50 + trend * 10));
  }

  private detectPeakMoments() {
    // Implementation of peak detection algorithm
    return [];
  }
}