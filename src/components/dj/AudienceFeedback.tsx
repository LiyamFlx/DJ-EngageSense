import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';

interface FeedbackItem {
  id: string;
  type: 'reaction' | 'comment';
  content: string;
  timestamp: number;
}

export const AudienceFeedback: React.FC = () => {
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [reactionStats, setReactionStats] = useState({
    positive: 0,
    negative: 0
  });
  
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    // Simulate real-time feedback
    intervalRef.current = setInterval(() => {
      const newFeedback: FeedbackItem = {
        id: Math.random().toString(36).substr(2, 9),
        type: Math.random() > 0.5 ? 'reaction' : 'comment',
        content: Math.random() > 0.5 ? '🔥' : 'Great vibes!',
        timestamp: Date.now()
      };

      setFeedback(prev => [newFeedback, ...prev].slice(0, 50));
      
      if (newFeedback.type === 'reaction') {
        setReactionStats(prev => ({
          ...prev,
          positive: prev.positive + (Math.random() > 0.3 ? 1 : 0),
          negative: prev.negative + (Math.random() > 0.7 ? 1 : 0)
        }));
      }
    }, 5000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold text-white mb-6">Live Audience Feedback</h2>

      {/* Reaction Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-500/20 rounded-lg p-4 text-center">
          <ThumbsUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <span className="text-2xl font-bold text-white">{reactionStats.positive}</span>
        </div>
        <div className="bg-red-500/20 rounded-lg p-4 text-center">
          <ThumbsDown className="w-6 h-6 text-red-400 mx-auto mb-2" />
          <span className="text-2xl font-bold text-white">{reactionStats.negative}</span>
        </div>
      </div>

      {/* Live Feed */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-medium text-white">Live Feed</h3>
        </div>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {feedback.map(item => (
            <div
              key={item.id}
              className="bg-white/5 rounded-lg p-3 flex items-center justify-between"
            >
              <span className="text-white">{item.content}</span>
              <span className="text-sm text-white/60">
                {new Date(item.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};