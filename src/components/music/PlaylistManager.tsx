import React from 'react';
import { List, Plus, Trash2 } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import type { TrackDetails } from '../../types/spotify';

interface PlaylistManagerProps {
  currentPlaylist: TrackDetails[];
  onAddTrack: (track: TrackDetails) => void;
  onRemoveTrack: (trackId: string) => void;
  onReorderTracks: (startIndex: number, endIndex: number) => void;
}

export const PlaylistManager: React.FC<PlaylistManagerProps> = ({
  currentPlaylist,
  onAddTrack,
  onRemoveTrack,
  onReorderTracks,
}) => (
  <Card className="p-4">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <List className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Current Playlist</h3>
      </div>
      <span className="text-sm text-white/70">{currentPlaylist.length} tracks</span>
    </div>

    <div className="space-y-2 max-h-96 overflow-y-auto">
      {currentPlaylist.map((track, index) => (
        <div
          key={track.id}
          className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
          draggable
          onDragStart={(e) => e.dataTransfer.setData('text/plain', index.toString())}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const startIndex = parseInt(e.dataTransfer.getData('text/plain'));
            onReorderTracks(startIndex, index);
          }}
        >
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/50">{index + 1}</span>
            <div>
              <p className="font-medium text-white">{track.title}</p>
              <p className="text-sm text-white/70">{track.artist}</p>
            </div>
          </div>
          <button
            onClick={() => onRemoveTrack(track.id)}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <Trash2 className="w-4 h-4 text-red-400" />
          </button>
        </div>
      ))}
    </div>
  </Card>
);