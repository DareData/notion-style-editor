import { ControlledModal } from './ControlledModal';
import { useToggler } from '../../hooks/useToggler';

export type ModalOpenerHandlerComponent = React.FC<{
  onOpen: () => void;
}>;

export type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
  handler: ModalOpenerHandlerComponent;
};

export const Modal: React.FC<ModalProps> = ({ handler: Handler, ...rest }) => {
  const { state: isOpen, on: onOpen, off: onClose } = useToggler(false);

  return (
    <>
      <Handler {...{ onOpen }} />
      <ControlledModal {...{ isOpen, onOpen, onClose }} {...rest} />
    </>
  );
};
