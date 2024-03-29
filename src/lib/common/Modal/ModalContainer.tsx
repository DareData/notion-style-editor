import { HTMLMotionProps, motion } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

import { useModalContext } from './context/useModalContext';
import { useBodyKeyDown } from '../../hooks/useBodyKeyDown';
import { theme } from '../../styles/theme';
import { pxToRem } from '../../styles/utils';
import { Button } from '../Button';
import { Icon } from '../Icon/Icon';

type ModalContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: HTMLMotionProps<'div'>;
  withCloseIcon: boolean;
  closeOnOutsideClick: boolean;
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  animation,
  withCloseIcon,
  closeOnOutsideClick,
  ...rest
}) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { onClose } = useModalContext();
  useBodyKeyDown({ Escape: onClose });

  const onContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { current: body } = modalBodyRef;
    const { current: container } = containerRef;
    const element = e.target as HTMLElement;

    if (element.closest('[data-modal]') !== container) {
      return;
    }

    if (!body?.contains(element) && closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <ModalContainerStyled
      {...rest}
      onClick={onContainerClick}
      ref={containerRef}
      data-modal
    >
      <ModalBoxStyled {...(animation || {})} ref={modalBodyRef}>
        <>
          {withCloseIcon && (
            <CloseButtonStyled onClick={onClose} oval color="secondary">
              <Icon icon="close" />
            </CloseButtonStyled>
          )}
          {children}
        </>
      </ModalBoxStyled>
    </ModalContainerStyled>
  );
};

const ModalContainerStyled = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: ${props => props.theme.zIndexes.modal.container};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow-y: auto;

  & > div::before {
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    transition: 0.3s background-color ease;
    content: '';
  }

  &:not(:last-of-type) > div::before {
    z-index: ${props => props.theme.zIndexes.modal.container};
    background-color: ${props =>
      props.theme.components.modal.backdrop.background};
  }
`;

export const ModalBoxStyled = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  font-size: ${pxToRem(16)};
  background-color: ${props => props.theme.colors.white};

  @media (min-width: ${theme.queries.laptop}) {
    width: ${pxToRem(480)};
    height: auto;
    max-height: auto;
    border-radius: ${pxToRem(12)};
    box-shadow: 0 25px 50px -12px ${props => props.theme.components.modal.backdrop.background};
  }
`;

export const CloseButtonStyled = styled(Button)`
  position: absolute;
  top: ${pxToRem(16)};
  right: ${pxToRem(16)};
  padding: ${pxToRem(4)};
  z-index: 2;
`;
