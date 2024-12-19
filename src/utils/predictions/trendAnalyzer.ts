import { AudioMetrics } from '../../types/audio';
import { TrendPrediction, SongTrend } from '../../types/predictions';

export class TrendAnalyzer {
  private readonly TREND_WINDOW = 10; // Minutes to analyze
  private readonly PREDICTION_HORIZON = 5; // Minutes to predict ahead

  analyzeTrends(history: AudioMetrics[]): TrendPrediction {
    const recentMetrics = history.slice(-this.TREND_WINDOW);
    
    return {
      currentMomentum: this.calculateMomentum(recentMetrics),
      predictedPeak: this.predictNextPeak(recentMetrics),
      suggestedGenres: this.recommendGenres(recentMetrics),
      energyForecast: this.forecastEnergy(recentMetrics),
      confidenceScore: this.calculateConfidence(recentMetrics)
    };
  }

  private calculateMomentum(metrics: AudioMetrics[]): number {
    if (metrics.length < 2) return 0;
    
    const recent = metrics.slice(-5);
    const energyChange = recent.reduce((acc, curr, idx, arr) => {
      if (idx === 0) return acc;
      return acc + (curr.physical - arr[idx - 1].physical);
    }, 0);

    return Math.min(Math.max(energyChange * 10, -100), 100);
  }

  private predictNextPeak(metrics: AudioMetrics[]): number {
    const peaks = this.findPeaks(metrics);
    const peakIntervals = this.calculatePeakIntervals(peaks);
    
    return Date.now() + (peakIntervals.average * 1000);
  }

  private recommendGenres(metrics: AudioMetrics[]): string[] {
    const energyLevels = {
      high: metrics.filter(m => m.physical > 75).length,
      medium: metrics.filter(m => m.physical > 50 && m.physical <= 75).length,
      low: metrics.filter(m => m.physical <= 50).length
    };

    if (energyLevels.high > energyLevels.medium) {
      return ['House', 'Techno', 'Drum & Bass'];
    } else if (energyLevels.low > energyLevels.medium) {
      return ['Deep House', 'Progressive House', 'Melodic Techno'];
    }
    return ['Tech House', 'Progressive Trance', 'Minimal'];
  }

  private forecastEnergy(metrics: AudioMetrics[]): number[] {
    return metrics.slice(-5).map(m => m.physical).map(energy => {
      const variation = Math.random() * 10 - 5; // Random variation ±5%
      return Math.min(Math.max(energy + variation, 0), 100);
    });
  }

  private calculateConfidence(metrics: AudioMetrics[]): number {
    const variance = metrics.reduce((acc, curr) => {
      const mean = metrics.reduce((sum, m) => sum + m.physical, 0) / metrics.length;
      return acc + Math.pow(curr.physical - mean, 2);
    }, 0) / metrics.length;

    return Math.max(0, 100 - Math.sqrt(variance));
  }

  private findPeaks(metrics: AudioMetrics[]): number[] {
    const peaks: number[] = [];
    for (let i = 1; i < metrics.length - 1; i++) {
      if (metrics[i].physical > metrics[i - 1].physical && 
          metrics[i].physical > metrics[i + 1].physical) {
        peaks.push(i);
      }
    }
    return peaks;
  }

  private calculatePeakIntervals(peaks: number[]): { average: number; variance: number } {
    if (peaks.length < 2) {
      return { average: 300, variance: 0 }; // Default 5 minutes
    }

    const intervals = peaks.slice(1).map((peak, i) => peak - peaks[i]);
    const average = intervals.reduce((acc, val) => acc + val, 0) / intervals.length;
    const variance = intervals.reduce((acc, val) => acc + Math.pow(val - average, 2), 0) / intervals.length;

    return { average, variance };
  }
}