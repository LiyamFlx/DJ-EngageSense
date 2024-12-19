import React from 'react';
import { TrendingUp, Star, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import type { TrackInsight } from '../../types/music';

interface MusicLibraryInsightsProps {
  insights: TrackInsight[];
}

export const MusicLibraryInsights: React.FC<MusicLibraryInsightsProps> = ({ insights }) => (
  <Card className="p-4">
    <h3 className="text-lg font-semibold text-white mb-4">Track Insights</h3>
    
    <div className="space-y-4">
      {insights.map((insight) => (
        <div key={insight.trackId} className="bg-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-white">{insight.trackName}</p>
              <p className="text-sm text-white/70">{insight.artist}</p>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white">{insight.rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-white/70">
                {insight.engagementScore}% engagement
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-white/70">
                {insight.playCount} plays
              </span>
            </div>
          </div>
          
          {insight.recommendation && (
            <p className="mt-2 text-sm text-purple-400">
              {insight.recommendation}
            </p>
          )}
        </div>
      ))}
    </div>
  </Card>
);