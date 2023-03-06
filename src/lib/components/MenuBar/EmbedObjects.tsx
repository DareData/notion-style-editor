import { CmdKey } from '@milkdown/core';
import { createCodeBlockCommand } from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';

type EmbedObjectsProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const EmbedObjects: React.FC<EmbedObjectsProps> = ({
  onActionClick,
}) => (
  <>
    <li className="menubar-item menubar-item-embed_objects">
      {/* add popup to set href / text onActionClick(toggleLinkCommand.key) */}
      <Button>
        <Icon icon="add_link" />
      </Button>
    </li>
    <li className="menubar-item">
      {/* add image popup to set src, alt and title onActionClick(insertImageCommand) */}
      <Button>
        <Icon icon="embed_image" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(createCodeBlockCommand.key)}>
        <Icon icon="code_block" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button onClick={() => onActionClick(insertTableCommand.key)}>
        <Icon icon="create_table" />
      </Button>
    </li>
  </>
);
