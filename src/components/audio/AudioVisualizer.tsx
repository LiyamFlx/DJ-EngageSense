import React, { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { Card } from '../ui/Card';
import type { AudioData } from '../../types/audio';

interface AudioVisualizerProps {
  data: AudioData | null;
  isRecording: boolean;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({
  data,
  isRecording,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  useEffect(() => {
    if (waveformRef.current && !wavesurferRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#9333ea',
        progressColor: '#a855f7',
        cursorColor: '#a855f7',
        barWidth: 2,
        barGap: 1,
        height: 100,
        normalize: true,
        responsive: true,
      });
    }

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (data && wavesurferRef.current) {
      const audioData = new Float32Array(data.amplitude);
      wavesurferRef.current.loadDecodedBuffer({ getChannelData: () => audioData } as AudioBuffer);
    }
  }, [data]);

  return (
    <Card className="p-4">
      <div
        ref={waveformRef}
        className="w-full h-24 bg-gray-800/50 rounded-lg overflow-hidden"
      />
      {isRecording && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-75" />
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-150" />
        </div>
      )}
    </Card>
  );
};