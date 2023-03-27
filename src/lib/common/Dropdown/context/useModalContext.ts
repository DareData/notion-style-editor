import { useContext } from 'react';

import { DropdownContext } from './DropdownContextProvider';

export const useDropdownContext = () => useContext(DropdownContext);
