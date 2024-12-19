export interface AudioContextConfig {
  fftSize?: number;
  smoothingTimeConstant?: number;
}

export interface AudioMetrics {
  physical: number;
  emotional: number;
  mental: number;
  spiritual: number;
}

export interface AudioData {
  timeStamp: number;
  frequency: Float32Array;
  amplitude: Float32Array;
  metrics: AudioMetrics;
  analyzerNode?: AnalyserNode;
}

export interface VisualizerProps {
  data: AudioData | null;
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}