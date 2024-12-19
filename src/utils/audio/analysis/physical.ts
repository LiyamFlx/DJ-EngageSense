// Physical Engagement Analysis
export const analyzePhysicalEngagement = (amplitude: Float32Array): number => {
  const rms = Math.sqrt(
    amplitude.reduce((acc, val) => acc + val * val, 0) / amplitude.length
  );
  
  return Math.min(Math.round((rms + 1) * 50), 100);
};

export const analyzeMovement = (amplitude: Float32Array): number => {
  const windowSize = 64;
  let movementScore = 0;
  
  for (let i = 0; i < amplitude.length - windowSize; i++) {
    const variation = Math.abs(amplitude[i] - amplitude[i + windowSize]);
    movementScore += variation;
  }
  
  return Math.min(Math.round(movementScore * 100), 100);
};