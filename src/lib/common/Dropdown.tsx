import 'react-dropdown/style.css';

import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import styled from 'styled-components';

import { Icon } from './Icon/Icon';
import { pxToRem } from '../styles/utils';

type DropdownProps = ReactDropdownProps;

export const Dropdown: React.FC<DropdownProps> = props => (
  <ReactDropdownStyled
    {...props}
    arrowClosed={<Icon icon="arrow_down" />}
    arrowOpen={<Icon icon="arrow_top" />}
  />
);

const ReactDropdownStyled = styled(ReactDropdown)`
  min-width: ${pxToRem(130)};
  font-size: ${pxToRem(14)};
  .Dropdown-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(6)} ${pxToRem(12)};
    border-radius: ${pxToRem(8)};
    .Dropdown-arrow-wrapper {
      display: flex;
      align-items: center;
      margin-left: ${pxToRem(8)};
    }
  }
  .Dropdown-menu {
    border-radius: ${pxToRem(8)};
  }
`;
