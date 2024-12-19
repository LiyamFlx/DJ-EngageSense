import React, { useCallback, useRef, useEffect } from 'react';
import { Play, Pause, Upload } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import { VisualizerProps } from '../../types/audio';

export const AudioVisualizer: React.FC<VisualizerProps> = ({
  data,
  isRecording,
  onStartRecording,
  onStopRecording,
  onFileUpload,
}) => {
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

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
      // Update waveform with new audio data
      const audioData = new Float32Array(data.amplitude);
      wavesurferRef.current.loadDecodedBuffer({ getChannelData: () => audioData } as AudioBuffer);
    }
  }, [data]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
      if (wavesurferRef.current) {
        wavesurferRef.current.loadBlob(file);
      }
    }
  }, [onFileUpload]);

  return (
    <div className="mt-8 bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-white">Live Audio Analysis</h2>
        <div className="flex space-x-3">
          <button
            onClick={isRecording ? onStopRecording : onStartRecording}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isRecording ? (
              <Pause className="h-5 w-5 text-white" />
            ) : (
              <Play className="h-5 w-5 text-white" />
            )}
          </button>
          
          <label className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors cursor-pointer">
            <Upload className="h-5 w-5 text-white" />
            <input
              ref={uploadRef}
              type="file"
              accept="audio/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      </div>
      
      <div ref={waveformRef} className="h-48 bg-black/20 rounded-lg" />
      
      {isRecording && (
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-75" />
          <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse delay-150" />
        </div>
      )}
    </div>
  );
};