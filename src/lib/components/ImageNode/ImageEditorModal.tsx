import styled, { useTheme } from 'styled-components';

import {
  ImageEditorModalContent,
  ImageEditorModalContentProps,
} from './ImageEditorModalContent';
import { Button, ButtonProps } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { ControlledModal } from '../../common/Modal/ControlledModal';
import { useToggler } from '../../hooks/useToggler';
import { pxToRem } from '../../styles/utils';

type ImageEditorModalProps = {
  imageWidth: number;
  imageHeight: number;
} & ImageEditorModalContentProps;

export const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  imageWidth,
  imageHeight,
  ...rest
}) => {
  const { colors } = useTheme();
  const modal = useToggler();

  const isImageSmall = imageHeight < 100 || imageWidth < 100;

  const $top = isImageSmall ? pxToRem(0) : pxToRem(8);
  const $right = isImageSmall ? pxToRem(-38) : pxToRem(8);

  return (
    <>
      <ButtonStyled
        {...{ $top, $right }}
        oval
        onClick={modal.on}
        variant="contained"
        space="small"
      >
        <Icon icon="edit" fill={colors.lightBlack} />
      </ButtonStyled>
      <ControlledModal
        isOpen={modal.state}
        onOpen={modal.on}
        onClose={modal.off}
      >
        <ImageEditorModalContent {...rest} />
      </ControlledModal>
    </>
  );
};

type ButtonStyledProps = ButtonProps & { $top: string; $right: string };
const ButtonStyled = styled<React.FC<ButtonStyledProps>>(Button)`
  position: absolute;
  top: ${props => props.$top};
  right: ${props => props.$right};
  display: flex;
  align-items: center;
`;
