import React from 'react';

interface SettingsSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export const SettingsSlider: React.FC<SettingsSliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '%',
  onChange,
}) => (
  <div>
    <label className="block text-sm font-medium text-white/70 mb-2">
      {label} ({value}{unit})
    </label>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  </div>
);

export default SettingsSlider;