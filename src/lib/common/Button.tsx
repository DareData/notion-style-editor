import { forwardRef } from 'react';
import styled from 'styled-components';

import { loadingStyles } from '../styles/common/loader.styles';
import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type ButtonProp = 'primary' | 'secondary' | 'as-anchor';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  prop?: ButtonProp;
  oval?: boolean;
  loading?: boolean;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      prop = 'primary',
      oval = false,
      children,
      loading = false,
      ...rest
    },
    buttonRef
  ) => (
    <ButtonStyled
      {...{ type }}
      {...rest}
      ref={buttonRef}
      $oval={oval}
      $prop={prop}
      $loading={loading}>
      {children}
    </ButtonStyled>
  )
);

const buttonColors = {
  bg: {
    hover: {
      primary: theme.colors.secondaryGrey,
      secondary: theme.colors.green,
      'as-anchor': 'transparent',
    },
  },
  border: {
    hover: {
      primary: theme.colors.green,
      secondary: 'transparent',
      'as-anchor': 'transparent',
    },
  },
  color: {
    hover: {
      primary: theme.colors.lightBlack,
      secondary: theme.colors.lightBlack,
      'as-anchor': theme.colors.green,
    },
  },
};

const ButtonStyled = styled.button<{
  $oval: boolean;
  $prop: ButtonProp;
  $loading: boolean;
}>`
  position: relative;
  display: ${props => (props.$prop === 'as-anchor' ? 'inline-flex' : 'flex')};
  align-items: center;
  justify-content: center;
  padding: ${props => (props.$prop === 'as-anchor' ? 0 : pxToRem(7))};
  background-color: transparent;
  border: ${pxToRem(1)} solid transparent;
  outline: 0;
  font-size: ${pxToRem(16)};
  color: ${props =>
    props.$loading ? 'transparent' : props.theme.colors.lightBlack};
  user-select: ${props => (props.$loading ? 'none' : 'auto')};
  pointer-events: ${props => (props.$loading ? 'none' : 'auto')};
  cursor: pointer;
  transition: background-color 0.2s ease-in, border-color 0.2s ease-in,
    color 0.2s ease-in;

  ${props => props.$loading && loadingStyles};

  &:hover,
  &:focus {
    background-color: ${props => buttonColors.bg.hover[props.$prop]};
    border-color: ${props => buttonColors.border.hover[props.$prop]};
    color: ${props => buttonColors.color.hover[props.$prop]};
  }

  ${props =>
    props.$oval &&
    `
    border-radius: ${pxToRem(8)};
  `}

  ${props =>
    props.disabled &&
    `
    opacity: .8;
    cursor: not-allowed;
  `}
`;
