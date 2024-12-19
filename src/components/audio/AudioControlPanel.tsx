import React from 'react';
import { Mic, Square, Activity, AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface AudioControlPanelProps {
  isRecording: boolean;
  isAnalyzing: boolean;
  onStartRecording: () => void;
  onStopRecording: () => void;
}

export const AudioControlPanel: React.FC<AudioControlPanelProps> = ({
  isRecording,
  isAnalyzing,
  onStartRecording,
  onStopRecording,
}) => (
  <Card className="p-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Audio Controls</h3>
        {isRecording && (
          <div className="flex items-center gap-2 text-red-400 animate-pulse">
            <Activity className="w-4 h-4" />
            <span className="text-sm">Recording in progress</span>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          variant={isRecording ? 'danger' : 'primary'}
          icon={isRecording ? Square : Mic}
          onClick={isRecording ? onStopRecording : onStartRecording}
          disabled={isAnalyzing}
        >
          {isRecording ? 'Stop Recording' : 'Start Recording'}
        </Button>

        {isAnalyzing && (
          <div className="flex items-center gap-2 text-yellow-400">
            <AlertCircle className="w-4 h-4 animate-pulse" />
            <span className="text-sm">Analyzing audio...</span>
          </div>
        )}
      </div>
    </div>
  </Card>
);