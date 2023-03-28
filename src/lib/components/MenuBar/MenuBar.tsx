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
import { pxToRem } from '../../styles/utils';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export const MenuBar = () => {
  const { queries } = useTheme();
  const { mode } = useTextEditorModeContext();

  const isTablet = useMatchMedia({
    query: `(min-width: ${queries.tablet})`,
  });
  const isLaptop = useMatchMedia({
    query: `(min-width: ${queries.laptop})`,
  });

  if (mode === 'preview') {
    return null;
  }

  return (
    <MenuBarListStyled>
      <Actions />
      <TextCreation />
      {isTablet ? (
        <>
          <TextFormats />
          <ScriptActions />
          <ParagraphFormat />
        </>
      ) : (
        <FormatDropdown />
      )}
      {isLaptop ? <EmbedObjects /> : <EmbedDropdown />}
    </MenuBarListStyled>
  );
};

const MenuBarListStyled = styled.ul`
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  gap: ${pxToRem(6)};
  align-items: center;
  padding: ${pxToRem(8)} ${pxToRem(8)};
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  border-radius: ${pxToRem(4)};
  margin-bottom: ${pxToRem(20)};
`;
