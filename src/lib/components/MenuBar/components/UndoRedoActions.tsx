import { redoCommand, undoCommand } from '@milkdown/plugin-history';
import styled, { css, useTheme } from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { useHistoryDepth } from '../hooks/useHistoryDepth';

export const UndoRedoActions: React.FC = () => {
  const { colors } = useTheme();
  const { onCallCommand } = useCallEditorCommand();

  const { isRedoDisabled, isUndoDisabled } = useHistoryDepth();

  return (
    <>
      <li>
        <ButtonStyled
          onClick={() => onCallCommand(undoCommand.key)}
          oval
          disabled={isUndoDisabled}
          space="small"
          color="secondary"
        >
          <Icon
            icon="undo"
            fill={isUndoDisabled ? '#8A8A8A' : colors.lightBlack}
          />
        </ButtonStyled>
      </li>
      <li>
        <ButtonStyled
          onClick={() => onCallCommand(redoCommand.key)}
          oval
          space="small"
          disabled={isRedoDisabled}
          color="secondary"
        >
          <Icon
            icon="redo"
            fill={isRedoDisabled ? '#8A8A8A' : colors.lightBlack}
          />
        </ButtonStyled>
      </li>
    </>
  );
};

const ButtonStyled = styled(Button)`
  ${props =>
    props.disabled &&
    css`
      background-color: transparent;
    `}
`;
