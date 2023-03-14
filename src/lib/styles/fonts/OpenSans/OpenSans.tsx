import { css } from 'styled-components';

import OpenSansBold from './OpenSans-Bold.ttf';
import OpenSansBoldItalic from './OpenSans-BoldItalic.ttf';
import OpenSansExtraBold from './OpenSans-ExtraBold.ttf';
import OpenSansExtraBoldItalic from './OpenSans-ExtraBoldItalic.ttf';
import OpenSansLight from './OpenSans-Light.ttf';
import OpenSansLightItalic from './OpenSans-LightItalic.ttf';
import OpenSansMedium from './OpenSans-Medium.ttf';
import OpenSansMediumItalic from './OpenSans-MediumItalic.ttf';
import OpenSansSemiBold from './OpenSans-SemiBold.ttf';
import OpenSansSemiBoldItalic from './OpenSans-SemiBoldItalic.ttf';

export const OpenSans = css`
  @font-face {
    font-weight: 300;
    font-family: 'OpenSans';
    font-style: normal;
    src: local('OpenSans'), url(${OpenSansLight}) format('truetype');
  }

  @font-face {
    font-weight: 300;
    font-family: 'OpenSans';
    font-style: italic;
    src: local('OpenSans'), url(${OpenSansLightItalic}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'OpenSans';
    font-style: normal;
    src: local('OpenSans'), url(${OpenSansMedium}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: 'OpenSans';
    font-style: italic;
    src: local('OpenSans'), url(${OpenSansMediumItalic}) format('truetype');
  }

  @font-face {
    font-weight: 600;
    font-family: 'OpenSans';
    font-style: normal;
    src: local('OpenSans'), url(${OpenSansSemiBold}) format('truetype');
  }
  @font-face {
    font-weight: 600;
    font-family: 'OpenSans';
    font-style: italic;
    src: local('OpenSans'), url(${OpenSansSemiBoldItalic}) format('truetype');
  }

  @font-face {
    font-weight: 700;
    font-family: 'OpenSans';
    font-style: normal;
    src: local('OpenSans'), url(${OpenSansBold}) format('truetype');
  }
  @font-face {
    font-weight: 700;
    font-family: 'OpenSans';
    font-style: italic;
    src: local('OpenSans'), url(${OpenSansBoldItalic}) format('truetype');
  }

  @font-face {
    font-weight: 900;
    font-family: 'OpenSans';
    font-style: normal;
    src: local('OpenSans'), url(${OpenSansExtraBold}) format('truetype');
  }
  @font-face {
    font-weight: 900;
    font-family: 'OpenSans';
    font-style: italic;
    src: local('OpenSans'), url(${OpenSansExtraBoldItalic}) format('truetype');
  }
`;
