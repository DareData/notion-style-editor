import { AddGoogleSlidesForm } from './AddGoogleSlidesForm';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type AddGoogleSlidesModalProps = ModalProps;

export const AddGoogleSlidesModal: React.FC<AddGoogleSlidesModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <AddGoogleSlidesForm />
  </Modal>
);
