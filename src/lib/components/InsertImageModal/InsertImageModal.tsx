import {
  InsertImageContent,
  InsertImageContentProps,
} from './InsertImageContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type InsertImageModalProps = InsertImageContentProps & ModalProps;

export const InsertImageModal: React.FC<InsertImageModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
  onInsert,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <InsertImageContent {...{ onInsert }} />
  </Modal>
);
