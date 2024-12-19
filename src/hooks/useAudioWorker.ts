import { useEffect, useRef, useCallback } from 'react';
import { AudioData, AudioMetrics } from '../types/audio';
import { retry } from '../utils/retry';

export const useAudioWorker = () => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../workers/audioProcessor.worker.ts', import.meta.url),
      { type: 'module' }
    );

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const processAudio = useCallback(async (audioData: AudioData): Promise<AudioMetrics> => {
    if (!workerRef.current) {
      throw new Error('Audio worker not initialized');
    }

    return retry(
      () => new Promise((resolve, reject) => {
        const worker = workerRef.current!;

        const handleMessage = (event: MessageEvent) => {
          if (event.data.type === 'SUCCESS') {
            worker.removeEventListener('message', handleMessage);
            resolve(event.data.data);
          } else if (event.data.type === 'ERROR') {
            worker.removeEventListener('message', handleMessage);
            reject(new Error(event.data.error));
          }
        };

        worker.addEventListener('message', handleMessage);
        worker.postMessage({ audioData });
      }),
      { maxAttempts: 3, delay: 500 }
    );
  }, []);

  return { processAudio };
};