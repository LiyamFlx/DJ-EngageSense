import React from 'react';
import { Clock } from 'lucide-react';
import { PeakMoment } from '../../types/audience';

interface PeakMomentsTimelineProps {
  peaks: PeakMoment[];
}

export const PeakMomentsTimeline: React.FC<PeakMomentsTimelineProps> = ({ peaks }) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5" />
        Peak Moments Timeline
      </h3>
      
      <div className="relative">
        {peaks.map((peak, index) => (
          <div
            key={peak.timestamp}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-16 text-white/70 text-sm">
              {new Date(peak.timestamp).toLocaleTimeString()}
            </div>
            <div
              className={`flex-1 p-3 rounded-lg ${
                peak.type === 'drop'
                  ? 'bg-purple-500/20'
                  : peak.type === 'buildup'
                  ? 'bg-blue-500/20'
                  : 'bg-pink-500/20'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-white font-medium capitalize">
                  {peak.type}
                </span>
                <span className="text-white/70 text-sm">
                  {Math.round(peak.energy)}% energy
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};