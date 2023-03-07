import ReactDropdown, { ReactDropdownProps } from 'react-dropdown';

import 'react-dropdown/style.css';
import { Icon } from './Icon/Icon';

type DropdownProps = ReactDropdownProps;

export const Dropdown: React.FC<DropdownProps> = props => (
  <ReactDropdown
    {...props}
    arrowClosed={<Icon icon="arrow_down" />}
    arrowOpen={<Icon icon="arrow_top" />}
  />
);
