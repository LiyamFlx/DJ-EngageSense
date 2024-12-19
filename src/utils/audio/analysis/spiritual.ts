// Spiritual Engagement Analysis
export const analyzeSpiritualEngagement = (
  frequency: Float32Array,
  amplitude: Float32Array
): number => {
  const harmonicContent = analyzeHarmonicContent(frequency);
  const sustainedPatterns = analyzeSustainedPatterns(amplitude);
  
  return Math.round((harmonicContent + sustainedPatterns) / 2);
};

const analyzeHarmonicContent = (frequency: Float32Array): number => {
  const fundamentalIdx = findFundamentalFrequency(frequency);
  let harmonicScore = 0;
  
  for (let i = 2; i <= 8; i++) {
    const harmonicIdx = fundamentalIdx * i;
    if (harmonicIdx < frequency.length) {
      harmonicScore += Math.abs(frequency[harmonicIdx]);
    }
  }
  
  return Math.min(Math.round(harmonicScore * 10 + 50), 100);
};

const analyzeSustainedPatterns = (amplitude: Float32Array): number => {
  const windowSize = 128;
  let sustainedScore = 0;
  
  for (let i = 0; i < amplitude.length - windowSize; i += windowSize) {
    const windowMean = amplitude.slice(i, i + windowSize)
      .reduce((acc, val) => acc + Math.abs(val), 0) / windowSize;
    sustainedScore += windowMean;
  }
  
  return Math.min(Math.round(sustainedScore * 100), 100);
};

const findFundamentalFrequency = (frequency: Float32Array): number => {
  let maxIndex = 0;
  let maxValue = -Infinity;
  
  for (let i = 0; i < frequency.length / 4; i++) {
    if (frequency[i] > maxValue) {
      maxValue = frequency[i];
      maxIndex = i;
    }
  }
  
  return maxIndex;
};