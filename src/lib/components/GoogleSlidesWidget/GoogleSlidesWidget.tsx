import { useWidgetViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { useGoogleSlidesHref } from './hooks/useGoogleSlidesHref';
import { theme } from '../../styles/theme';
import { pxToRem } from '../../styles/utils';

export const GoogleSlidesWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();

  const { href } = spec as { href: string };

  const iframeUrl = useGoogleSlidesHref({ href });

  if (!iframeUrl) {
    return null;
  }

  return <IFrameStyled src={iframeUrl} />;
};

const IFrameStyled = styled.iframe`
  display: block;
  width: 100%;
  height: ${pxToRem(200)};

  @media (min-width: ${theme.queries.laptop}) {
    height: ${pxToRem(388)};
  }
`;
