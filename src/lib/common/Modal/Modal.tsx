import { useCallback } from 'react';

import { ControlledModal } from './ControlledModal';
import { useToggler } from '../../hooks/useToggler';

export type ModalOpenerHandlerComponent = React.FC<{
  onOpen: () => void;
}>;

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  handler: ModalOpenerHandlerComponent;
  onModalOpen?: () => void;
  onModalClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({
  handler: Handler,
  onModalOpen,
  onModalClose,
  ...rest
}) => {
  const { state: isOpen, on, off } = useToggler(false);

  const onOpen = useCallback(() => {
    onModalOpen?.();
    on();
  }, [onModalOpen, on]);

  const onClose = useCallback(() => {
    onModalClose?.();
    off();
  }, [onModalClose, off]);

  return (
    <>
      <Handler {...{ onOpen }} />
      <ControlledModal {...{ isOpen }} {...{ onOpen, onClose }} {...rest} />
    </>
  );
};
