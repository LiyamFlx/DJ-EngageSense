import { useState, useEffect } from 'react';
import { AudienceFeedbackService } from '../services/websocket/audienceFeedback';
import { FeedbackItem } from '../types/audience';

export const useAudienceFeedback = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState({ positive: 0, negative: 0 });

  useEffect(() => {
    const service = new AudienceFeedbackService();
    service.connect();

    service.subscribeFeedback((newFeedback) => {
      setFeedback(prev => [newFeedback, ...prev].slice(0, 50));
      
      if (newFeedback.type === 'reaction') {
        setStats(prev => ({
          ...prev,
          positive: prev.positive + (newFeedback.content === '👍' ? 1 : 0),
          negative: prev.negative + (newFeedback.content === '👎' ? 1 : 0),
        }));
      }
    });

    return () => {
      service.disconnect();
    };
  }, []);

  return { feedback, stats };
};