import { useState, useEffect, useCallback, useRef } from 'react';
import { AudioData } from '../types/audio';
import { AudioSettings } from '../types/settings';
import { createAudioContext, initializeAudioNodes, getMicrophoneStream } from '../utils/audio/context';
import { calculateMetrics } from '../utils/audioAnalysis';

export const useAudioProcessor = (settings: AudioSettings) => {
  const [state, setState] = useState({
    audioData: null as AudioData | null,
    isRecording: false,
    error: null as Error | null,
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  const startRecording = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, error: null }));

      const stream = await getMicrophoneStream();
      const audioContext = createAudioContext();
      const { analyser } = initializeAudioNodes(audioContext, {
        fftSize: 2048,
        smoothingTimeConstant: 0.8
      });

      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioContext;
      sourceNodeRef.current = source;
      analyserRef.current = analyser;
      streamRef.current = stream;

      const processAudio = () => {
        if (!analyserRef.current) return;

        const frequencyData = new Float32Array(analyserRef.current.frequencyBinCount);
        const timeData = new Float32Array(analyserRef.current.frequencyBinCount);

        analyserRef.current.getFloatFrequencyData(frequencyData);
        analyserRef.current.getFloatTimeDomainData(timeData);

        const metrics = calculateMetrics(frequencyData, timeData);

        setState(prev => ({
          ...prev,
          audioData: {
            timeStamp: Date.now(),
            frequency: frequencyData,
            amplitude: timeData,
            metrics,
            analyzerNode: analyserRef.current,
          },
          isRecording: true,
        }));

        animationFrameRef.current = requestAnimationFrame(processAudio);
      };

      processAudio();
    } catch (error) {
      console.error('Failed to start recording:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error : new Error('Failed to start recording')
      }));
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (sourceNodeRef.current) {
      sourceNodeRef.current.disconnect();
    }

    if (audioContextRef.current) {
      audioContextRef.current.close();
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }

    setState(prev => ({
      ...prev,
      isRecording: false
    }));
  }, []);

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, [stopRecording]);

  return {
    ...state,
    startRecording,
    stopRecording,
  };
};