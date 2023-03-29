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
  className?: string;
  withCancel?: boolean;
  saveButtonType?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
};

export const ModalActions: React.FC<Partial<ModalActionsProps>> = ({
  loading,
  saveText,
  className = '',
  isDisabled,
  cancelText,
  withCancel = true,
  onSaveClick,
  onCancelClick,
  saveButtonType = 'button',
}) => {
  const { onClose } = useModalContext();

  return (
    <ModalActionsStyled {...{ className }}>
      {withCancel && (
        <Button
          color="secondary"
          variant="outlined"
          type={saveButtonType}
          onClick={onCancelClick || onClose}
          oval
          {...{ loading }}
        >
          {cancelText || 'Cancel'}
        </Button>
      )}
      <Button
        color="primary"
        variant="contained"
        type={saveButtonType}
        oval
        onClick={onSaveClick ? e => onSaveClick(e, onClose) : undefined}
        disabled={isDisabled}
        {...{ loading }}
      >
        {saveText || 'Save'}
      </Button>
    </ModalActionsStyled>
  );
};

const ModalActionsStyled = styled.div`
  display: flex;
  gap: ${pxToRem(8)};
  justify-content: flex-end;
  align-items: center;
`;
