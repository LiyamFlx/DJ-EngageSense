import React from 'react';
import { Mic, Square } from 'lucide-react';

interface AudioControlsProps {
  isRecording: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const AudioControls: React.FC<AudioControlsProps> = ({
  isRecording,
  onStartRecording,
  onStopRecording,
}) => (
  <div className="flex justify-center">
    <button
      onClick={isRecording ? onStopRecording : onStartRecording}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
        isRecording
          ? 'bg-red-500 hover:bg-red-600 text-white'
          : 'bg-green-500 hover:bg-green-600 text-white'
      }`}
    >
      {isRecording ? (
        <>
          <Square className="w-5 h-5" />
          Stop Recording
        </>
      ) : (
        <>
          <Mic className="w-5 h-5" />
          Start Recording
        </>
      )}
    </button>
  </div>
);