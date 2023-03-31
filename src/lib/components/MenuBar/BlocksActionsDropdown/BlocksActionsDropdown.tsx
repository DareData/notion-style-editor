import styled from 'styled-components';

import { BlocksActionsDropdownList } from './BlocksActionsDropdownList';
import { Button } from '../../../common/Button';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';
import { theme } from '../../../styles/theme';

export const BlocksActionsDropdown = () => (
  <DropdownStyled
    handler={({ onToggle }) => (
      <Button onClick={onToggle} oval space="small" color="secondary">
        <Icon icon="settings" />
      </Button>
    )}
  >
    <BlocksActionsDropdownList />
  </DropdownStyled>
);

const DropdownStyled = styled(Dropdown)`
  @media (min-width: ${theme.queries.tablet}) {
    margin-left: auto;
  }
`;
