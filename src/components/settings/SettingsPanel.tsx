import React, { useState } from 'react';
import { Settings as SettingsIcon, X } from 'lucide-react';
import { SettingsSlider } from './SettingsSlider';

interface SettingsPanelProps {
  onSettingsChange: (settings: any) => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ onSettingsChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    sensitivity: 50,
    noiseThreshold: 30,
    updateInterval: 100,
  });

  const handleChange = (key: string, value: number) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg"
      >
        <SettingsIcon className="h-6 w-6 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">Settings</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              <SettingsSlider
                label="Sensitivity"
                value={settings.sensitivity}
                min={0}
                max={100}
                onChange={(value) => handleChange('sensitivity', value)}
              />

              <SettingsSlider
                label="Noise Threshold"
                value={settings.noiseThreshold}
                min={0}
                max={100}
                onChange={(value) => handleChange('noiseThreshold', value)}
              />

              <SettingsSlider
                label="Update Interval"
                value={settings.updateInterval}
                min={50}
                max={500}
                step={50}
                unit="ms"
                onChange={(value) => handleChange('updateInterval', value)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;