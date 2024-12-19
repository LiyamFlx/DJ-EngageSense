import { useState, useCallback, useEffect } from 'react';
import { AudioData, AudioMetrics } from '../types/audio';
import { Alert } from '../utils/scoring/alertSystem';
import { PredictiveInsight } from '../utils/scoring/predictiveAnalysis';
import { generateAlerts } from '../utils/scoring/alertSystem';
import { analyzePredictiveInsights } from '../utils/scoring/predictiveAnalysis';

interface EngagementAnalysisState {
  alerts: Alert[];
  insights: PredictiveInsight[];
  history: AudioMetrics[];
  weights: Record<string, number>;
}

export const useEngagementAnalysis = (audioData: AudioData | null) => {
  const [state, setState] = useState<EngagementAnalysisState>({
    alerts: [],
    insights: [],
    history: [],
    weights: {
      physical: 1.0,
      emotional: 1.0,
      mental: 1.0,
      spiritual: 1.0
    }
  });

  // Update history with new metrics
  useEffect(() => {
    if (audioData?.metrics) {
      setState(prev => ({
        ...prev,
        history: [...prev.history.slice(-50), audioData.metrics]
      }));
    }
  }, [audioData]);

  // Generate alerts and insights
  useEffect(() => {
    if (state.history.length > 0) {
      const alerts = generateAlerts(state.history[state.history.length - 1], state.weights);
      const insights = analyzePredictiveInsights(state.history);

      setState(prev => ({ ...prev, alerts, insights }));
    }
  }, [state.history, state.weights]);

  const updateWeights = useCallback((newWeights: Record<string, number>) => {
    setState(prev => ({ ...prev, weights: newWeights }));
  }, []);

  return {
    alerts: state.alerts,
    insights: state.insights,
    weights: state.weights,
    updateWeights,
    history: state.history
  };
};