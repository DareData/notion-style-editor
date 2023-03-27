import { InsertGoogleDocContent } from './InsertGoogleDocContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type InsertGoogleDocModalProps = ModalProps;

export const InsertGoogleDocModal: React.FC<InsertGoogleDocModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <InsertGoogleDocContent />
  </Modal>
);
