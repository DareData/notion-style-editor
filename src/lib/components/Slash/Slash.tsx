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
import styled from 'styled-components';

import { useSlashProvider } from './hooks/useSlashProvider';
import { Button } from '../../common/Button';
import { Hidden } from '../../common/Hidden';
import { Icon } from '../../common/Icon/Icon';
import { useCallEditorCommand } from '../../hooks/useCallEditorCommand';
import { insertMathCommand } from '../../packages/EditorContext/hooks/useMathPlugin';
import { pxToRem } from '../../styles/utils';
import { HyperlinkModal } from '../HyperlinkModal/HyperlinkModal';
import { InsertImageModal } from '../InsertImageModal/InsertImageModal';

export const Slash: React.FC = () => {
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
        <SlashListStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 1)}
            >
              <Icon icon="title" />
              Title
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 2)}
            >
              <Icon icon="subtitle" />
              Subtitle
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(turnIntoTextCommand.key)}
            >
              <Icon icon="paragraph" />
              Normal text
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <HyperlinkModal
              editable={false}
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <AddActionButtonStyled onClick={onOpen}>
                  <Icon icon="add_link" />
                  Add link
                </AddActionButtonStyled>
              )}
            />
          </SlashItemStyled>
          <SlashItemStyled>
            <InsertImageModal
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <AddActionButtonStyled onClick={onOpen}>
                  <Icon icon="embed_image" />
                  Add image
                </AddActionButtonStyled>
              )}
              onInsert={source =>
                onCallCommand(insertImageCommand.key, { src: source })
              }
            />
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(createCodeBlockCommand.key)}
            >
              <Icon icon="code_block" />
              Add code
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(insertTableCommand.key)}
            >
              <Icon icon="create_table" />
              Add table
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(insertMathCommand.key)}
            >
              <Icon icon="math" />
              Add math
            </AddActionButtonStyled>
          </SlashItemStyled>
          <SlashItemStyled>
            <AddActionButtonStyled
              onClick={() => onCommandClick(insertDiagramCommand.key)}
            >
              <Icon icon="mermaid" />
              Add diagram
            </AddActionButtonStyled>
          </SlashItemStyled>
        </SlashListStyled>
      </div>
    </Hidden>
  );
};

const SlashListStyled = styled.ul`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(8)};
  border: 1px solid ${props => props.theme.colors.lightGrey};
`;

const SlashItemStyled = styled.li`
  list-style-type: none;
`;

const AddActionButtonStyled = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: ${pxToRem(10)};
  padding: ${pxToRem(14)} ${pxToRem(20)};
  min-width: ${pxToRem(200)};
`;
