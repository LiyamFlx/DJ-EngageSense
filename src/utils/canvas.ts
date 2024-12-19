export const drawWaveform = (
  ctx: CanvasRenderingContext2D,
  amplitude: Float32Array,
  width: number,
  height: number
) => {
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;

  const sliceWidth = width / amplitude.length;
  let x = 0;

  for (let i = 0; i < amplitude.length; i++) {
    const v = (amplitude[i] + 1) / 2;
    const y = v * height;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    x += sliceWidth;
  }

  ctx.lineTo(width, height / 2);
  ctx.stroke();
};

export const drawFrequencySpectrum = (
  ctx: CanvasRenderingContext2D,
  frequency: Float32Array,
  width: number,
  height: number
) => {
  const barWidth = width / frequency.length;
  ctx.fillStyle = 'rgba(147, 51, 234, 0.5)';

  for (let i = 0; i < frequency.length; i++) {
    const barHeight = ((frequency[i] + 140) * height) / 140;
    ctx.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
  }
};