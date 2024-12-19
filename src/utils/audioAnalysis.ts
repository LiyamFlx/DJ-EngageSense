import { AudioMetrics } from '../types/audio';

export const calculateMetrics = (frequency: Float32Array, amplitude: Float32Array): AudioMetrics => {
  // Calculate physical engagement (based on amplitude/volume)
  const physical = calculatePhysicalEngagement(amplitude);
  
  // Calculate emotional engagement (based on frequency distribution)
  const emotional = calculateEmotionalEngagement(frequency);
  
  // Calculate mental engagement (combination of rhythm and pattern recognition)
  const mental = calculateMentalEngagement(frequency, amplitude);
  
  // Calculate spiritual engagement (based on harmonic content and sustained patterns)
  const spiritual = calculateSpiritualEngagement(frequency, amplitude);

  return {
    physical,
    emotional,
    mental,
    spiritual,
  };
};

const calculatePhysicalEngagement = (amplitude: Float32Array): number => {
  // Calculate RMS (Root Mean Square) for volume
  const rms = Math.sqrt(
    amplitude.reduce((acc, val) => acc + val * val, 0) / amplitude.length
  );
  
  // Normalize and scale to percentage
  return Math.min(Math.round((rms + 1) * 50), 100);
};

const calculateEmotionalEngagement = (frequency: Float32Array): number => {
  // Analyze frequency distribution for emotional content
  const totalEnergy = frequency.reduce((acc, val) => acc + Math.abs(val), 0);
  const normalizedEnergy = totalEnergy / frequency.length;
  
  // Scale to percentage
  return Math.min(Math.round((normalizedEnergy + 140) * 0.5), 100);
};

const calculateMentalEngagement = (frequency: Float32Array, amplitude: Float32Array): number => {
  // Combine rhythm stability and frequency complexity
  const rhythmStability = calculateRhythmStability(amplitude);
  const frequencyComplexity = calculateFrequencyComplexity(frequency);
  
  return Math.round((rhythmStability + frequencyComplexity) / 2);
};

const calculateSpiritualEngagement = (frequency: Float32Array, amplitude: Float32Array): number => {
  // Analyze harmonic content and sustained patterns
  const harmonicContent = calculateHarmonicContent(frequency);
  const sustainedPatterns = calculateSustainedPatterns(amplitude);
  
  return Math.round((harmonicContent + sustainedPatterns) / 2);
};

const calculateRhythmStability = (amplitude: Float32Array): number => {
  // Analyze temporal patterns in amplitude
  let stability = 0;
  const windowSize = 64;
  
  for (let i = 0; i < amplitude.length - windowSize; i++) {
    const correlation = calculateCorrelation(
      amplitude.slice(i, i + windowSize),
      amplitude.slice(i + windowSize, i + windowSize * 2)
    );
    stability += correlation;
  }
  
  return Math.min(Math.round((stability + 1) * 50), 100);
};

const calculateFrequencyComplexity = (frequency: Float32Array): number => {
  // Analyze spectral flatness and variety
  const mean = frequency.reduce((acc, val) => acc + val, 0) / frequency.length;
  const variance = frequency.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / frequency.length;
  
  return Math.min(Math.round(Math.sqrt(variance) * 10 + 50), 100);
};

const calculateHarmonicContent = (frequency: Float32Array): number => {
  // Analyze presence of harmonic relationships
  let harmonicScore = 0;
  const fundamentalIdx = findFundamentalFrequency(frequency);
  
  for (let i = 2; i <= 8; i++) {
    const harmonicIdx = fundamentalIdx * i;
    if (harmonicIdx < frequency.length) {
      harmonicScore += Math.abs(frequency[harmonicIdx]);
    }
  }
  
  return Math.min(Math.round(harmonicScore * 10 + 50), 100);
};

const calculateSustainedPatterns = (amplitude: Float32Array): number => {
  // Analyze consistency in amplitude patterns
  let sustainedScore = 0;
  const windowSize = 128;
  
  for (let i = 0; i < amplitude.length - windowSize; i += windowSize) {
    const windowMean = amplitude.slice(i, i + windowSize)
      .reduce((acc, val) => acc + Math.abs(val), 0) / windowSize;
    sustainedScore += windowMean;
  }
  
  return Math.min(Math.round(sustainedScore * 100), 100);
};

const calculateCorrelation = (a: Float32Array, b: Float32Array): number => {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    sum += a[i] * b[i];
  }
  
  return sum / n;
};

const findFundamentalFrequency = (frequency: Float32Array): number => {
  let maxIndex = 0;
  let maxValue = -Infinity;
  
  // Find the frequency bin with maximum energy
  for (let i = 0; i < frequency.length / 4; i++) {
    if (frequency[i] > maxValue) {
      maxValue = frequency[i];
      maxIndex = i;
    }
  }
  
  return maxIndex;
};