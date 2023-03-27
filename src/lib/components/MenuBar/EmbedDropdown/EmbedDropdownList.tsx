import { CmdKey } from '@milkdown/core';
import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import { useTheme } from 'styled-components';

import { useDropdownContext } from '../../../common/Dropdown/context/useModalContext';
import {
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { insertMathCommand } from '../../../packages/EditorContext/hooks/useMathPlugin';
import { HyperlinkModal } from '../../HyperlinkModal/HyperlinkModal';
import { InsertGoogleDocModal } from '../../InsertGoogleDocModal/InsertGoogleDocModal';
import { InsertImageModal } from '../../InsertImageModal/InsertImageModal';

export const EmbedDropdownList = () => {
  const { colors } = useTheme();
  const { onClose } = useDropdownContext();
  const { onCallCommand } = useCallEditorCommand();

  const onActionClick = <T,>(command: CmdKey<T>, payload?: T) => {
    onClose();
    onCallCommand(command, payload);
  };

  return (
    <DropdownListStyled>
      <DropdownItemStyled>
        <HyperlinkModal
          editable={false}
          onModalOpen={onClose}
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
            onActionClick(insertImageCommand.key, { src: source })
          }
          onModalOpen={onClose}
        />
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(createCodeBlockCommand.key)}
        >
          <Icon icon="code_block" />
          Add code
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(insertTableCommand.key)}
        >
          <Icon icon="create_table" />
          Add table
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(insertMathCommand.key)}
        >
          <Icon icon="math" />
          Add math
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <DropdownButtonActionStyled
          onClick={() => onActionClick(insertDiagramCommand.key)}
        >
          <Icon icon="mermaid" />
          Add diagram
        </DropdownButtonActionStyled>
      </DropdownItemStyled>
      <DropdownItemStyled>
        <InsertGoogleDocModal
          handler={({ onOpen }) => (
            <DropdownButtonActionStyled onClick={onOpen}>
              <Icon icon="google" fill={colors.white} />
              Add Google doc
            </DropdownButtonActionStyled>
          )}
          onModalOpen={onClose}
        />
      </DropdownItemStyled>
    </DropdownListStyled>
  );
};
