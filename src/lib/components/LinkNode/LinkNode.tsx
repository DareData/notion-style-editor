import { useNodeViewContext } from '@prosemirror-adapter/react';

import { GoogleSlidesLink } from './GoogleSlidesLink';
import { useGoogleDocValidation } from '../AddGoogleSlidesModal/hooks/useGoogleDocValidation';

export const LinkNode: React.FC = () => {
  const {
    node: { attrs },
    contentRef,
  } = useNodeViewContext();

  const { validateGoogleSlides } = useGoogleDocValidation();

  const { href } = attrs;
  const isGoogleSlidesLink = validateGoogleSlides(href);

  return (
    <>
      <a ref={contentRef} {...{ href }} target="_blank" />
      {isGoogleSlidesLink && <GoogleSlidesLink {...{ href }} />}
    </>
  );
};
