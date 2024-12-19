import React, { useRef, useEffect } from 'react';
import { AudioData } from '../../types/audio';
import { drawWaveform, drawFrequencySpectrum } from '../../utils/canvas';

interface CanvasProps {
  audioData: AudioData | null;
  width?: number;
  height?: number;
}

export const Canvas: React.FC<CanvasProps> = ({ audioData, width = 800, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !audioData) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw visualizations
    drawWaveform(ctx, audioData.amplitude, width, height);
    drawFrequencySpectrum(ctx, audioData.frequency, width, height);
  }, [audioData, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="w-full h-full rounded-lg bg-black/20"
    />
  );
};

export default Canvas;