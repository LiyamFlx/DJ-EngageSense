import React from 'react';

interface MetricDisplayProps {
  label: string;
  value: number;
}

export const MetricDisplay: React.FC<MetricDisplayProps> = ({ label, value }) => (
  <div>
    <p className="text-sm text-white/70">{label}</p>
    <p className="text-xl font-bold text-white">{value}%</p>
  </div>
);