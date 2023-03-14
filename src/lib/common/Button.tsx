import { forwardRef } from 'react';
import styled from 'styled-components';

import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type ButtonProp = 'primary' | 'secondary';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  type?: 'button' | 'submit' | 'reset';
  prop?: ButtonProp;
  oval?: boolean;
  children?: React.ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = 'button', prop = 'primary', oval = false, children, ...rest },
    buttonRef
  ) => (
    <ButtonStyled
      {...{ type }}
      {...rest}
      ref={buttonRef}
      $oval={oval}
      $prop={prop}>
      {children}
    </ButtonStyled>
  )
);

const buttonColors = {
  bg: {
    hover: {
      primary: theme.colors.secondaryGrey,
      secondary: theme.colors.green,
    },
  },
  border: {
    hover: {
      primary: theme.colors.green,
      secondary: 'transparent',
    },
  },
};

const ButtonStyled = styled.button<{ $oval: boolean; $prop: ButtonProp }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${pxToRem(7)};
  background-color: transparent;
  border: ${pxToRem(1)} solid transparent;
  outline: 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in, border-color 0.2s ease-in;
  ${props =>
    props.$oval &&
    `
    border-radius: ${pxToRem(8)};
  `}

  &:hover,
  &:focus {
    background-color: ${props => buttonColors.bg.hover[props.$prop]};
    border-color: ${props => buttonColors.border.hover[props.$prop]};
  }
`;
