import styled from 'styled-components';

import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type AnchorType = 'primary' | 'anchor-button';

type AnchorProps = {
  type?: AnchorType;
  children: React.ReactNode;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const Anchor: React.FC<AnchorProps> = ({
  type = 'primary',
  children,
  ...rest
}) => (
  <AnchorStyled {...rest} $type={type}>
    {children}
  </AnchorStyled>
);

const anchorColors = {
  bg: {
    hover: {
      primary: theme.colors.secondaryGrey,
      'anchor-button': theme.colors.green,
    },
  },
  border: {
    hover: {
      primary: 'transparent',
      'anchor-button': theme.colors.green,
    },
  },
};

const AnchorStyled = styled.a<{ $type: AnchorType }>`
  background-color: transparent;
  border: 1px solid transparent;
  outline: 0;
  cursor: pointer;
  transition: background-color 0.2s ease-in, border-color 0.2s ease-in;

  ${props =>
    props.$type &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${pxToRem(7)};
    border-radius: ${pxToRem(8)};

  `}

  &:hover,
  &:focus {
    background-color: ${props => anchorColors.bg.hover[props.$type]};
    border-color: ${props => anchorColors.border.hover[props.$type]};
  }
`;
