import { css } from 'styled-components';

import FigtreeBlack from './Figtree-Black.ttf';
import FigtreeBlackItalic from './Figtree-BlackItalic.ttf';
import FigtreeBold from './Figtree-Bold.ttf';
import FigtreeBoldItalic from './Figtree-BoldItalic.ttf';
import FigtreeExtraBold from './Figtree-ExtraBold.ttf';
import FigtreeExtraBoldItalic from './Figtree-ExtraBoldItalic.ttf';
import FigtreeRegularItalic from './Figtree-Italic.ttf';
import FigtreeLight from './Figtree-Light.ttf';
import FigtreeLightItalic from './Figtree-LightItalic.ttf';
import FigtreeMedium from './Figtree-Medium.ttf';
import FigtreeMediumItalic from './Figtree-MediumItalic.ttf';
import FigtreeRegular from './Figtree-Regular.ttf';
import FigtreeSemiBold from './Figtree-SemiBold.ttf';
import FigtreeSemiBoldItalic from './Figtree-SemiBoldItalic.ttf';

export const Figtree = css`
  @font-face {
    font-weight: 300;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeLight}) format('truetype');
  }

  @font-face {
    font-weight: 300;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeLightItalic}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeRegular}) format('truetype');
  }

  @font-face {
    font-weight: 400;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeRegularItalic}) format('truetype');
  }

  @font-face {
    font-weight: 500;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeMedium}) format('truetype');
  }

  @font-face {
    font-weight: 500;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeMediumItalic}) format('truetype');
  }

  @font-face {
    font-weight: 600;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeSemiBold}) format('truetype');
  }

  @font-face {
    font-weight: 600;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeSemiBoldItalic}) format('truetype');
  }

  @font-face {
    font-weight: 700;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeBold}) format('truetype');
  }

  @font-face {
    font-weight: 700;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeBoldItalic}) format('truetype');
  }

  @font-face {
    font-weight: 800;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeExtraBold}) format('truetype');
  }

  @font-face {
    font-weight: 800;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeExtraBoldItalic}) format('truetype');
  }

  @font-face {
    font-weight: 900;
    font-family: Figtree;
    font-style: normal;
    src: local('Figtree'), url(${FigtreeBlack}) format('truetype');
  }

  @font-face {
    font-weight: 900;
    font-family: Figtree;
    font-style: italic;
    src: local('Figtree'), url(${FigtreeBlackItalic}) format('truetype');
  }
`;
