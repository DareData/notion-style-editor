import { useMemo } from 'react';

type UseGoogleSlidesHrefProps = {
  href?: string;
};

export const useGoogleSlidesHref = ({ href }: UseGoogleSlidesHrefProps) => {
  const iframeUrl = useMemo(() => {
    if (!href) {
      return null;
    }
    return href.replace('pub', 'embed');
  }, [href]);

  return iframeUrl;
};
