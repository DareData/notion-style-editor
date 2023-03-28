import { LinkContent, LinkContentProps } from './HyperlinkModalContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type LinkModalProps = ModalProps & LinkContentProps;

export const LinkModal: React.FC<LinkModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
  ...rest
}) => {
  return (
    <Modal {...{ handler, onModalOpen, onModalClose }}>
      <LinkContent {...rest} />
    </Modal>
  );
};
