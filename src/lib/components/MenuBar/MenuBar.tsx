import { CmdKey } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';
import styled from 'styled-components';

import { Actions } from './Actions';
import { EmbedObjects } from './EmbedObjects';
import { ParagraphFormat } from './ParagraphFormat';
import { ScriptActions } from './ScriptActions';
import { TextCreation } from './TextCreation';
import { TextFormats } from './TextFormats';
import { useEditorContext } from '../../packages/EditorContext/useEditorContext';
import { pxToRem } from '../../styles/utils';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const MenuBar = () => {
  const { editor } = useEditorContext();
  const { mode } = useTextEditorModeContext();

  const onActionClick = <T,>(command: CmdKey<T>, payload?: T | undefined) => {
    editor?.get()?.action(callCommand(command, payload));
  };

  if (mode === 'preview') {
    return null;
  }

  return (
    <MenuBarListStyled>
      <Actions {...{ onActionClick }} />
      <TextCreation {...{ onActionClick }} />
      <TextFormats {...{ onActionClick }} />
      <ScriptActions />
      <ParagraphFormat {...{ onActionClick }} />
      <EmbedObjects {...{ onActionClick }} />
    </MenuBarListStyled>
  );
};

const MenuBarListStyled = styled.ul`
  list-style-type: none;
  display: flex;
  gap: ${pxToRem(16)};
  align-items: center;
  padding: ${pxToRem(8)} ${pxToRem(23)};
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  border-radius: ${pxToRem(4)};
  margin-bottom: ${pxToRem(20)};
`;
