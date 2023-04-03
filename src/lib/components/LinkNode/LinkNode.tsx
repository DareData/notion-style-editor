import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { GoogleSlidesLink } from './GoogleSlidesLink';
import { Matcher } from '../../utils/Matcher';
import { useGoogleDocValidation } from '../AddGoogleSlidesModal/hooks/useGoogleDocValidation';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const LinkNode: React.FC = () => {
  const {
    node: { attrs },
    contentRef,
  } = useNodeViewContext();

  const { mode } = useTextEditorModeContext();

  const { validateGoogleSlides } = useGoogleDocValidation();

  const { href } = attrs;
  const isGoogleSlidesLink = validateGoogleSlides(href);

  const onContentClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    Matcher(mode).match('preview', () => {
      e.preventDefault();
      window.open(href, '_blank');
    });
  };

  return (
    <>
      <SpanStyled
        ref={contentRef}
        onClick={onContentClick}
        $isPreview={mode === 'preview'}
      />
      {isGoogleSlidesLink && <GoogleSlidesLink {...{ href }} />}
    </>
  );
};

const SpanStyled = styled.span<{ $isPreview: boolean }>`
  cursor: ${props => (props.$isPreview ? 'pointer' : 'text')};
`;
