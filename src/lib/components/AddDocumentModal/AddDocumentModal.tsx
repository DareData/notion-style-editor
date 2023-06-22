import {
  AddDocumentModalContent,
  AddDocumentModalContentProps,
} from './AddDocumentModalContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type AddDocumentModalProps = AddDocumentModalContentProps & ModalProps;

export const AddDocumentModal: React.FC<AddDocumentModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
  onInsert,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <AddDocumentModalContent {...{ onInsert }} />
  </Modal>
);
