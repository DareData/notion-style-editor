import { CmdKey } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';
import styled, { useTheme } from 'styled-components';

import { Actions } from './components/Actions';
import { EmbedObjects } from './components/EmbedObjects';
import { ParagraphFormat } from './components/ParagraphFormat';
import { ScriptActions } from './components/ScriptActions';
import { TextCreation } from './components/TextCreation';
import { TextFormats } from './components/TextFormats';
import { EmbedDropdown } from './EmbedDropdown/EmbedDropdown';
import { FormatDropdown } from './FormatDropdown/FormatDropdown';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { useEditorContext } from '../../packages/EditorContext/useEditorContext';
import { pxToRem } from '../../styles/utils';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const MenuBar = () => {
  const { queries } = useTheme();
  const { editor } = useEditorContext();
  const { mode } = useTextEditorModeContext();

  const isTablet = useMatchMedia({
    query: `(min-width: ${queries.tablet})`,
  });
  const isLaptop = useMatchMedia({
    query: `(min-width: ${queries.laptop})`,
  });

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
      {isTablet ? (
        <>
          <TextFormats {...{ onActionClick }} />
          <ScriptActions />
          <ParagraphFormat {...{ onActionClick }} />
        </>
      ) : (
        <FormatDropdown />
      )}
      {isLaptop ? <EmbedObjects {...{ onActionClick }} /> : <EmbedDropdown />}
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
