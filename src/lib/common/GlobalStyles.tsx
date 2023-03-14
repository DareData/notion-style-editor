import { createGlobalStyle } from 'styled-components';

import { Fonts } from '../styles/fonts/Fonts';

export const GlobalStyles = createGlobalStyle`
	* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: ${props => props.theme.colors.lightBlack};
    font-family: ${props => props.theme.fonts.primary};
  }
	.tippy-box {
    background-color: transparent;
  }
  .tippy-content {
    padding: 0;
  }
  ${Fonts}
`;
