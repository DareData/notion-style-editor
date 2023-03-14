import styled from 'styled-components';

import { useModalContext } from './context/useModalContext';
import { pxToRem } from '../../styles/utils';
import { Button } from '../Button';

type ModalActionsProps = {
  loading?: boolean;
  saveText?: React.ReactNode;
  isDisabled?: boolean;
  cancelText?: React.ReactNode;
  onSaveClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    onClose: () => void
  ) => void;
  onCancelClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  withCancel?: boolean;
  saveButtonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const ModalActions: React.FC<Partial<ModalActionsProps>> = ({
  loading,
  saveText,
  isDisabled,
  cancelText,
  withCancel = true,
  onSaveClick,
  onCancelClick,
  saveButtonType = 'button',
}) => {
  const { onClose } = useModalContext();

  return (
    <ModalActionsStyled>
      {withCancel && (
        <CancelButtonStyled
          type={saveButtonType}
          onClick={onCancelClick || onClose}
          oval
          {...{ loading }}>
          {cancelText || 'Cancel'}
        </CancelButtonStyled>
      )}
      <SaveButtonStyled
        type={saveButtonType}
        oval
        onClick={onSaveClick ? e => onSaveClick(e, onClose) : undefined}
        disabled={isDisabled}
        {...{ loading }}>
        {saveText || 'Save'}
      </SaveButtonStyled>
    </ModalActionsStyled>
  );
};

const ModalActionsStyled = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: flex-end;
  align-items: center;
`;

const CancelButtonStyled = styled(Button)`
  padding: ${pxToRem(10)} ${pxToRem(16)};
  border-color: ${props => props.theme.components.modal.footer.cancel};
  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.white};
  }
`;

const SaveButtonStyled = styled(Button)`
  padding: ${pxToRem(10)} ${pxToRem(16)};
  background-color: ${props => props.theme.components.modal.footer.save};
  &:hover,
  &:focus {
    background-color: ${props => props.theme.components.modal.footer.save};
    border-color: ${props => props.theme.components.modal.footer.save};
  }
`;
