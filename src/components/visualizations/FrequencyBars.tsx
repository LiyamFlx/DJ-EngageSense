import React, { useEffect, useRef } from 'react';
import { Card } from '../ui/Card';

interface FrequencyBarsProps {
  analyzerNode: AnalyserNode | null;
  isActive: boolean;
}

export const FrequencyBars: React.FC<FrequencyBarsProps> = ({
  analyzerNode,
  isActive
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!canvasRef.current || !analyzerNode || !isActive) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * dpr;
    canvas.height = canvas.clientHeight * dpr;
    ctx.scale(dpr, dpr);

    const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount);
    
    const draw = () => {
      if (!ctx || !analyzerNode) return;
      
      analyzerNode.getByteFrequencyData(frequencyData);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / dpr) / (frequencyData.length / 2);
      let x = 0;

      frequencyData.forEach((value, i) => {
        if (i < frequencyData.length / 2) { // Only show half the frequencies
          const percent = value / 255;
          const height = (canvas.height / dpr) * percent;
          const hue = (x / (canvas.width / dpr)) * 360;
          
          ctx.fillStyle = `hsla(${hue}, 70%, 60%, 0.8)`;
          ctx.fillRect(
            x, 
            (canvas.height / dpr) - height, 
            barWidth - 1, 
            height
          );
          
          x += barWidth;
        }
      });

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
    <Card className="p-4">
      <h3 className="text-lg font-semibold text-white mb-4">Frequency Analysis</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-48 bg-black/20 rounded-lg"
        style={{ maxWidth: '100%' }}
      />
    </Card>
  );
};