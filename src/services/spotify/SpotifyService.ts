import { TrackDetails } from '../../types/spotify';

const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

export class SpotifyService {
  private accessToken: string | null = null;

  async initialize(clientId: string) {
    try {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientId}`,
      });

      const data = await response.json();
      this.accessToken = data.access_token;
    } catch (error) {
      console.error('Failed to initialize Spotify:', error);
      throw error;
    }
  }

  async searchTracks(query: string): Promise<TrackDetails[]> {
    if (!this.accessToken) throw new Error('Spotify not initialized');

    const response = await fetch(
      `${SPOTIFY_API_BASE}/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    const data = await response.json();
    return this.mapSpotifyTracks(data.tracks.items);
  }

  async getTrackFeatures(trackId: string) {
    if (!this.accessToken) throw new Error('Spotify not initialized');

    const response = await fetch(
      `${SPOTIFY_API_BASE}/audio-features/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    return response.json();
  }

  private mapSpotifyTracks(tracks: any[]): TrackDetails[] {
    return tracks.map(track => ({
      id: track.id,
      title: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      duration: track.duration_ms,
      previewUrl: track.preview_url,
      imageUrl: track.album.images[0]?.url,
    }));
  }
}