export interface EngagementMetricsData {
  physical: number;
  emotional: number;
  mental: number;
  spiritual: number;
}

export interface AnalysisState {
  isAnalyzing: boolean;
  progress: number;
  error: string | null;
}