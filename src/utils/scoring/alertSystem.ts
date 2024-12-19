import { AudioMetrics } from '../../types/audio';

export interface Alert {
  type: 'warning' | 'critical';
  metric: keyof AudioMetrics;
  message: string;
  value: number;
  threshold: number;
}

const THRESHOLDS = {
  physical: { warning: 30, critical: 20 },
  emotional: { warning: 35, critical: 25 },
  mental: { warning: 40, critical: 30 },
  spiritual: { warning: 35, critical: 25 }
};

export const generateAlerts = (
  metrics: AudioMetrics,
  weights: Record<string, number>
): Alert[] => {
  const alerts: Alert[] = [];

  Object.entries(metrics).forEach(([metric, value]) => {
    const weightedValue = value * (weights[metric] || 1);
    const thresholds = THRESHOLDS[metric as keyof AudioMetrics];

    if (weightedValue <= thresholds.critical) {
      alerts.push({
        type: 'critical',
        metric: metric as keyof AudioMetrics,
        message: `Critical: ${metric} engagement is very low`,
        value: weightedValue,
        threshold: thresholds.critical
      });
    } else if (weightedValue <= thresholds.warning) {
      alerts.push({
        type: 'warning',
        metric: metric as keyof AudioMetrics,
        message: `Warning: ${metric} engagement needs attention`,
        value: weightedValue,
        threshold: thresholds.warning
      });
    }
  });

  return alerts;
};