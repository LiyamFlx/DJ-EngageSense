import React from 'react';
import { DJPreferences } from '../DJPreferences';
import { TrendPredictions } from '../TrendPredictions';
import { TrackSuggestions } from '../../recommendations/TrackSuggestions';
import { AudienceFeedback } from '../AudienceFeedback';
import { TrackSearch } from '../../music/TrackSearch';
import { SentimentOverlay } from '../../visualizations/SentimentOverlay';
import type { TrendPrediction } from '../../../types/predictions';
import type { FeedbackItem } from '../../../types/audience';
import type { TrackDetails } from '../../../types/spotify';

interface SidePanelProps {
  showSettings: boolean;
  weights: Record<string, number>;
  onUpdateWeights: (weights: Record<string, number>) => void;
  predictions: TrendPrediction | null;
  recommendations: any[];
  feedback: FeedbackItem[];
  stats: { positive: number; negative: number };
  spotifyTracks: TrackDetails[];
  onTrackSearch: (query: string) => Promise<void>;
  isSpotifyLoading: boolean;
}

export const SidePanel: React.FC<SidePanelProps> = ({
  showSettings,
  weights,
  onUpdateWeights,
  predictions,
  recommendations = [], // Provide default empty array
  feedback = [], // Provide default empty array
  stats = { positive: 0, negative: 0 }, // Provide default values
  spotifyTracks = [], // Provide default empty array
  onTrackSearch,
  isSpotifyLoading
}) => (
  <div className="space-y-6">
    {showSettings ? (
      <DJPreferences
        weights={weights}
        onUpdateWeights={onUpdateWeights}
      />
    ) : (
      <>
        {predictions && (
          <>
            <TrendPredictions predictions={predictions} />
            <SentimentOverlay 
              sentiment={{
                score: predictions.confidenceScore,
                trend: predictions.currentMomentum > 0 ? 'rising' : 'falling',
                prediction: predictions.suggestedGenres[0]
              }}
            />
          </>
        )}
        
        <TrackSearch
          onSearch={onTrackSearch}
          isLoading={isSpotifyLoading}
          tracks={spotifyTracks}
          onTrackSelect={(track) => console.log('Selected track:', track)}
        />
        
        <TrackSuggestions recommendations={recommendations} />
        
        <AudienceFeedback
          feedback={feedback}
          stats={stats}
        />
      </>
    )}
  </div>
);