import { AnimatePresence, MotionProps } from 'framer-motion';
import React from 'react';
import { createPortal } from 'react-dom';

import { ModalContextProvider } from './context/ModalContextProvider';
import { ModalBackdrop } from './ModalBackdrop';
import { ModalContainer } from './ModalContainer';
import { fadeInOut } from '../../styles/animations';

export type ControlledModalProps = React.HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  animation?: MotionProps;
  withBackdrop?: boolean;
  backdropAnimation?: MotionProps;
  closeOnOutsideClick?: boolean;
};

export const ControlledModal: React.FC<ControlledModalProps> = ({
  onOpen = () => {},
  isOpen,
  onClose = () => {},
  animation = fadeInOut,
  withBackdrop = true,
  backdropAnimation = fadeInOut,
  closeOnOutsideClick = true,
  ...rest
}) => {
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
