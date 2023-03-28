import styled, { useTheme } from 'styled-components';

import { BlocksActionsDropdown } from './BlocksActionsDropdown/BlocksActionsDropdown';
import { BlocksActions } from './components/BlocksActions';
import { FormatActions } from './components/FormatActions';
import { ListsActions } from './components/ListsActions';
import { SubSuperScriptActions } from './components/SubSuperScriptActions';
import { TurnTextsActions } from './components/TurnTextsActions';
import { UndoRedoActions } from './components/UndoRedoActions';
import { TextsFormatActionsDropdown } from './TextsFormatActionsDropdown/TextsFormatActionsDropdown';
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
      <UndoRedoActions />
      <TurnTextsActions />
      {isTablet ? (
        <>
          <FormatActions />
          <SubSuperScriptActions />
          <ListsActions />
        </>
      ) : (
        <TextsFormatActionsDropdown />
      )}
      {isLaptop ? <BlocksActions /> : <BlocksActionsDropdown />}
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
