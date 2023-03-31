import { useContext } from 'react';

import { TabsContext } from './TabsContextProvider';

export const useTabsContext = () => useContext(TabsContext);
