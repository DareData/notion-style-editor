import { CmdKey } from '@milkdown/core';
import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
  toggleLinkCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { insertMathCommand } from '../../packages/EditorContext/hooks/useMathPlugin';
import { pxToRem } from '../../styles/utils';
import { HyperlinkModal } from '../HyperlinkModal/HyperlinkModal';
import { InsertImageModal } from '../InsertImageModal/InsertImageModal';

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
          <Button oval onClick={onOpen} space="small" color="secondary">
            <Icon icon="add_link" />
          </Button>
        )}
        onSave={data => onActionClick(toggleLinkCommand.key, data)}
      />
    </HyperlinkModalItemStyled>
    <li>
      <InsertImageModal
        handler={({ onOpen }) => (
          <Button oval onClick={onOpen} space="small" color="secondary">
            <Icon icon="embed_image" />
          </Button>
        )}
        onInsert={source =>
          onActionClick(insertImageCommand.key, { src: source })
        }
      />
    </li>
    <li>
      <Button
        onClick={() => onActionClick(createCodeBlockCommand.key)}
        oval
        space="small"
        color="secondary"
      >
        <Icon icon="code_block" />
      </Button>
    </li>
    <li>
      <Button
        onClick={() => onActionClick(insertTableCommand.key)}
        oval
        space="small"
        color="secondary"
      >
        <Icon icon="create_table" />
      </Button>
    </li>
    <li>
      <Button
        onClick={() => onActionClick(insertMathCommand.key)}
        oval
        space="small"
        color="secondary"
      >
        <Icon icon="math" />
      </Button>
    </li>
    <li>
      <Button
        onClick={() => onActionClick(insertDiagramCommand.key)}
        oval
        space="small"
        color="secondary"
      >
        <Icon icon="mermaid" />
      </Button>
    </li>
  </>
);

const HyperlinkModalItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
