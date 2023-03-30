import { css } from 'styled-components';

import SourceCodeProRegular from './SourceCodePro-Regular.ttf';

export const SourceCodePro = css`
  @font-face {
    font-family: SourceCodePro;
    font-style: normal;
    src: local('SourceCodePro'), url(${SourceCodeProRegular}) format('truetype');
  }
`;
