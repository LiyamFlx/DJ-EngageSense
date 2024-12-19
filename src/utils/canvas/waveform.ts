interface WaveformOptions {
  width: number;
  height: number;
  color: string;
  lineWidth: number;
}

export const drawWaveform = (
  ctx: CanvasRenderingContext2D,
  amplitude: Float32Array,
  options: WaveformOptions
) => {
  const { width, height, color, lineWidth } = options;

  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.lineWidth = lineWidth;

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