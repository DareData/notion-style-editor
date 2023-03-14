import {
  HyperlinkFormValues,
  useHyperlinkForm,
} from './hooks/useHyperlinkForm';
import { Input } from '../../common/Input';
import { Modal, ModalProps } from '../../common/Modal/Modal';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';

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
  console.log('href: ', typeof href);
  const { formState, register, handleSubmit } = useHyperlinkForm({
    text,
    href,
    title,
  });

  const onHandleSubmit = (data: HyperlinkFormValues) => {
    console.log('data: ', data);
  };

  console.log('formState: ', formState.errors.href);

  return (
    <Modal {...{ handler }}>
      <ModalHeader>Add a link</ModalHeader>
      <ModalBody>
        <Input placeholder="Optional" label="Text" {...register('text')} />
        <Input
          label="Link"
          placeholder="Paste a link"
          required
          {...register('href')}
          error={formState.errors.href?.message}
        />
        <Input label="Title" placeholder="Optional" {...register('title')} />
      </ModalBody>
      <ModalFooter>
        <ModalActions
          isDisabled={!formState.isValid}
          onSaveClick={handleSubmit(onHandleSubmit)}
        />
      </ModalFooter>
    </Modal>
  );
};
