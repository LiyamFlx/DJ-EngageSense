import { useState, useCallback } from 'react';

interface ErrorState {
  hasError: boolean;
  error: Error | null;
}

export const useErrorBoundary = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    error: null,
  });

  const handleError = useCallback((error: Error) => {
    console.error('Error caught by boundary:', error);
    setErrorState({ hasError: true, error });
  }, []);

  const resetError = useCallback(() => {
    setErrorState({ hasError: false, error: null });
  }, []);

  return {
    ...errorState,
    handleError,
    resetError,
  };
};