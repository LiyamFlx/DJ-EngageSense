import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';
import type { AudioMetrics } from '../../types/audio';

interface EngagementHeatmapProps {
  history: AudioMetrics[];
}

export const EngagementHeatmap: React.FC<EngagementHeatmapProps> = ({ history }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || history.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const metrics = ['physical', 'emotional', 'mental', 'spiritual'] as const;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const cellWidth = width / Math.max(history.length, 1);
    const cellHeight = height / metrics.length;

    ctx.clearRect(0, 0, width, height);

    // Draw heatmap
    history.forEach((data, timeIndex) => {
      metrics.forEach((metric, metricIndex) => {
        const value = data[metric];
        const x = timeIndex * cellWidth;
        const y = metricIndex * cellHeight;

        // Create gradient from blue (cold) to red (hot)
        const hue = ((1 - value / 100) * 240).toString(10);
        ctx.fillStyle = `hsla(${hue}, 70%, 50%, 0.8)`;
        ctx.fillRect(x, y, cellWidth, cellHeight);

        // Add cell border
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeRect(x, y, cellWidth, cellHeight);
      });
    });

    // Add labels
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = '12px Inter';
    metrics.forEach((metric, i) => {
      const label = metric.charAt(0).toUpperCase() + metric.slice(1);
      ctx.fillText(label, 5, i * cellHeight + 20);
    });

  }, [history]);

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Engagement Heatmap</h3>
      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full h-48 bg-black/20 rounded-lg"
          style={{ maxWidth: '100%' }}
        />
        {history.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50">
            No data available
          </div>
        )}
      </div>
    </Card>
  );
};