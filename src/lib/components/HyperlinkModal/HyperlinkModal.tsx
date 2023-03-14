import {
  HyperlinkModalContent,
  HyperlinkModalContentProps,
} from './HyperlinkModalContent';
import { Modal, ModalProps } from '../../common/Modal/Modal';

type HyperlinkModalProps = HyperlinkModalContentProps &
  Pick<ModalProps, 'handler'>;

export const HyperlinkModal: React.FC<HyperlinkModalProps> = ({
  handler,
  ...rest
}) => {
  return (
    <Modal {...{ handler }}>
      <HyperlinkModalContent {...rest} />
    </Modal>
  );
};
