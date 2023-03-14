import { InsertImageContent } from './InsertImageContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type InsertImageModalProps = Pick<ModalProps, 'handler'>;

export const InsertImageModal: React.FC<InsertImageModalProps> = ({
  handler,
}) => (
  <Modal {...{ handler }}>
    <InsertImageContent />
  </Modal>
);
