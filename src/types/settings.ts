export interface AudioSettings {
  sensitivity: number;
  noiseThreshold: number;
  updateInterval: number;
}

export interface VisualizerSettings {
  waveformColor: string;
  spectrumColor: string;
  backgroundColor: string;
}

export type Settings = AudioSettings & VisualizerSettings;