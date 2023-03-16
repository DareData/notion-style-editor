import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { loadingStyles } from '../styles/common/loader.styles';
import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type ButtonColor = 'success' | 'danger' | 'primary' | 'secondary';
type ButtonVariant = 'text' | 'simple_text' | 'contained' | 'outlined';
type ButtonSpace = 'no' | 'thin' | 'small' | 'normal';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  oval?: boolean;
  color?: ButtonColor;
  space?: ButtonSpace;
  variant?: ButtonVariant;
  loading?: boolean;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      oval = false,
      color = 'primary',
      space = 'normal',
      loading = false,
      variant = 'text',
      children,
      ...rest
    },
    buttonRef
  ) => (
    <ButtonStyled
      {...{ type }}
      {...rest}
      ref={buttonRef}
      $oval={oval}
      $color={color}
      $space={space}
      $loading={loading}
      $variant={variant}
    >
      {children}
    </ButtonStyled>
  )
);

const buttonEffectColorsMap = {
  bg: {
    danger: theme.colors.darkRed,
    primary: theme.colors.secondaryLightGrey,
    success: theme.colors.green,
    secondary: theme.colors.white,
  },
  border: {
    primary: theme.colors.lightGrey,
    danger: theme.colors.darkRed,
    success: 'transparent',
    secondary: 'transparent',
  },
  color: {
    danger: theme.colors.white,
    primary: theme.colors.lightBlack,
    success: theme.colors.lightBlack,
    secondary: theme.colors.lightBlack,
  },
};

const buttonColorsMap = {
  idle: {
    bg: {
      danger: theme.colors.white,
      primary: theme.colors.white,
      success: theme.colors.lightGreen,
      secondary: theme.colors.lightGrey,
    },
    border: {
      danger: theme.colors.lightGrey,
      primary: theme.colors.lightGrey,
      success: 'transparent',
      secondary: 'transparent',
    },
    color: {
      danger: theme.colors.darkRed,
      primary: theme.colors.lightBlack,
      success: theme.colors.lightBlack,
      secondary: theme.colors.lightBlack,
    },
  },
  hover: buttonEffectColorsMap,
  focus: {
    bg: buttonEffectColorsMap.bg,
    border: {
      ...buttonEffectColorsMap.border,
      secondary: theme.colors.green,
    },
    color: buttonEffectColorsMap.color,
  },
};

const buttonSpaceMap = {
  no: 0,
  thin: pxToRem(4),
  small: pxToRem(7),
  normal: `${pxToRem(10)} ${pxToRem(16)};`,
};

const ButtonStyled = styled.button<{
  $oval: boolean;
  $loading: boolean;
  $variant: ButtonVariant;
  $color: ButtonColor;
  $space: ButtonSpace;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props =>
    props.$variant === 'simple_text' ? 0 : buttonSpaceMap[props.$space]};
  border: ${pxToRem(1)} solid transparent;
  outline: 0;
  background-color: ${props =>
    props.$variant === 'contained'
      ? buttonColorsMap.idle.bg[props.$color]
      : 'transparent'};
  font-size: ${pxToRem(16)};
  color: ${props =>
    props.$loading ? 'transparent' : buttonColorsMap.idle.color[props.$color]};
  user-select: ${props => (props.$loading ? 'none' : 'auto')};
  pointer-events: ${props => (props.$loading ? 'none' : 'auto')};
  cursor: pointer;
  transition: background-color 0.2s ease-in,
    border-color 0.2s ease-in
      ${props =>
        props.$variant === 'simple_text' ? ',color 0.2s ease-in' : ''};

  ${props =>
    props.$oval &&
    css`
      border-radius: ${pxToRem(8)};
    `}

  ${props => props.$loading && loadingStyles};

  &:hover {
    background-color: ${props =>
      props.$variant !== 'simple_text'
        ? buttonColorsMap.hover.bg[props.$color]
        : 'transparent'};
    color: ${props => buttonColorsMap.hover.color[props.$color]};
    ${props =>
      (props.$variant === 'contained' || props.$variant === 'outlined') &&
      css<{ $color: ButtonColor }>`
        border-color: ${props => buttonColorsMap.hover.border[props.$color]};
      `}
  }
  &:focus {
    background-color: ${props =>
      props.$variant !== 'simple_text'
        ? buttonColorsMap.focus.bg[props.$color]
        : 'transparent'};
    color: ${props => buttonColorsMap.focus.color[props.$color]};
    ${props =>
      (props.$variant === 'contained' || props.$variant === 'outlined') &&
      css<{ $color: ButtonColor }>`
        border-color: ${props => buttonColorsMap.focus.border[props.$color]};
      `}
  }

  &:focus-visible {
    outline: ${pxToRem(1)} solid ${props => props.theme.colors.green};
    outline-width: ${pxToRem(1)};
    outline-offset: ${pxToRem(0)};
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.8;
      cursor: not-allowed;
    `}
`;
