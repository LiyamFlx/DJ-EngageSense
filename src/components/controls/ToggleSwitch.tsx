import React from 'react';

interface ToggleSwitchProps {
  label: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  enabled,
  onChange,
}) => {
  return (
    <label className="flex items-center cursor-pointer">
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={(e) => onChange(e.target.checked)}
        />
        <div className={`w-10 h-6 bg-gray-600 rounded-full transition-colors ${
          enabled ? 'bg-purple-600' : ''
        }`}>
          <div className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-1'
          } top-1`} />
        </div>
      </div>
      <span className="ml-3 text-sm text-white">{label}</span>
    </label>
  );
};