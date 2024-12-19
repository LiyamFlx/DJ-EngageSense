import React from 'react';
import { Activity, Brain, Heart, Zap } from 'lucide-react';

const MetricCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color 
}: { 
  title: string; 
  value: number; 
  icon: React.ElementType; 
  color: string; 
}) => (
  <div className={`bg-white/10 backdrop-blur-sm rounded-lg p-4 ${color}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-white/70">{title}</p>
        <p className="text-2xl font-bold text-white">{value}%</p>
      </div>
      <Icon className="h-8 w-8 text-white/80" />
    </div>
  </div>
);

const EngagementMetrics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Physical"
        value={85}
        icon={Activity}
        color="hover:bg-blue-500/20"
      />
      <MetricCard
        title="Emotional"
        value={92}
        icon={Heart}
        color="hover:bg-red-500/20"
      />
      <MetricCard
        title="Mental"
        value={78}
        icon={Brain}
        color="hover:bg-purple-500/20"
      />
      <MetricCard
        title="Spiritual"
        value={88}
        icon={Zap}
        color="hover:bg-yellow-500/20"
      />
    </div>
  );
};

export default EngagementMetrics;