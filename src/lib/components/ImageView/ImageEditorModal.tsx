import styled from 'styled-components';

import {
  ImageEditorModalContent,
  ImageEditorModalContentProps,
} from './ImageEditorModalContent';
import { Button } from '../../common/Button';
import { Modal } from '../../common/Modal/Modal';
import { pxToRem } from '../../styles/utils';

type ImageEditorModalProps = ImageEditorModalContentProps;

export const ImageEditorModal: React.FC<ImageEditorModalProps> = props => (
  <ImageEditorContainerModalStyled>
    <Modal
      handler={({ onOpen }) => (
        <ButtonStyled oval onClick={onOpen} variant="contained">
          Edit
        </ButtonStyled>
      )}
    >
      <ImageEditorModalContent {...props} />
    </Modal>
  </ImageEditorContainerModalStyled>
);

const ImageEditorContainerModalStyled = styled.div`
  position: absolute;
  top: ${pxToRem(8)};
  right: ${pxToRem(8)};
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
  z-index: 2;
`;

const ButtonStyled = styled(Button)`
  padding: ${pxToRem(8)} ${pxToRem(12)};
  font-size: ${pxToRem(14)};
`;
