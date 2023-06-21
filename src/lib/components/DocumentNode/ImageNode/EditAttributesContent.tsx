import styled from 'styled-components';

import {
  ImageEditorFormValues,
  useImageEditorForm,
} from './hooks/useImageEditorForm';
import { Input } from '../../../common/Input';
import { useModalContext } from '../../../common/Modal/context/useModalContext';
import { ModalActions } from '../../../common/Modal/ModalActions';
import { ModalBody } from '../../../common/Modal/ModalBody';
import { ModalFooter } from '../../../common/Modal/ModalFooter';
import { pxToRem } from '../../../styles/utils';

type EditAttributesContentProps = {
  alt: string;
  title: string;
  onAttributesEdit: (data: ImageEditorFormValues) => void;
};

export const EditAttributesContent: React.FC<EditAttributesContentProps> = ({
  alt,
  title,
  onAttributesEdit,
}) => {
  const { onClose } = useModalContext();
  const { handleSubmit, register } = useImageEditorForm({
    alt,
    title,
  });

  const onSubmit = (data: ImageEditorFormValues) => {
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
