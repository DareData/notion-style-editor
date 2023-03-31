import { redoCommand, undoCommand } from '@milkdown/plugin-history';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';

export const UndoRedoActions: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <li>
        <Button
          onClick={() => onCallCommand(undoCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="undo" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(redoCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="redo" />
        </Button>
      </li>
    </>
  );
};
