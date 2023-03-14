import { CmdKey } from '@milkdown/core';
import {
  createCodeBlockCommand,
  toggleLinkCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';
import { HyperlinkModal } from '../HyperlinkModal/HyperlinkModal';

type EmbedObjectsProps = {
  onActionClick: <T>(action: CmdKey<T>, payload?: T) => void;
};

export const EmbedObjects: React.FC<EmbedObjectsProps> = ({
  onActionClick,
}) => (
  <>
    <HyperlinkModalItemStyled>
      <HyperlinkModal
        handler={({ onOpen }) => (
          <Button oval onClick={onOpen}>
            <Icon icon="add_link" />
          </Button>
        )}
        onSave={data => onActionClick(toggleLinkCommand.key, data)}
      />
    </HyperlinkModalItemStyled>
    <li>
      {/* add image popup to set src, alt and title onActionClick(insertImageCommand) */}
      <Button oval>
        <Icon icon="embed_image" />
      </Button>
    </li>
    <li>
      <Button onClick={() => onActionClick(createCodeBlockCommand.key)} oval>
        <Icon icon="code_block" />
      </Button>
    </li>
    <li>
      <Button onClick={() => onActionClick(insertTableCommand.key)} oval>
        <Icon icon="create_table" />
      </Button>
    </li>
  </>
);

const HyperlinkModalItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
