import styled, { useTheme } from 'styled-components';

import { BlocksActionsDropdown } from './BlocksActionsDropdown/BlocksActionsDropdown';
import { BlocksActions } from './components/BlocksActions';
import { FormatActions } from './components/FormatActions';
import { ListsActions } from './components/ListsActions';
import { TurnTextsActions } from './components/TurnTextsActions';
import { UndoRedoActions } from './components/UndoRedoActions';
import { TextsFormatActionsDropdown } from './TextsFormatActionsDropdown/TextsFormatActionsDropdown';
import { useMatchMedia } from '../../hooks/useMatchMedia';
import { theme } from '../../styles/theme';
import { pxToRem } from '../../styles/utils';
import { useTextEditorContext } from '../TextEditorContext/useTextEditorContext';

export const MenuBar = () => {
  const { queries } = useTheme();
  const { mode, stickyOnMenu, showMenu } = useTextEditorContext();

  const isTablet = useMatchMedia({
    query: `(min-width: ${queries.tablet})`,
  });
  const isLaptop = useMatchMedia({
    query: `(min-width: ${queries.laptop})`,
  });

  if (mode === 'preview' || !showMenu) {
    return null;
  }

  return (
    <MenuBarListStyled $stickyOnMenu={stickyOnMenu}>
      <UndoRedoActions />
      <TurnTextsActions />
      {isTablet ? (
        <>
          <FormatActions />
          <ListsActions />
        </>
      ) : (
        <TextsFormatActionsDropdown />
      )}
      {isLaptop ? <BlocksActions /> : <BlocksActionsDropdown />}
    </MenuBarListStyled>
  );
};

const MenuBarListStyled = styled.ul<{ $stickyOnMenu: number }>`
  position: sticky;
  top: ${props => `${props.$stickyOnMenu}px`};
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  border-radius: ${pxToRem(4)};
  margin-bottom: ${pxToRem(20)};
  z-index: ${props => props.theme.zIndexes.menu};

  &&& {
    padding: ${pxToRem(8)} ${pxToRem(2)};

    @media (min-width: ${theme.queries.menuWithSpace}) {
      padding: ${pxToRem(8)} ${pxToRem(8)};
    }
  }
`;
