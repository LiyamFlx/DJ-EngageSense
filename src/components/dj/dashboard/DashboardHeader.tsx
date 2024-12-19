import React from 'react';
import { Settings, Music } from 'lucide-react';
import { MainControls } from './MainControls';

interface DashboardHeaderProps {
  showSettings: boolean;
  onToggleSettings: () => void;
  isAutoDJMode: boolean;
  onToggleAutoDJ: (enabled: boolean) => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  showSettings,
  onToggleSettings,
  isAutoDJMode,
  onToggleAutoDJ
}) => (
  <div className="flex flex-col gap-4 mb-8">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <Music className="w-8 h-8 text-purple-400" />
        <h1 className="text-3xl font-bold text-white">EngageSense</h1>
      </div>
      
      <button 
        onClick={onToggleSettings}
        className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        <Settings className="w-6 h-6 text-white" />
      </button>
    </div>

    <MainControls
      isAutoDJMode={isAutoDJMode}
      onToggleAutoDJ={onToggleAutoDJ}
    />
  </div>
);