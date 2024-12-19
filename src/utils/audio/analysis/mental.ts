// Mental Engagement Analysis
export const analyzeMentalEngagement = (
  frequency: Float32Array,
  amplitude: Float32Array
): number => {
  const rhythmStability = analyzeRhythmStability(amplitude);
  const frequencyComplexity = analyzeFrequencyComplexity(frequency);
  
  return Math.round((rhythmStability + frequencyComplexity) / 2);
};

const analyzeRhythmStability = (amplitude: Float32Array): number => {
  const windowSize = 64;
  let stability = 0;
  
  for (let i = 0; i < amplitude.length - windowSize; i++) {
    const correlation = calculateCorrelation(
      amplitude.slice(i, i + windowSize),
      amplitude.slice(i + windowSize, i + windowSize * 2)
    );
    stability += correlation;
  }
  
  return Math.min(Math.round((stability + 1) * 50), 100);
};

const analyzeFrequencyComplexity = (frequency: Float32Array): number => {
  const mean = frequency.reduce((acc, val) => acc + val, 0) / frequency.length;
  const variance = frequency.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / frequency.length;
  
  return Math.min(Math.round(Math.sqrt(variance) * 10 + 50), 100);
};

const calculateCorrelation = (a: Float32Array, b: Float32Array): number => {
  const n = Math.min(a.length, b.length);
  let sum = 0;
  
  for (let i = 0; i < n; i++) {
    sum += a[i] * b[i];
  }
  
  return sum / n;
};