import React from 'react';
import { Activity, Brain, Heart, Zap } from 'lucide-react';
import { MetricCard } from './MetricCard';
import type { AudioMetrics } from '../../types/audio';

interface EngagementMetricsProps {
  metrics: AudioMetrics;
}

export const EngagementMetrics: React.FC<EngagementMetricsProps> = ({ metrics }) => {
  // Ensure metrics exist and have valid values
  const safeMetrics = {
    physical: metrics?.physical ?? 0,
    emotional: metrics?.emotional ?? 0,
    mental: metrics?.mental ?? 0,
    spiritual: metrics?.spiritual ?? 0
  };

  const metricConfigs = [
    { title: 'Physical', value: safeMetrics.physical, icon: Activity, color: 'text-blue-400' },
    { title: 'Emotional', value: safeMetrics.emotional, icon: Heart, color: 'text-red-400' },
    { title: 'Mental', value: safeMetrics.mental, icon: Brain, color: 'text-purple-400' },
    { title: 'Spiritual', value: safeMetrics.spiritual, icon: Zap, color: 'text-yellow-400' }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {metricConfigs.map(({ title, value, icon: Icon, color }) => (
        <MetricCard
          key={title}
          title={title}
          value={value}
          icon={Icon}
          color={color}
        />
      ))}
    </div>
  );
};