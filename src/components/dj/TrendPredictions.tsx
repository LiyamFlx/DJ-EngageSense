import React from 'react';
import { TrendingUp, Clock, Music, Zap } from 'lucide-react';
import { TrendPrediction } from '../../types/predictions';

interface TrendPredictionsProps {
  predictions: TrendPrediction;
}

export const TrendPredictions: React.FC<TrendPredictionsProps> = ({ predictions }) => {
  const timeUntilPeak = Math.max(0, predictions.predictedPeak - Date.now()) / 1000;
  
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
        <TrendingUp className="h-5 w-5" />
        Trend Predictions
      </h3>

      <div className="grid gap-6">
        {/* Momentum Indicator */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white/70">Current Momentum</span>
            <span className={`font-medium ${
              predictions.currentMomentum > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {predictions.currentMomentum > 0 ? '+' : ''}{predictions.currentMomentum}%
            </span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div
              className={`h-2 rounded-full ${
                predictions.currentMomentum > 0 ? 'bg-green-500' : 'bg-red-500'
              }`}
              style={{ width: `${Math.abs(predictions.currentMomentum)}%` }}
            />
          </div>
        </div>

        {/* Next Peak Prediction */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-purple-400" />
            <span className="text-white/70">Next Energy Peak</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {Math.floor(timeUntilPeak / 60)}:{String(Math.floor(timeUntilPeak % 60)).padStart(2, '0')}
          </p>
          <p className="text-sm text-white/50">
            Confidence: {predictions.confidenceScore.toFixed(0)}%
          </p>
        </div>

        {/* Genre Recommendations */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Music className="h-4 w-4 text-blue-400" />
            <span className="text-white/70">Recommended Genres</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {predictions.suggestedGenres.map((genre, index) => (
              <span
                key={genre}
                className="px-3 py-1 bg-blue-500/20 rounded-full text-sm text-blue-300"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>

        {/* Energy Forecast */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-yellow-400" />
            <span className="text-white/70">Energy Forecast</span>
          </div>
          <div className="flex items-end gap-1 h-20">
            {predictions.energyForecast.map((energy, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-yellow-500/20 to-yellow-500/40 rounded-t"
                style={{ height: `${energy}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/50">
            <span>Now</span>
            <span>+5m</span>
          </div>
        </div>
      </div>
    </div>
  );
};