import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import {
  Dropdown,
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { insertMathCommand } from '../../../packages/EditorContext/hooks/useMathPlugin';
import { theme } from '../../../styles/theme';
import { HyperlinkModal } from '../../HyperlinkModal/HyperlinkModal';
import { InsertImageModal } from '../../InsertImageModal/InsertImageModal';

export const EmbedDropdown = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <DropdownStyled
      handler={({ onToggle }) => (
        <Button onClick={onToggle} oval space="small" color="secondary">
          <Icon icon="settings" />
        </Button>
      )}
    >
      <DropdownListStyled>
        <DropdownItemStyled>
          <HyperlinkModal
            editable={false}
            handler={({ onOpen }) => (
              <DropdownButtonActionStyled onClick={onOpen}>
                <Icon icon="add_link" />
                Add link
              </DropdownButtonActionStyled>
            )}
          />
        </DropdownItemStyled>
        <DropdownItemStyled>
          <InsertImageModal
            handler={({ onOpen }) => (
              <DropdownButtonActionStyled onClick={onOpen}>
                <Icon icon="embed_image" />
                Add image
              </DropdownButtonActionStyled>
            )}
            onInsert={source =>
              onCallCommand(insertImageCommand.key, { src: source })
            }
          />
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(createCodeBlockCommand.key)}
          >
            <Icon icon="code_block" />
            Add code
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(insertTableCommand.key)}
          >
            <Icon icon="create_table" />
            Add table
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(insertMathCommand.key)}
          >
            <Icon icon="math" />
            Add math
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
        <DropdownItemStyled>
          <DropdownButtonActionStyled
            onClick={() => onCallCommand(insertDiagramCommand.key)}
          >
            <Icon icon="mermaid" />
            Add diagram
          </DropdownButtonActionStyled>
        </DropdownItemStyled>
      </DropdownListStyled>
    </DropdownStyled>
  );
};

const DropdownStyled = styled(Dropdown)`
  @media (min-width: ${theme.queries.tablet}) {
    margin-left: auto;
  }
`;
