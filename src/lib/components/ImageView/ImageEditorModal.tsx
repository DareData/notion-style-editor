import styled, { useTheme } from 'styled-components';

import {
  ImageEditorModalContent,
  ImageEditorModalContentProps,
} from './ImageEditorModalContent';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { ControlledModal } from '../../common/Modal/ControlledModal';
import { useToggler } from '../../hooks/useToggler';
import { pxToRem } from '../../styles/utils';

type ImageEditorModalProps = ImageEditorModalContentProps;

export const ImageEditorModal: React.FC<ImageEditorModalProps> = props => {
  const { colors } = useTheme();
  const modal = useToggler();

  return (
    <>
      <ButtonStyled oval onClick={modal.on} variant="contained" space="small">
        <Icon icon="edit" fill={colors.lightBlack} />
      </ButtonStyled>
      <ControlledModal
        isOpen={modal.state}
        onOpen={modal.on}
        onClose={modal.off}
      >
        <ImageEditorModalContent {...props} />
      </ControlledModal>
    </>
  );
};

const ButtonStyled = styled(Button)`
  position: absolute;
  top: ${pxToRem(8)};
  right: ${pxToRem(8)};
  display: flex;
  align-items: center;
`;
