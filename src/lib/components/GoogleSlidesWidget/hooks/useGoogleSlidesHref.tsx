import { useMemo } from 'react';

type UseGoogleSlidesHrefProps = {
  spec: { href?: string };
};

export const useGoogleSlidesHref = ({ spec }: UseGoogleSlidesHrefProps) => {
  const href = useMemo(() => {
    const { href } = spec;
    if (!href) {
      return null;
    }
    return href.replace('pub', 'embed');
  }, [spec]);

  return href;
};
