import { css, keyframes } from 'styled-components';

const spinAnimation = keyframes`
	0% {
		transform: rotate(0deg)
	}
	100% {
		transform: rotate(360deg)
	}
`;

const pseudoElementStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  content: '';
`;

export const loadingStyles = css`
  &:before {
    border: 2px solid rgba(0, 0, 0, 0.15);
    transform: translate(-50%, -50%);
    ${pseudoElementStyles}
  }
  &:after {
    margin: -12px 0 0 -12px;
    ${pseudoElementStyles}
    border-color: #68D391 transparent transparent;
    border-style: solid;
    border-width: 2px;
    box-shadow: 0px 0px 0px 1px transparent;
    animation: 0.75s linear ${spinAnimation} infinite;
  }
`;
