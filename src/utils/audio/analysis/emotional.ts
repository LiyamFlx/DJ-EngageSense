// Emotional Engagement Analysis
export const analyzeEmotionalEngagement = (frequency: Float32Array): number => {
  const totalEnergy = frequency.reduce((acc, val) => acc + Math.abs(val), 0);
  const normalizedEnergy = totalEnergy / frequency.length;
  
  return Math.min(Math.round((normalizedEnergy + 140) * 0.5), 100);
};

export const analyzeTonalVariation = (frequency: Float32Array): number => {
  const mean = frequency.reduce((acc, val) => acc + val, 0) / frequency.length;
  const variance = frequency.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / frequency.length;
  
  return Math.min(Math.round(Math.sqrt(variance) * 10), 100);
};