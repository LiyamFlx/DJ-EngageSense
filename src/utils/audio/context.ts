// Audio Context Management
import { AudioContextConfig } from '../../types/audio';

export const createAudioContext = () => {
  return new (window.AudioContext || (window as any).webkitAudioContext)();
};

export const initializeAudioNodes = (context: AudioContext, config: AudioContextConfig) => {
  const analyser = context.createAnalyser();
  analyser.fftSize = config.fftSize || 2048;
  analyser.smoothingTimeConstant = config.smoothingTimeConstant || 0.8;
  
  return { analyser };
};

export const getMicrophoneStream = async () => {
  return navigator.mediaDevices.getUserMedia({ 
    audio: { 
      echoCancellation: true,
      noiseSuppression: true,
      autoGainControl: true
    } 
  });
};