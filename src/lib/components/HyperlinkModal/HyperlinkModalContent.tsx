import styled from 'styled-components';

import {
  HyperlinkFormValues,
  useHyperlinkForm,
} from './hooks/useHyperlinkForm';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { ModalHeader } from '../../common/Modal/ModalHeader';

export type HyperlinkModalContentProps = {
  text?: string;
  href?: string;
  title?: string;
  onSave: (href: HyperlinkFormValues) => void;
};

export const HyperlinkModalContent: React.FC<HyperlinkModalContentProps> = ({
  text = '',
  href = '',
  title = '',
  onSave,
}) => {
  const { onClose } = useModalContext();

  const { formState, register, handleSubmit } = useHyperlinkForm({
    text,
    href,
    title,
  });

  const onHandleSubmit = (data: HyperlinkFormValues) => {
    onSave(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
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
        <TitleInputStyled
          label="Title"
          placeholder="Optional"
          {...register('title')}
        />
      </ModalBody>
      <ModalFooter>
        <ModalActions isDisabled={!formState.isValid} saveButtonType="submit" />
      </ModalFooter>
    </form>
  );
};

const TitleInputStyled = styled(Input)`
  margin-bottom: 0;
`;
