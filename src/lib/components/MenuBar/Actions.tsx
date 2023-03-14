import { CmdKey } from '@milkdown/core';
import { redoCommand, undoCommand } from '@milkdown/plugin-history';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

type ActionsProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const Actions: React.FC<ActionsProps> = ({ onActionClick }) => (
  <>
    <li>
      <Button onClick={() => onActionClick(redoCommand.key)} oval>
        <Icon icon="undo" />
      </Button>
    </li>
    <li>
      <Button onClick={() => onActionClick(undoCommand.key)} oval>
        <Icon icon="redo" />
      </Button>
    </li>
  </>
);
