import { useState, useCallback } from 'react';
import { SpotifyService } from '../services/spotify/SpotifyService';
import type { TrackDetails } from '../types/spotify';

export const useSpotifyIntegration = (clientId: string) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tracks, setTracks] = useState<TrackDetails[]>([]);

  const spotifyService = new SpotifyService();

  const initialize = useCallback(async () => {
    try {
      await spotifyService.initialize(clientId);
      setIsInitialized(true);
      setError(null);
    } catch (err) {
      setError('Failed to initialize Spotify integration');
      console.error(err);
    }
  }, [clientId]);

  const searchTracks = useCallback(async (query: string) => {
    if (!isInitialized) {
      setError('Spotify not initialized');
      return;
    }

    setIsLoading(true);
    try {
      const results = await spotifyService.searchTracks(query);
      setTracks(results);
      setError(null);
    } catch (err) {
      setError('Failed to search tracks');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [isInitialized]);

  const getTrackFeatures = useCallback(async (trackId: string) => {
    if (!isInitialized) {
      setError('Spotify not initialized');
      return null;
    }

    try {
      return await spotifyService.getTrackFeatures(trackId);
    } catch (err) {
      setError('Failed to get track features');
      console.error(err);
      return null;
    }
  }, [isInitialized]);

  return {
    isInitialized,
    isLoading,
    error,
    tracks,
    initialize,
    searchTracks,
    getTrackFeatures,
  };
};