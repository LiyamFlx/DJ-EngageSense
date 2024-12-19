import React, { useRef, useEffect } from 'react';
import { drawWaveform } from '../../utils/canvas/waveform';
import { AudioData } from '../../types/audio';

interface WaveformVisualizerProps {
  audioData: AudioData;
  width?: number;
  height?: number;
  color?: string;
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  audioData,
  width = 800,
  height = 200,
  color = 'rgba(255, 255, 255, 0.8)'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw waveform
    drawWaveform(ctx, audioData.amplitude, {
      width,
      height,
      color,
      lineWidth: 2
    });
  }, [audioData, width, height, color]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full rounded-lg bg-black/20"
    />
  );
};