import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { loadingStyles } from '../styles/common/loader.styles';
import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type ButtonColor = 'danger' | 'primary' | 'secondary';
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

const buttonColorsMap = {
  idle: {
    bg: {
      primary: theme.colors.lightGreen,
      secondary: theme.colors.white,
      danger: theme.colors.white,
    },
    border: {
      primary: 'transparent',
      secondary: theme.colors.lightGrey,
      danger: theme.colors.lightGrey,
    },
    color: {
      primary: theme.colors.lightBlack,
      secondary: theme.colors.lightBlack,
      danger: theme.colors.darkRed,
    },
  },
  hover: {
    bg: {
      primary: '#68D391',
      secondary: '#F9F9F9',
      danger: '#F9F9F9',
    },
    border: {
      primary: 'transparent',
      secondary: theme.colors.lightGrey,
      danger: theme.colors.lightGrey,
    },
    color: {
      primary: theme.colors.lightBlack,
      secondary: theme.colors.lightBlack,
      danger: theme.colors.darkRed,
    },
  },
  pressed: {
    bg: {
      primary: '#63C88A',
      secondary: '#F0F2F1',
      danger: '#F0F2F1',
    },
    border: {
      primary: 'transparent',
      secondary: theme.colors.lightGrey,
      danger: theme.colors.lightGrey,
    },
    color: {
      primary: theme.colors.lightBlack,
      secondary: theme.colors.lightBlack,
      danger: theme.colors.darkRed,
    },
  },
  disabled: {
    bg: {
      primary: '#FaFaFa',
      secondary: theme.colors.white,
      danger: theme.colors.white,
    },
    border: {
      primary: 'transparent',
      secondary: '#EaEaEa',
      danger: '#EaEaEa',
    },
    color: {
      primary: '#B6B8B7',
      secondary: '#B6B8B7',
      danger: '#B6B8B7',
    },
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
  border: ${pxToRem(1)} solid
    ${props =>
      props.$variant === 'contained' || props.$variant === 'outlined'
        ? buttonColorsMap.idle.border[props.$color]
        : 'transparent'};
  outline: 0;
  background-color: ${props =>
    props.$variant === 'contained'
      ? buttonColorsMap.idle.bg[props.$color]
      : 'transparent'};
  font-size: ${pxToRem(16)};
  font-family: ${props => props.theme.fonts.figree};
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

  ${props =>
    props.disabled
      ? css<{ $variant: ButtonVariant; $color: ButtonColor }>`
          cursor: not-allowed;
          background-color: ${props =>
            props.$variant !== 'simple_text'
              ? buttonColorsMap.disabled.bg[props.$color]
              : 'transparent'};
          color: ${props => buttonColorsMap.disabled.color[props.$color]};
          ${props =>
            (props.$variant === 'contained' || props.$variant === 'outlined') &&
            css<{ $color: ButtonColor }>`
              border-color: ${props =>
                buttonColorsMap.disabled.border[props.$color]};
            `}
        `
      : css<{ $variant: ButtonVariant; $color: ButtonColor }>`
          &:hover,
          &:focus {
            color: ${props => buttonColorsMap.hover.color[props.$color]};
            background-color: ${props =>
              props.$variant !== 'simple_text'
                ? buttonColorsMap.hover.bg[props.$color]
                : 'transparent'};
            ${props =>
              (props.$variant === 'contained' ||
                props.$variant === 'outlined') &&
              css<{ $color: ButtonColor }>`
                border-color: ${props =>
                  buttonColorsMap.hover.border[props.$color]};
              `}
          }

          &:active {
            color: ${props => buttonColorsMap.pressed.color[props.$color]};
            background-color: ${props =>
              props.$variant !== 'simple_text'
                ? buttonColorsMap.pressed.bg[props.$color]
                : 'transparent'};
            ${props =>
              (props.$variant === 'contained' ||
                props.$variant === 'outlined') &&
              css<{ $color: ButtonColor }>`
                border-color: ${props =>
                  buttonColorsMap.pressed.border[props.$color]};
              `}
          }

          &:focus-visible {
            outline: ${pxToRem(1)} solid ${props => props.theme.colors.green};
            outline-width: ${pxToRem(1)};
            outline-offset: ${pxToRem(0)};
          }
        `}
`;
