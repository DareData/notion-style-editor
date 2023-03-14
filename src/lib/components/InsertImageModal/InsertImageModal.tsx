import {
  InsertImageContent,
  InsertImageContentProps,
} from './InsertImageContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type InsertImageModalProps = InsertImageContentProps &
  Pick<ModalProps, 'handler'>;

export const InsertImageModal: React.FC<InsertImageModalProps> = ({
  handler,
  onInsert,
}) => (
  <Modal {...{ handler }}>
    <InsertImageContent {...{ onInsert }} />
  </Modal>
);
