import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import styled, { useTheme } from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { insertMathCommand } from '../../../packages/EditorContext/hooks/useMathPlugin';
import { HyperlinkModal } from '../../HyperlinkModal/HyperlinkModal';
import { InsertGoogleDocModal } from '../../InsertGoogleDocModal/InsertGoogleDocModal';
import { InsertImageModal } from '../../InsertImageModal/InsertImageModal';

export const EmbedObjects: React.FC = () => {
  const { colors } = useTheme();
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <HyperlinkModalItemStyled>
        <HyperlinkModal
          editable={false}
          handler={({ onOpen }) => (
            <Button oval onClick={onOpen} space="small" color="secondary">
              <Icon icon="add_link" />
            </Button>
          )}
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
            onCallCommand(insertImageCommand.key, { src: source })
          }
        />
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(createCodeBlockCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="code_block" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(insertTableCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="create_table" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(insertMathCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="math" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(insertDiagramCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="mermaid" />
        </Button>
      </li>
      <li>
        <InsertGoogleDocModal
          handler={({ onOpen }) => (
            <Button oval space="small" color="secondary" onClick={onOpen}>
              <Icon icon="google" fill={colors.white} />
            </Button>
          )}
        />
      </li>
    </>
  );
};

const HyperlinkModalItemStyled = styled.li`
  margin-left: auto;
`;
