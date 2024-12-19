import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useSpotifyIntegration } from '../../hooks/useSpotifyIntegration';

export const TrackSearchDialog: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { tracks, isLoading, searchTracks } = useSpotifyIntegration(
    import.meta.env.VITE_SPOTIFY_CLIENT_ID
  );

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await searchTracks(searchQuery);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white"
      >
        <Search className="w-5 h-5" />
        Search Track
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-white">Search Tracks</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for tracks..."
                className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 rounded-lg text-white"
              >
                Search
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {tracks.map(track => (
                <div
                  key={track.id}
                  className="flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{track.title}</div>
                    <div className="text-sm text-white/70">{track.artist}</div>
                  </div>
                  <button
                    onClick={() => {
                      // Handle track selection
                      setIsOpen(false);
                    }}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded-lg text-sm text-white"
                  >
                    Select
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};