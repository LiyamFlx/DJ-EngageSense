import React from 'react';
import { BarChart, Clock, Zap } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

export const SessionInsights: React.FC = () => {
  const { crowdMetricsHistory, peakMoments, successfulTransitions } = useSessionStore();

  const averageEnergy = crowdMetricsHistory.reduce(
    (sum, metrics) => sum + metrics.energy,
    0
  ) / crowdMetricsHistory.length;

  const topTransitions = successfulTransitions
    .reduce((acc, transition) => {
      const key = `${transition.from} → ${transition.to}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  return (
    <div className="grid gap-6">
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <BarChart className="h-5 w-5" />
          Session Statistics
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Average Energy</p>
            <p className="text-2xl font-bold text-white">
              {Math.round(averageEnergy)}%
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Peak Moments</p>
            <p className="text-2xl font-bold text-white">
              {peakMoments.length}
            </p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-4">
            <p className="text-white/70 text-sm">Transitions</p>
            <p className="text-2xl font-bold text-white">
              {successfulTransitions.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <Zap className="h-5 w-5" />
          Top Transitions
        </h3>
        
        <div className="space-y-2">
          {Object.entries(topTransitions)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([transition, count]) => (
              <div
                key={transition}
                className="bg-white/5 rounded-lg p-3 flex justify-between items-center"
              >
                <span className="text-white">{transition}</span>
                <span className="text-white/70">{count}x</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};