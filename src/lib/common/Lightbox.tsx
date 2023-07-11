import styled from 'styled-components';

import { Image, ImageStyled } from './Image';
import { ControlledModal } from './Modal/ControlledModal';
import { CloseButtonStyled, ModalBoxStyled } from './Modal/ModalContainer';
import { theme } from '../styles/theme';
import { pxToRem } from '../styles/utils';

type LightboxProps = {
  src: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const Lightbox: React.FC<LightboxProps> = ({ src, ...rest }) => {
  return (
    <ControlledModalStyled {...rest}>
      <LightboxImageStyled {...{ src }} />
    </ControlledModalStyled>
  );
};

const ControlledModalStyled = styled(ControlledModal)`
  ${ModalBoxStyled} {
    @media (min-width: ${theme.queries.laptop}) {
      width: auto;
    }
  }

  ${CloseButtonStyled} {
    svg {
      width: ${pxToRem(30)};
      height: ${pxToRem(30)};
      fill: ${props => props.theme.colors.white};
    }

    &:hover {
      background-color: transparent;
    }
  }
`;

const LightboxImageStyled = styled(Image)`
  height: 100%;
  width: 100%;

  @media (min-width: ${theme.queries.laptop}) {
    width: auto;
    height: auto;
  }

  ${ImageStyled} {
    max-width: 100vw;
    max-height: 100vh;

    @media (min-width: ${theme.queries.laptop}) {
      max-width: 90vw;
      max-height: 90vh;
    }
  }
`;
