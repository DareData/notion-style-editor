import { GoogleSlidesContent } from './GoogleSlidesContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type AddGoogleSlidesModalProps = ModalProps;

export const AddGoogleSlidesModal: React.FC<AddGoogleSlidesModalProps> = ({
  handler,
  onModalOpen,
  onModalClose,
}) => (
  <Modal {...{ handler, onModalOpen, onModalClose }}>
    <GoogleSlidesContent />
  </Modal>
);
