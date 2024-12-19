import React from 'react';
import { LiveAudioAnalyzer } from '../../audio/LiveAudioAnalyzer';
import { TrackSearchDialog } from '../../music/TrackSearchDialog';
import { ToggleSwitch } from '../../controls/ToggleSwitch';

interface MainControlsProps {
  isAutoDJMode: boolean;
  onToggleAutoDJ: (enabled: boolean) => void;
}

export const MainControls: React.FC<MainControlsProps> = ({
  isAutoDJMode,
  onToggleAutoDJ
}) => (
  <div className="flex flex-wrap items-center gap-4">
    <LiveAudioAnalyzer />
    <TrackSearchDialog />
    <ToggleSwitch
      label="Auto-DJ"
      enabled={isAutoDJMode}
      onChange={onToggleAutoDJ}
    />
  </div>
);