import React from 'react';
import { AudioControlPanel } from '../../audio/AudioControlPanel';

export const BottomBar: React.FC = () => (
  <div className="p-4">
    <AudioControlPanel
      isRecording={false}
      isAnalyzing={false}
      isAutoDJMode={false}
      onStartRecording={() => {}}
      onStopRecording={() => {}}
      onAnalyzeAudio={() => {}}
      onSearchTrack={() => {}}
      onToggleAutoDJ={() => {}}
      onEnergyVote={() => {}}
    />
  </div>
);