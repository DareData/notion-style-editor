import styled from 'styled-components';

import { FormatDropdownList } from './FormatDropdownList';
import { Button } from '../../../common/Button';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';

export const FormatDropdown = () => (
  <DropdownStyled
    handler={({ onToggle }) => (
      <Button onClick={onToggle} oval space="small" color="secondary">
        <Icon icon="format_dropdown" />
      </Button>
    )}
  >
    <FormatDropdownList />
  </DropdownStyled>
);

const DropdownStyled = styled(Dropdown)`
  margin-left: auto;
`;
