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
      <span ref={contentRef} />
      {isGoogleSlidesLink && <GoogleSlidesLink {...{ href }} />}
    </>
  );
};
