import React, { useState } from 'react';
import { Sliders, Bell } from 'lucide-react';

interface DJPreferencesProps {
  weights: Record<string, number>;
  onUpdateWeights: (weights: Record<string, number>) => void;
}

export const DJPreferences: React.FC<DJPreferencesProps> = ({
  weights,
  onUpdateWeights
}) => {
  const [alertThresholds, setAlertThresholds] = useState({
    energy: 50,
    engagement: 40,
    momentum: 30
  });

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">DJ Preferences</h2>

      {/* Metric Weights */}
      <div className="space-y-4 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-medium text-white">Metric Weights</h3>
        </div>
        
        {Object.entries(weights).map(([metric, value]) => (
          <div key={metric} className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-white/80 capitalize">{metric}</label>
              <span className="text-sm text-purple-400">{value.toFixed(1)}x</span>
            </div>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={value}
              onChange={(e) => onUpdateWeights({
                ...weights,
                [metric]: parseFloat(e.target.value)
              })}
              className="w-full"
            />
          </div>
        ))}
      </div>

      {/* Alert Thresholds */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-medium text-white">Alert Thresholds</h3>
        </div>
        
        {Object.entries(alertThresholds).map(([metric, value]) => (
          <div key={metric} className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm text-white/80 capitalize">{metric}</label>
              <span className="text-sm text-purple-400">{value}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={(e) => setAlertThresholds(prev => ({
                ...prev,
                [metric]: parseInt(e.target.value)
              }))}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};