import { Modal, ModalProps } from '../common/Modal/Modal';

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
      <div className="modal-header">Add a link</div>
      <div className="modal-body">
        <input value={text} placeholder="Optional" />
        <input value={href} placeholder="Paste a link" />
        <input value={title} placeholder="Optional" />
      </div>
      <div className="modal-footer">
        <button onClick={() => onSave(href)}>Save</button>
      </div>
    </Modal>
  );
};
