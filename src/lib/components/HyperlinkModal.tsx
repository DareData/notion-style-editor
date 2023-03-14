import { Modal, ModalProps } from '../common/Modal/Modal';
import { ModalActions } from '../common/Modal/ModalActions';
import { ModalBody } from '../common/Modal/ModalBody';
import { ModalFooter } from '../common/Modal/ModalFooter';
import { ModalHeader } from '../common/Modal/ModalHeader';

type HyperlinkModalProps = {
  text?: string;
  href?: string;
  title?: string;
  onSave: (href: string) => void;
} & Pick<ModalProps, 'handler'>;

export const HyperlinkModal: React.FC<HyperlinkModalProps> = ({
  text = '',
  href = '',
  title = '',
  onSave,
  handler,
}) => {
  return (
    <Modal {...{ handler }}>
      <ModalHeader>Add a link</ModalHeader>
      <ModalBody>
        <input value={text} placeholder="Optional" />
        <input value={href} placeholder="Paste a link" />
        <input value={title} placeholder="Optional" />
      </ModalBody>
      <ModalFooter>
        <ModalActions />
      </ModalFooter>
    </Modal>
  );
};
