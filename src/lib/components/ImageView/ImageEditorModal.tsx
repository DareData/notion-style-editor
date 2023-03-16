import styled, { useTheme } from 'styled-components';

import {
  ImageEditorModalContent,
  ImageEditorModalContentProps,
} from './ImageEditorModalContent';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { Modal } from '../../common/Modal/Modal';
import { pxToRem } from '../../styles/utils';

type ImageEditorModalProps = ImageEditorModalContentProps;

export const ImageEditorModal: React.FC<ImageEditorModalProps> = props => {
  const { colors } = useTheme();

  return (
    <ImageEditorContainerModalStyled>
      <Modal
        handler={({ onOpen }) => (
          <ButtonStyled oval onClick={onOpen} variant="contained" space="small">
            <Icon icon="edit" fill={colors.lightBlack} />
          </ButtonStyled>
        )}
      >
        <ImageEditorModalContent {...props} />
      </Modal>
    </ImageEditorContainerModalStyled>
  );
};

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
  font-size: ${pxToRem(14)};
`;
