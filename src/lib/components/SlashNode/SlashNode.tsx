import { CmdKey, EditorStatus, editorViewCtx } from '@milkdown/core';
import { insertDiagramCommand } from '@milkdown/plugin-diagram';
import {
  createCodeBlockCommand,
  insertImageCommand,
  turnIntoTextCommand,
  wrapInHeadingCommand,
} from '@milkdown/preset-commonmark';
import { insertTableCommand } from '@milkdown/preset-gfm';
import { useRef } from 'react';
import styled, { css, useTheme } from 'styled-components';

import { useSlashProvider } from './hooks/useSlashProvider';
import { ButtonProps } from '../../common/Button';
import {
  DropdownButtonActionStyled,
  DropdownItemStyled,
  DropdownListStyled,
} from '../../common/Dropdown/Dropdown';
import { Hidden } from '../../common/Hidden';
import { Icon } from '../../common/Icon/Icon';
import { useCallEditorCommand } from '../../hooks/useCallEditorCommand';
import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { insertMathCommand } from '../../packages/EditorContext/hooks/useMathPlugin';
import { AddDocumentModal } from '../AddDocumentModal/AddDocumentModal';
import { AddGoogleSlidesModal } from '../AddGoogleSlidesModal/AddGoogleSlidesModal';
import { LinkModal } from '../LinkModal/LinkModal';

export const SlashNode: React.FC = () => {
  const { colors } = useTheme();
  const tooltipRef = useRef<HTMLDivElement>(null);

  const { editor, loading } = useMilkdownInstance();
  const { onCallCommand } = useCallEditorCommand();

  const { keyboardListRefs, activeItemIndex } = useSlashProvider({
    tooltipRef,
  });

  const onRemoveSlash = () => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
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
            <FocusableDropdownButtonActionStyled
              ref={keyboardListRefs.current[0]}
              color="secondary"
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 1)}
              $isFocused={activeItemIndex === 0}
            >
              <Icon icon="title" />
              Title
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[1]}
              onClick={() => onCommandClick(wrapInHeadingCommand.key, 2)}
              $isFocused={activeItemIndex === 1}
            >
              <Icon icon="subtitle" />
              Subtitle
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[2]}
              onClick={() => onCommandClick(turnIntoTextCommand.key)}
              $isFocused={activeItemIndex === 2}
            >
              <Icon icon="paragraph" />
              Normal text
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <LinkModal
              editable={false}
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <FocusableDropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[3]}
                  $isFocused={activeItemIndex === 3}
                >
                  <Icon icon="add_link" />
                  Add link
                </FocusableDropdownButtonActionStyled>
              )}
            />
          </DropdownItemStyled>
          <DropdownItemStyled>
            <AddDocumentModal
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <FocusableDropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[4]}
                  $isFocused={activeItemIndex === 4}
                >
                  <Icon icon="embed_image" />
                  Add document
                </FocusableDropdownButtonActionStyled>
              )}
              onInsert={source =>
                onCallCommand(insertImageCommand.key, { src: source })
              }
            />
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              onClick={() => onCommandClick(createCodeBlockCommand.key)}
              ref={keyboardListRefs.current[5]}
              $isFocused={activeItemIndex === 5}
            >
              <Icon icon="code_block" />
              Add code
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              onClick={() => onCommandClick(insertTableCommand.key)}
              ref={keyboardListRefs.current[6]}
              $isFocused={activeItemIndex === 6}
            >
              <Icon icon="create_table" />
              Add table
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              ref={keyboardListRefs.current[7]}
              onClick={() => onCommandClick(insertMathCommand.key)}
              $isFocused={activeItemIndex === 7}
            >
              <Icon icon="math" />
              Add math
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <FocusableDropdownButtonActionStyled
              color="secondary"
              onClick={() => onCommandClick(insertDiagramCommand.key)}
              ref={keyboardListRefs.current[8]}
              $isFocused={activeItemIndex === 8}
            >
              <Icon icon="mermaid" />
              Add diagram
            </FocusableDropdownButtonActionStyled>
          </DropdownItemStyled>
          <DropdownItemStyled>
            <AddGoogleSlidesModal
              onModalOpen={onRemoveSlash}
              handler={({ onOpen }) => (
                <FocusableDropdownButtonActionStyled
                  onClick={onOpen}
                  color="secondary"
                  ref={keyboardListRefs.current[9]}
                  $isFocused={activeItemIndex === 9}
                >
                  <Icon icon="google" fill={colors.white} />
                  Add Google doc
                </FocusableDropdownButtonActionStyled>
              )}
            />
          </DropdownItemStyled>
        </DropdownListStyled>
      </div>
    </Hidden>
  );
};

type FocusableDropdownButtonActionStyledProps = ButtonProps & {
  $isFocused: boolean;
  ref: React.Ref<HTMLButtonElement>;
};
const FocusableDropdownButtonActionStyled = styled<
  React.FC<FocusableDropdownButtonActionStyledProps>
>(DropdownButtonActionStyled)`
  ${props =>
    props.$isFocused &&
    css`
      background-color: ${props => props.theme.colors.secondaryLightGrey};
    `}
`;
