import styled from 'styled-components';

import {
  ImageEditorFormValues,
  useImageEditorForm,
} from './hooks/useImageEditorForm';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { useModalContext } from '../../common/Modal/context/useModalContext';
import { ModalActions } from '../../common/Modal/ModalActions';
import { ModalBody } from '../../common/Modal/ModalBody';
import { ModalFooter } from '../../common/Modal/ModalFooter';
import { pxToRem } from '../../styles/utils';

export type ImageEditorModalContentProps = {
  alt: string;
  title: string;
  onImageEdit: (data: ImageEditorFormValues) => void;
  onImageRemove: () => void;
};

export const ImageEditorModalContent: React.FC<
  ImageEditorModalContentProps
> = ({ alt, title, onImageEdit, onImageRemove }) => {
  const { onClose } = useModalContext();
  const { handleSubmit, register } = useImageEditorForm({
    alt,
    title,
  });

  const onSubmit = (data: ImageEditorFormValues) => {
    onImageEdit(data);
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
      <ModalFooterStyled>
        <Button oval onClick={onImageRemove} color="danger" variant="outlined">
          Remove image
        </Button>
        <ModalActions saveButtonType="submit" />
      </ModalFooterStyled>
    </form>
  );
};

const ModalBodyStyled = styled(ModalBody)`
  padding-top: ${pxToRem(32)};
`;

const ModalFooterStyled = styled(ModalFooter)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
