import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon: Icon,
  color
}) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/70">{title}</p>
        <p className="text-2xl font-bold text-white">{value.toFixed(1)}%</p>
      </div>
      <Icon className={`h-8 w-8 ${color}`} />
    </div>
  </div>
);