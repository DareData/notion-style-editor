import { useCallback, useEffect, useState } from 'react';

const getMatches = (query: string) => {
  if (typeof window !== 'undefined') {
    return window.matchMedia(query).matches;
  }
  return false;
};

type UseMatchMediaProps = {
  query: string;
};

export const useMatchMedia = ({ query }: UseMatchMediaProps) => {
  const [matches, setMatches] = useState(getMatches(query));

  const onMediaChange = useCallback((query: string) => {
    setMatches(getMatches(query));
  }, []);

  useEffect(() => {
    const onMediaChangeRef = () => onMediaChange(query);

    const matchMedia = window.matchMedia(query);
    onMediaChangeRef();

    matchMedia.addEventListener('change', onMediaChangeRef);

    return () => {
      matchMedia.removeEventListener('change', onMediaChangeRef);
    };
  }, [query, onMediaChange]);

  return matches;
};
