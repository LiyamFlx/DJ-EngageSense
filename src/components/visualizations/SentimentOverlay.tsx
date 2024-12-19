import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/Card';

interface SentimentOverlayProps {
  sentiment: {
    score: number;
    trend: 'rising' | 'falling' | 'stable';
    prediction: string;
  };
}

export const SentimentOverlay: React.FC<SentimentOverlayProps> = ({ sentiment }) => {
  const getColor = (score: number) => {
    if (score > 75) return 'bg-green-500';
    if (score > 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="p-4">
      <div className="relative h-24">
        <motion.div
          className={`absolute inset-0 rounded-lg opacity-20 ${getColor(sentiment.score)}`}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white">{sentiment.score}%</h3>
            <p className="text-sm text-white/70">Crowd Sentiment</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className={`text-xs ${
                sentiment.trend === 'rising' ? 'text-green-400' :
                sentiment.trend === 'falling' ? 'text-red-400' :
                'text-yellow-400'
              }`}>
                {sentiment.trend === 'rising' ? '↑' :
                 sentiment.trend === 'falling' ? '↓' : '→'}
                {sentiment.prediction}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};