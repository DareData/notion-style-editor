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
import { AddGoogleSlidesModal } from '../AddGoogleSlidesModal/AddGoogleSlidesModal';
import { AddImageModal } from '../AddImageModal/AddImageModal';
import { LinkModal } from '../LinkModal/LinkModal';

export const SlashNode: React.FC = () => {
  const { colors } = useTheme();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [loading, getEditor] = useInstance();
  const { onCallCommand } = useCallEditorCommand();

  const { keyboardListRefs } = useSlashProvider({ tooltipRef });

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
              ref={keyboardListRefs.current[0]}
              color="secondary"
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 1)}
            >
              <Icon icon="title" />
              Title
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[1]}
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 2)}
            >
              <Icon icon="subtitle" />
              Subtitle
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[2]}
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
                <DropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[3]}
                >
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
                <DropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[4]}
                >
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
              color="secondary"
              onClick={() => onCommandClick(createCodeBlockCommand.key)}
              ref={keyboardListRefs.current[5]}
            >
              <Icon icon="code_block" />
              Add code
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              color="secondary"
              onClick={() => onCommandClick(insertTableCommand.key)}
              ref={keyboardListRefs.current[6]}
            >
              <Icon icon="create_table" />
              Add table
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[7]}
              onClick={() => onCommandClick(insertMathCommand.key)}
            >
              <Icon icon="math" />
              Add math
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <DropdownButtonActionStyled
              color="secondary"
              onClick={() => onCommandClick(insertDiagramCommand.key)}
              ref={keyboardListRefs.current[8]}
            >
              <Icon icon="mermaid" />
              Add diagram
            </DropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <AddGoogleSlidesModal
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <DropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[9]}
                >
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
