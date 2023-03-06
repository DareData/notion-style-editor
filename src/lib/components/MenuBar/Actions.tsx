import { CmdKey } from '@milkdown/core';
import { redoCommand, undoCommand } from '@milkdown/plugin-history';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

type ActionsProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const Actions: React.FC<ActionsProps> = ({ onActionClick }) => (
  <>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(redoCommand.key as CmdKey<'Redo'>)}>
        <Icon icon="redo" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(undoCommand.key as CmdKey<'Undo'>)}>
        <Icon icon="undo" />
      </Button>
    </li>
  </>
);
