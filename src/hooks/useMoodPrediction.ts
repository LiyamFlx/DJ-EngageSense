import { useState, useEffect } from 'react';
import { AudioMetrics } from '../types/audio';
import * as tf from '@tensorflow/tfjs';

interface MoodPrediction {
  currentMood: string;
  nextMood: string;
  confidence: number;
  timeToTransition: number;
}

export const useMoodPrediction = (metrics: AudioMetrics[]) => {
  const [prediction, setPrediction] = useState<MoodPrediction | null>(null);

  useEffect(() => {
    if (metrics.length < 10) return;

    const analyzeMood = async () => {
      // Create a simple sequential model for mood prediction
      const model = tf.sequential({
        layers: [
          tf.layers.dense({ units: 8, activation: 'relu', inputShape: [4] }),
          tf.layers.dense({ units: 4, activation: 'softmax' })
        ]
      });

      // Prepare input data
      const recentMetrics = metrics.slice(-10);
      const inputTensor = tf.tensor2d(
        recentMetrics.map(m => [m.physical, m.emotional, m.mental, m.spiritual])
      );

      // Make prediction
      const prediction = model.predict(inputTensor) as tf.Tensor;
      const values = await prediction.data();

      // Map prediction to mood
      const moods = ['energetic', 'calm', 'focused', 'euphoric'];
      const currentMoodIndex = values.indexOf(Math.max(...Array.from(values)));
      
      setPrediction({
        currentMood: moods[currentMoodIndex],
        nextMood: predictNextMood(moods[currentMoodIndex], recentMetrics),
        confidence: values[currentMoodIndex],
        timeToTransition: calculateTransitionTime(recentMetrics)
      });

      // Cleanup
      tf.dispose([model, inputTensor, prediction]);
    };

    analyzeMood();
  }, [metrics]);

  return prediction;
};

const predictNextMood = (currentMood: string, metrics: AudioMetrics[]): string => {
  const trend = metrics[metrics.length - 1].emotional - metrics[0].emotional;
  
  switch (currentMood) {
    case 'energetic':
      return trend > 0 ? 'euphoric' : 'focused';
    case 'calm':
      return trend > 0 ? 'focused' : 'energetic';
    case 'focused':
      return trend > 0 ? 'energetic' : 'calm';
    case 'euphoric':
      return trend > 0 ? 'energetic' : 'focused';
    default:
      return 'energetic';
  }
};

const calculateTransitionTime = (metrics: AudioMetrics[]): number => {
  const changes = metrics.reduce((acc, curr, idx, arr) => {
    if (idx === 0) return acc;
    return acc + Math.abs(curr.emotional - arr[idx - 1].emotional);
  }, 0);
  
  // Return time in seconds, between 30 and 180
  return Math.max(30, Math.min(180, 180 - (changes * 10)));
};