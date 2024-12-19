import React, { useEffect, useRef, useState } from 'react';
import { Card } from '../ui/Card';
import { AudioControlPanel } from './AudioControlPanel';
import { AudioVisualizer } from './AudioVisualizer';
import { EngagementMetrics } from '../metrics/EngagementMetrics';
import { FrequencyBars } from '../visualizations/FrequencyBars';
import { SentimentChart } from '../visualizations/SentimentChart';
import { useAudioProcessor } from '../../hooks/useAudioProcessor';
import type { AudioData } from '../../types/audio';

interface AudioAnalyzerProps {
  onAudioData: (data: AudioData) => void;
}

export const AudioAnalyzer: React.FC<AudioAnalyzerProps> = ({ onAudioData }) => {
  const {
    audioData,
    isRecording,
    startRecording,
    stopRecording,
    error
  } = useAudioProcessor({
    sensitivity: 50,
    noiseThreshold: 30,
    updateInterval: 100
  });

  const [features, setFeatures] = useState<{
    rms: number;
    spectralCentroid: number;
    pitch: number;
    zeroCrossingRate: number;
  } | null>(null);

  useEffect(() => {
    if (audioData) {
      onAudioData(audioData);
      // Calculate audio features
      setFeatures({
        rms: calculateRMS(audioData.amplitude),
        spectralCentroid: calculateSpectralCentroid(audioData.frequency),
        pitch: calculatePitch(audioData.frequency),
        zeroCrossingRate: calculateZeroCrossingRate(audioData.amplitude)
      });
    }
  }, [audioData, onAudioData]);

  if (error) {
    return (
      <Card className="p-4 bg-red-500/20">
        <p className="text-white">{error.message}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AudioControlPanel
        isRecording={isRecording}
        onStartRecording={startRecording}
        onStopRecording={stopRecording}
      />

      <AudioVisualizer
        data={audioData}
        isRecording={isRecording}
      />

      {audioData && (
        <>
          <EngagementMetrics metrics={audioData.metrics} />
          
          {audioData.analyzerNode && (
            <FrequencyBars
              analyzerNode={audioData.analyzerNode}
              isActive={isRecording}
            />
          )}

          {features && (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Audio Features</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400">RMS:</span>
                  <span className="ml-2">{features.rms.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-gray-400">Spectral Centroid:</span>
                  <span className="ml-2">{features.spectralCentroid.toFixed(0)} Hz</span>
                </div>
                <div>
                  <span className="text-gray-400">Pitch:</span>
                  <span className="ml-2">{features.pitch.toFixed(1)} Hz</span>
                </div>
                <div>
                  <span className="text-gray-400">Zero Crossing Rate:</span>
                  <span className="ml-2">{features.zeroCrossingRate.toFixed(3)}</span>
                </div>
              </div>
            </Card>
          )}

          <SentimentChart data={audioData} />
        </>
      )}
    </div>
  );
};

// Audio feature calculation functions
const calculateRMS = (amplitude: Float32Array) => {
  return Math.sqrt(
    amplitude.reduce((acc, val) => acc + val * val, 0) / amplitude.length
  );
};

const calculateSpectralCentroid = (frequency: Float32Array) => {
  let numerator = 0;
  let denominator = 0;
  
  frequency.forEach((magnitude, i) => {
    numerator += magnitude * i;
    denominator += magnitude;
  });
  
  return numerator / denominator;
};

const calculatePitch = (frequency: Float32Array) => {
  const maxIndex = frequency.indexOf(Math.max(...frequency));
  return maxIndex * (44100 / frequency.length);
};

const calculateZeroCrossingRate = (amplitude: Float32Array) => {
  let crossings = 0;
  for (let i = 1; i < amplitude.length; i++) {
    if ((amplitude[i] >= 0 && amplitude[i - 1] < 0) || 
        (amplitude[i] < 0 && amplitude[i - 1] >= 0)) {
      crossings++;
    }
  }
  return crossings / amplitude.length;
};