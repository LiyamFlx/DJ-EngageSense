import React from 'react';
import { TrendData } from '../../types/audience';
import { Activity, TrendingUp, Music } from 'lucide-react';

interface LiveTrendsDisplayProps {
  trends: TrendData;
}

export const LiveTrendsDisplay: React.FC<LiveTrendsDisplayProps> = ({ trends }) => {
  const { currentEnergy, crowdMomentum, recommendations } = trends;

  return (
    <div className="grid gap-6">
      {/* Current Energy Level */}
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Crowd Energy
          </h3>
          <span className="text-2xl font-bold text-white">
            {Math.round(currentEnergy)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
            style={{ width: `${currentEnergy}%` }}
          />
        </div>
      </div>

      {/* Crowd Momentum */}
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Momentum
          </h3>
          <span className="text-2xl font-bold text-white">
            {Math.round(crowdMomentum)}%
          </span>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full"
            style={{ width: `${crowdMomentum}%` }}
          />
        </div>
      </div>

      {/* Track Recommendations */}
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
        <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
          <Music className="h-5 w-5" />
          Recommended Tracks
        </h3>
        <div className="space-y-4">
          {recommendations.map(track => (
            <div
              key={track.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-white">{track.title}</h4>
                  <p className="text-white/70 text-sm">{track.artist}</p>
                </div>
                <div className="text-right">
                  <span className="text-white/70 text-sm">{track.bpm} BPM</span>
                  <div className="text-green-400 text-sm">
                    {Math.round(track.confidence * 100)}% match
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-sm mt-2">{track.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};