import React from 'react';
import { Search, Play, Music, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ActionMenuProps {
  onSearch: () => void;
  onPlay: () => void;
  onSelect: () => void;
  onEnergyVote: (type: 'up' | 'down') => void;
}

export const ActionMenu: React.FC<ActionMenuProps> = ({
  onSearch,
  onPlay,
  onSelect,
  onEnergyVote,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      <div className="dropdown relative group">
        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
          <Music className="w-5 h-5" />
          <span>Track Controls</span>
        </button>
        <div className="hidden group-hover:block absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg">
          <button
            onClick={onSearch}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10"
          >
            <Search className="w-4 h-4" />
            Search Track
          </button>
          <button
            onClick={onPlay}
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-white/10"
          >
            <Play className="w-4 h-4" />
            Play Preview
          </button>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEnergyVote('up')}
          className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors"
          title="Increase energy level"
        >
          <ThumbsUp className="w-5 h-5" />
          Energy Up
        </button>
        <button
          onClick={() => onEnergyVote('down')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors"
          title="Decrease energy level"
        >
          <ThumbsDown className="w-5 h-5" />
          Cool Down
        </button>
      </div>
    </div>
  );
};