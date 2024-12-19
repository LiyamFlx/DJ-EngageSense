export const drawFrequencyBars = (
  ctx: CanvasRenderingContext2D,
  analyzerNode: AnalyserNode,
  width: number,
  height: number
) => {
  const frequencyData = new Uint8Array(analyzerNode.frequencyBinCount);
  analyzerNode.getByteFrequencyData(frequencyData);
  
  ctx.clearRect(0, 0, width, height);
  
  const barWidth = width / (frequencyData.length / 2);
  let x = 0;

  frequencyData.forEach((value, i) => {
    if (i < frequencyData.length / 2) {
      const percent = value / 255;
      const barHeight = height * percent;
      const hue = (x / width) * 360;
      
      // Create gradient for each bar
      const gradient = ctx.createLinearGradient(x, height - barHeight, x, height);
      gradient.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.8)`);
      gradient.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.2)`);
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
      
      x += barWidth;
    }
  });
};