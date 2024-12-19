export interface TrackDetails {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  previewUrl: string | null;
  imageUrl: string | null;
}

export interface AudioFeatures {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  timeSignature: number;
}