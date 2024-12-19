import React from 'react';
import { AlertTriangle, AlertOctagon } from 'lucide-react';
import type { Alert } from '../../utils/scoring/alertSystem';

interface AlertDisplayProps {
  alerts: Alert[];
}

export const AlertDisplay: React.FC<AlertDisplayProps> = ({ alerts }) => (
  <div className="space-y-2">
    {alerts.map((alert, index) => (
      <div
        key={`${alert.metric}-${index}`}
        className={`flex items-center gap-3 p-4 rounded-lg ${
          alert.type === 'critical' ? 'bg-red-500/20' : 'bg-yellow-500/20'
        }`}
      >
        {alert.type === 'critical' ? (
          <AlertOctagon className="w-6 h-6 text-red-400" />
        ) : (
          <AlertTriangle className="w-6 h-6 text-yellow-400" />
        )}
        <div>
          <p className="font-medium text-white">{alert.message}</p>
          <p className="text-sm text-gray-300">
            Current: {alert.value}% | Target: {alert.threshold}%
          </p>
        </div>
      </div>
    ))}
  </div>
);