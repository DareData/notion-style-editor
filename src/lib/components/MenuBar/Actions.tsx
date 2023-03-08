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
      <Button onClick={() => onActionClick(redoCommand.key)} className="oval">
        <Icon icon="undo" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(undoCommand.key)} className="oval">
        <Icon icon="redo" />
      </Button>
    </li>
  </>
);
