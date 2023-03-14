import { CmdKey } from '@milkdown/core';
import {
  createCodeBlockCommand,
  toggleLinkCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { HyperlinkModal } from '../HyperlinkModal';

type EmbedObjectsProps = {
  onActionClick: <T>(action: CmdKey<T>, payload?: T) => void;
};

export const EmbedObjects: React.FC<EmbedObjectsProps> = ({
  onActionClick,
}) => (
  <>
    <li className="menubar-item menubar-item-embed_objects">
      <HyperlinkModal
        handler={({ onOpen }) => (
          <Button className="oval" onClick={onOpen}>
            <Icon icon="add_link" />
          </Button>
        )}
        onSave={href =>
          onActionClick(toggleLinkCommand.key, {
            title: 'onet',
            href: 'https://onet.pl',
          })
        }
      />
    </li>
    <li className="menubar-item">
      {/* add image popup to set src, alt and title onActionClick(insertImageCommand) */}
      <Button className="oval">
        <Icon icon="embed_image" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button
        onClick={() => onActionClick(createCodeBlockCommand.key)}
        className="oval">
        <Icon icon="code_block" />
      </Button>
    </li>
    <li className="menubar-item">
      <Button
        onClick={() => onActionClick(insertTableCommand.key)}
        className="oval">
        <Icon icon="create_table" />
      </Button>
    </li>
  </>
);
