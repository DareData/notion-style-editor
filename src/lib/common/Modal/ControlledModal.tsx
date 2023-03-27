import { AnimatePresence, MotionProps } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { ModalContextProvider } from './context/ModalContextProvider';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalContainer } from './ModalContainer';
import { useBodyLockOverflow } from '../../hooks/useBodyLockOverflow';
import { fadeInOut } from '../../styles/common/animations';

export type ControlledModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  animation?: MotionProps;
  withBackdrop?: boolean;
  withCloseIcon?: boolean;
  backdropAnimation?: MotionProps;
  closeOnOutsideClick?: boolean;
};

export const ControlledModal: React.FC<ControlledModalProps> = ({
  onOpen = () => {},
  isOpen,
  onClose = () => {},
  animation = fadeInOut,
  withBackdrop = true,
  withCloseIcon = true,
  backdropAnimation = fadeInOut,
  closeOnOutsideClick = true,
  ...rest
}) => {
  useBodyLockOverflow({
    isLock: isOpen,
  });

  const textEditorRef = document.querySelector('.date-data_text-editor');

  if (!textEditorRef) {
    return null;
  }

  return createPortal(
    <ModalContextProvider {...{ onClose, isOpen, onOpen }}>
      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            {withBackdrop && <ModalBackdrop animation={backdropAnimation} />}
            <ModalContainer
              {...rest}
              {...{
                animation,
                withCloseIcon,
                closeOnOutsideClick,
              }}
            />
          </>
        )}
      </AnimatePresence>
    </ModalContextProvider>,
    textEditorRef
  );
};
