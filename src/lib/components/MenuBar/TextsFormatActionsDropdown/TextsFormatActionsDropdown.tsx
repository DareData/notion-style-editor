import styled from 'styled-components';

import { TextsFormatActionsDropdownList } from './TextsFormatActionsDropdownList';
import { Button } from '../../../common/Button';
import { Dropdown } from '../../../common/Dropdown/Dropdown';
import { Icon } from '../../../common/Icon/Icon';

export const TextsFormatActionsDropdown = () => (
  <DropdownStyled
    handler={({ onToggle }) => (
      <Button onClick={onToggle} oval space="small" color="secondary">
        <Icon icon="format_dropdown" />
      </Button>
    )}
  >
    <TextsFormatActionsDropdownList />
  </DropdownStyled>
);

const DropdownStyled = styled(Dropdown)`
  margin-left: auto;
`;
