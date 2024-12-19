import * as tf from '@tensorflow/tfjs';
import { AudioData } from '../../types/audio';
import { CrowdPrediction } from '../../types/ml';

export class CrowdAnalysisModel {
  private model: tf.LayersModel | null = null;

  async initialize() {
    this.model = await tf.loadLayersModel('/models/crowd-analysis/model.json');
  }

  async predictCrowdResponse(audioData: AudioData): Promise<CrowdPrediction> {
    if (!this.model) throw new Error('Model not initialized');

    const features = this.extractFeatures(audioData);
    const prediction = await this.model.predict(features) as tf.Tensor;
    
    return {
      energyPrediction: prediction.dataSync()[0],
      nextPeakProbability: prediction.dataSync()[1],
      genrePreference: this.interpretGenrePreference(prediction.dataSync().slice(2)),
    };
  }

  private extractFeatures(audioData: AudioData): tf.Tensor {
    const { frequency, amplitude } = audioData;
    return tf.tidy(() => {
      const freqFeatures = tf.tensor1d(Array.from(frequency));
      const ampFeatures = tf.tensor1d(Array.from(amplitude));
      return tf.concat([freqFeatures, ampFeatures]);
    });
  }

  private interpretGenrePreference(genreScores: Float32Array): string[] {
    const genres = ['house', 'techno', 'trance', 'dnb'];
    return genres
      .map((genre, i) => ({ genre, score: genreScores[i] }))
      .sort((a, b) => b.score - a.score)
      .map(({ genre }) => genre);
  }
}