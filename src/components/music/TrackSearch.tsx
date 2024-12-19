// Update the tracks prop to have a default value
export const TrackSearch: React.FC<TrackSearchProps> = ({
  onSearch,
  isLoading,
  tracks = [], // Add default empty array
  onTrackSelect,
}) => {
  // Component logic...
};