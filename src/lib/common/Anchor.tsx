import styled, { css } from 'styled-components';

import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';
import { Matcher } from '../utils/Matcher';

type AnchorColor = 'primary';
type AnchorVariant = 'text' | 'button';
type AnchorSpace = 'no' | 'thin' | 'small' | 'normal';

type AnchorOptions = {
  oval?: boolean;
  space?: AnchorSpace;
  color?: AnchorColor;
  variant?: AnchorVariant;
};

type AnchorProps = AnchorOptions & {
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Anchor: React.FC<AnchorProps> = ({
  oval = false,
  space = 'no',
  color = 'primary',
  variant = 'text',
  children,
  target = '_blank',
  ...rest
}) => (
  <AnchorStyled
    {...{ target }}
    $space={space}
    $color={color}
    $variant={variant}
    $oval={oval}
    {...rest}
  >
    {children}
  </AnchorStyled>
);

const getAnchorEffectColorsMap = (variant: AnchorVariant) =>
  Matcher(variant)
    .match('button', () => ({
      bg: {
        primary: 'transparent',
      },
      border: {
        primary: theme.colors.green,
      },
      color: {
        primary: theme.colors.green,
      },
    }))
    .getOrElse(() => ({
      bg: {
        primary: 'transparent',
      },
      border: {
        primary: 'transparent',
      },
      color: {
        primary: theme.colors.green,
      },
    }));

const getAnchorColorsMap = (variant: AnchorVariant) =>
  Matcher(variant)
    .match('button', () => ({
      idle: {
        bg: {
          primary: 'transparent',
        },
        border: {
          primary: 'transparent',
        },
        color: {
          primary: theme.colors.lightBlack,
        },
      },
      hover: getAnchorEffectColorsMap(variant),
      focus: getAnchorEffectColorsMap(variant),
    }))
    .getOrElse(() => ({
      idle: {
        bg: {
          primary: 'transparent',
        },
        border: {
          primary: 'transparent',
        },
        color: {
          primary: theme.colors.lightBlack,
        },
      },
      hover: getAnchorEffectColorsMap(variant),
      focus: getAnchorEffectColorsMap(variant),
    }));

const anchorSpaceMap = {
  no: 0,
  thin: pxToRem(4),
  small: pxToRem(7),
  normal: `${pxToRem(10)} ${pxToRem(16)};`,
};

const AnchorStyled = styled.a<{
  $space: AnchorSpace;
  $variant: AnchorVariant;
  $color: AnchorColor;
  $oval: boolean;
}>`
  background-color: ${props =>
    getAnchorColorsMap(props.$variant).idle.bg[props.$color]};
  border: 1px solid
    ${props => getAnchorColorsMap(props.$variant).idle.border[props.$color]};
  color: ${props =>
    getAnchorColorsMap(props.$variant).idle.color[props.$color]};
  outline: 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in, border-color 0.2s ease-in,
    color 0.2s ease-in;
  padding: ${props => anchorSpaceMap[props.$space]};

  ${props =>
    props.$variant === 'button' &&
    css`
      display: flex;
      align-items: center;
      justify-content: center;
    `};

  ${props =>
    props.$oval &&
    css`
      border-radius: ${pxToRem(8)};
    `}

  &:hover {
    color: ${props =>
      getAnchorColorsMap(props.$variant).hover.color[props.$color]};
    background-color: ${props =>
      getAnchorColorsMap(props.$variant).hover.bg[props.$color]};
    border: 1px solid
      ${props => getAnchorColorsMap(props.$variant).hover.border[props.$color]};
  }

  &:focus {
    color: ${props =>
      getAnchorColorsMap(props.$variant).focus.color[props.$color]};
    background-color: ${props =>
      getAnchorColorsMap(props.$variant).focus.bg[props.$color]};
    border: 1px solid
      ${props => getAnchorColorsMap(props.$variant).focus.border[props.$color]};
  }
`;
