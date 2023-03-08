import { CmdKey } from '@milkdown/core';
import {
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

type ParagraphFormatProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const ParagraphFormat: React.FC<ParagraphFormatProps> = ({
  onActionClick,
}) => (
  <>
    <li className="menubar-item menubar-item-paragraph_format">
      <Button
        onClick={() => onActionClick(wrapInBulletListCommand.key)}
        className="oval">
        <Icon icon="bulleted_list" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button
        onClick={() => onActionClick(wrapInOrderedListCommand.key)}
        className="oval">
        <Icon icon="numbered_list" />
      </Button>
    </li>
  </>
);
