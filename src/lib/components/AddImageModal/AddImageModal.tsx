import { AddImageContent, AddImageContentProps } from './AddImageContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type AddImageModalProps = AddImageContentProps & ModalProps;

export const AddImageModal: React.FC<AddImageModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
  onInsert,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <AddImageContent {...{ onInsert }} />
  </Modal>
);
