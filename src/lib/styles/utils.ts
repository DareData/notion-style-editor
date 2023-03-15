import { css } from 'styled-components';

import { theme } from './theme';

export const pxToRem = (val: number) => `${val / theme.sizes.baseSize}rem`;

export const accessibleHide = css`
  position: absolute;
  left: -5000px;
  top: -5000px;
`;
