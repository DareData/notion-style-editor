import { HTMLMotionProps, motion } from 'framer-motion';
import { useRef } from 'react';

import { useModalContext } from './context/useModalContext';

type ModalContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  animation?: HTMLMotionProps<'div'>;
  closeOnOutsideClick: boolean;
};

export const ModalContainer: React.FC<ModalContainerProps> = ({
  children,
  animation,
  closeOnOutsideClick,
  ...rest
}) => {
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { onClose } = useModalContext();

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
    <div
      {...rest}
      onClick={onContainerClick}
      className="modal-container"
      ref={containerRef}
      data-modal>
      <motion.div
        {...(animation || {})}
        ref={modalBodyRef}
        className="modal-box">
        {children}
      </motion.div>
    </div>
  );
};
