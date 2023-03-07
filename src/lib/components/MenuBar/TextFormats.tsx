import { CmdKey } from '@milkdown/core';
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { toggleUnderlineCommand } from '../../hooks/useUnderlineCommand';

type TextFormatsProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const TextFormats: React.FC<TextFormatsProps> = ({ onActionClick }) => (
  <>
    <li className="menubar-item menubar-item-text_formats">
      <Button onClick={() => onActionClick(toggleStrongCommand.key)}>
        <Icon icon="bold" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(toggleEmphasisCommand.key)}>
        <Icon icon="italic" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(toggleUnderlineCommand.key)}>
        <Icon icon="underline" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(toggleStrikethroughCommand.key)}>
        <Icon icon="strikethrough" />
      </Button>
    </li>
  </>
);
