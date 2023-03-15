import styled from 'styled-components';

import {
  EditImageFormValues,
  useEditImageForm,
} from './hooks/useEditImageForm';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { pxToRem } from '../../styles/utils';

type EditAttributesContentProps = {
  alt: string;
  title: string;
  onAttributesEdit: (data: EditImageFormValues) => void;
};

export const EditAttributesContent: React.FC<EditAttributesContentProps> = ({
  alt,
  title,
  onAttributesEdit,
}) => {
  const { onClose } = useModalContext();
  const { handleSubmit, register } = useEditImageForm({
    alt,
    title,
  });

  const onSubmit = (data: EditImageFormValues) => {
    onAttributesEdit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ModalBodyStyled>
        <Input
          {...register('title')}
          placeholder="Add a title"
          label="Image title"
        />
        <Input
          {...register('alt')}
          label="Alt text"
          placeholder="Describe image for search optimization"
        />
      </ModalBodyStyled>
      <ModalFooter>
        <ModalActions saveButtonType="submit" />
      </ModalFooter>
    </form>
  );
};

const ModalBodyStyled = styled(ModalBody)`
  padding-top: ${pxToRem(32)};
`;
