import React, { useEffect, useRef } from 'react';
import { drawFrequencyBars } from './frequencyDrawing';
import { Card } from '../../ui/Card';

interface FrequencyVisualizerProps {
  analyzerNode: AnalyserNode;
  isActive: boolean;
}

export const FrequencyVisualizer: React.FC<FrequencyVisualizerProps> = ({
  analyzerNode,
  isActive
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !analyzerNode || !isActive) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      drawFrequencyBars(ctx, analyzerNode, rect.width, rect.height);
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [analyzerNode, isActive]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Frequency Analysis</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-48 bg-black/20 rounded-lg"
          style={{ maxWidth: '100%' }}
        />
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
            <p className="text-white/60">Recording paused</p>
          </div>
        )}
      </div>
    </Card>
  );
};