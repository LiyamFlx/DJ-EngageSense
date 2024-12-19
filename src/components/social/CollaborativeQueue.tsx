import React from 'react';
import { Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import { TrackDetails } from '../../types/spotify';

interface CollaborativeQueueProps {
  tracks: TrackDetails[];
  onVote: (trackId: string, vote: 'up' | 'down') => void;
}

export const CollaborativeQueue: React.FC<CollaborativeQueueProps> = ({
  tracks,
  onVote,
}) => {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2 mb-4">
        <Users className="h-5 w-5" />
        Collaborative Queue
      </h3>
      
      <div className="space-y-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white/5 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h4 className="font-semibold text-white">{track.title}</h4>
              <p className="text-white/70 text-sm">{track.artist}</p>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => onVote(track.id, 'up')}
                className="p-2 rounded-full hover:bg-green-500/20 text-green-400"
              >
                <ThumbsUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => onVote(track.id, 'down')}
                className="p-2 rounded-full hover:bg-red-500/20 text-red-400"
              >
                <ThumbsDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};