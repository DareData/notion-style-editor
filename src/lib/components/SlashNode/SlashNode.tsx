import { CmdKey, editorViewCtx } from '@milkdown/core';
import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import { useInstance } from '@milkdown/react';
import { useRef } from 'react';
import { useTheme } from 'styled-components';

import { useSlashProvider } from './hooks/useSlashProvider';
import {
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../common/Dropdown/Dropdown';
import { Hidden } from '../../common/Hidden';
import { Icon } from '../../common/Icon/Icon';
import { useCallEditorCommand } from '../../hooks/useCallEditorCommand';
import { insertMathCommand } from '../../packages/EditorContext/hooks/useMathPlugin';
import { AddImageModal } from '../AddImageModal/AddImageModal';
import { InsertGoogleDocModal } from '../InsertGoogleDocModal/InsertGoogleDocModal';
import { LinkModal } from '../LinkModal/LinkModal';

export const SlashNode: React.FC = () => {
  const { colors } = useTheme();
  const tooltipRef = useRef<HTMLDivElement>(null);

  useSlashProvider({ tooltipRef });
  const [loading, getEditor] = useInstance();
  const { onCallCommand } = useCallEditorCommand();

  const onRemoveSlash = () => {
    const editor = getEditor();
    if (loading || !editor) {
      return;
    }

    editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      const { state } = view;
      const { selection } = state;

      view.dispatch(state.tr.delete(selection.from - 1, selection.from));
    });
  };

  const onCommandClick = <T,>(command: CmdKey<T>, payload?: T | undefined) => {
    onRemoveSlash();
    onCallCommand(command, payload);
  };

  return (
    <Hidden>
      <div ref={tooltipRef}>
        <DropdownListStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 1)}
            >
              <Icon icon="title" />
              Title
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 2)}
            >
              <Icon icon="subtitle" />
              Subtitle
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(turnIntoTextCommand.key)}
            >
              <Icon icon="paragraph" />
              Normal text
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <LinkModal
              editable={false}
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <DropdownButtonActionStyled onClick={onOpen}>
                  <Icon icon="add_link" />
                  Add link
                </DropdownButtonActionStyled>
              )}
            />
          </DropdownItemStyled>
          <DropdownItemStyled>
            <AddImageModal
              onModalOpen={onRemoveSlash}
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
              onClick={() => onCommandClick(createCodeBlockCommand.key)}
            >
              <Icon icon="code_block" />
              Add code
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(insertTableCommand.key)}
            >
              <Icon icon="create_table" />
              Add table
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(insertMathCommand.key)}
            >
              <Icon icon="math" />
              Add math
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              onClick={() => onCommandClick(insertDiagramCommand.key)}
            >
              <Icon icon="mermaid" />
              Add diagram
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <InsertGoogleDocModal
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <DropdownButtonActionStyled onClick={onOpen}>
                  <Icon icon="google" fill={colors.white} />
                  Add Google doc
                </DropdownButtonActionStyled>
              )}
            />
          </DropdownItemStyled>
        </DropdownListStyled>
      </div>
    </Hidden>
  );
};
