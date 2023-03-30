import 'react-dropdown/style.css';

import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';
import styled from 'styled-components';

import { Icon } from './Icon/Icon';
import { pxToRem } from '../styles/utils';

type SelectProps = ReactDropdownProps;

export const Select: React.FC<SelectProps> = props => (
  <SelectStyled
    {...props}
    arrowClosed={<Icon icon="arrow_down" />}
    arrowOpen={<Icon icon="arrow_top" />}
  />
);

const SelectStyled = styled(ReactDropdown)`
  min-width: ${pxToRem(130)};
  font-size: ${pxToRem(14)};

  /* stylelint-disable-next-line selector-class-pattern */
  .Dropdown-control {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${pxToRem(6)} ${pxToRem(12)};
    border-radius: ${pxToRem(8)};

    /* stylelint-disable-next-line selector-class-pattern */
    .Dropdown-arrow-wrapper {
      display: flex;
      align-items: center;
      margin-left: ${pxToRem(8)};
    }
  }

  /* stylelint-disable-next-line selector-class-pattern */
  .Dropdown-menu {
    border-radius: ${pxToRem(8)};
  }
`;
