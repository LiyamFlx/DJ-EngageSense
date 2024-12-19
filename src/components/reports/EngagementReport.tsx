import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { AudioMetrics } from '../../types/audio';
import { ReportMetrics } from './ReportMetrics';
import { ReportHeader } from './ReportHeader';
import { SessionInfo } from './SessionInfo';

interface EngagementReportProps {
  sessionData: {
    startTime: Date;
    endTime: Date;
    metrics: AudioMetrics[];
  };
}

export const EngagementReport: React.FC<EngagementReportProps> = ({ sessionData }) => {
  const duration = Math.round(
    (sessionData.endTime.getTime() - sessionData.startTime.getTime()) / 1000
  );

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <ReportHeader />
      <div className="grid gap-6">
        <SessionInfo duration={duration} dataPoints={sessionData.metrics.length} />
        <ReportMetrics metrics={sessionData.metrics} />
      </div>
    </div>
  );
};

export default EngagementReport;