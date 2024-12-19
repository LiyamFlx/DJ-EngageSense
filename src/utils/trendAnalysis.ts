import { AudioData } from '../types/audio';
import { TrendData, PeakMoment } from '../types/audience';

const ENERGY_THRESHOLD = 0.7;
const MOMENTUM_WINDOW = 30; // seconds

export const analyzeTrends = (audioData: AudioData): TrendData => {
  const { frequency, amplitude, metrics } = audioData;
  
  // Calculate current energy level
  const currentEnergy = calculateEnergy(amplitude);
  
  // Analyze crowd momentum
  const crowdMomentum = analyzeMomentum(metrics);
  
  // Detect peak moments
  const peakMoments = detectPeaks(frequency, amplitude);
  
  return {
    currentEnergy,
    crowdMomentum,
    peakMoments,
    recommendations: [], // Will be filled by recommendation engine
  };
};

const calculateEnergy = (amplitude: Float32Array): number => {
  const rms = Math.sqrt(
    amplitude.reduce((acc, val) => acc + val * val, 0) / amplitude.length
  );
  return Math.min(rms * 100, 100);
};

const analyzeMomentum = (metrics: AudioMetrics): number => {
  const { physical, emotional } = metrics;
  return (physical * 0.6 + emotional * 0.4);
};

const detectPeaks = (
  frequency: Float32Array,
  amplitude: Float32Array
): PeakMoment[] => {
  const peaks: PeakMoment[] = [];
  const timestamp = Date.now();

  // Simplified peak detection algorithm
  if (calculateEnergy(amplitude) > ENERGY_THRESHOLD) {
    peaks.push({
      timestamp,
      energy: calculateEnergy(amplitude),
      type: determinePeakType(frequency),
    });
  }

  return peaks;
};

const determinePeakType = (frequency: Float32Array): PeakMoment['type'] => {
  const bassEnergy = calculateBassEnergy(frequency);
  const midEnergy = calculateMidEnergy(frequency);
  
  if (bassEnergy > midEnergy * 1.5) return 'drop';
  if (midEnergy > bassEnergy * 1.2) return 'buildup';
  return 'breakdown';
};

const calculateBassEnergy = (frequency: Float32Array): number => {
  // Calculate energy in bass frequencies (20-250Hz)
  return frequency.slice(0, 20).reduce((sum, val) => sum + Math.abs(val), 0);
};

const calculateMidEnergy = (frequency: Float32Array): number => {
  // Calculate energy in mid frequencies (250-2000Hz)
  return frequency.slice(20, 160).reduce((sum, val) => sum + Math.abs(val), 0);
};