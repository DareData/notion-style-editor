import {
  HyperlinkModalContent,
  HyperlinkModalContentProps,
} from './HyperlinkModalContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type HyperlinkModalProps = ModalProps & HyperlinkModalContentProps;

export const HyperlinkModal: React.FC<HyperlinkModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
  ...rest
}) => {
  return (
    <Modal {...{ handler, onModalOpen, onModalClose }}>
      <HyperlinkModalContent {...rest} />
    </Modal>
  );
};
