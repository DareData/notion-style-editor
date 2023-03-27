import { useCallback } from 'react';

export const useGoogleDocValidation = () => {
  const validateGoogleSlides = useCallback((link: string) => {
    return link.startsWith('https://docs.google.com/presentation');
  }, []);

  return { validateGoogleSlides };
};
