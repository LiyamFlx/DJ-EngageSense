import React from 'react';

interface SessionInfoProps {
  duration: number;
  dataPoints: number;
}

export const SessionInfo: React.FC<SessionInfoProps> = ({ duration, dataPoints }) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="bg-white/5 rounded-lg p-4">
      <p className="text-sm text-white/70">Session Duration</p>
      <p className="text-2xl font-bold text-white">{duration}s</p>
    </div>
    <div className="bg-white/5 rounded-lg p-4">
      <p className="text-sm text-white/70">Data Points</p>
      <p className="text-2xl font-bold text-white">{dataPoints}</p>
    </div>
  </div>
);