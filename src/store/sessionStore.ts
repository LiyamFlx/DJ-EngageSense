import { create } from 'zustand';
import { TrackDetails } from '../types/spotify';
import { CrowdMetrics } from '../types/audience';

interface SessionState {
  playedTracks: TrackDetails[];
  crowdMetricsHistory: CrowdMetrics[];
  peakMoments: { timestamp: number; type: string }[];
  successfulTransitions: { from: string; to: string }[];
  addTrack: (track: TrackDetails) => void;
  addCrowdMetrics: (metrics: CrowdMetrics) => void;
  addPeakMoment: (moment: { timestamp: number; type: string }) => void;
  addTransition: (from: string, to: string) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  playedTracks: [],
  crowdMetricsHistory: [],
  peakMoments: [],
  successfulTransitions: [],
  
  addTrack: (track) =>
    set((state) => ({
      playedTracks: [...state.playedTracks, track],
    })),
    
  addCrowdMetrics: (metrics) =>
    set((state) => ({
      crowdMetricsHistory: [...state.crowdMetricsHistory, metrics],
    })),
    
  addPeakMoment: (moment) =>
    set((state) => ({
      peakMoments: [...state.peakMoments, moment],
    })),
    
  addTransition: (from, to) =>
    set((state) => ({
      successfulTransitions: [...state.successfulTransitions, { from, to }],
    })),
}));