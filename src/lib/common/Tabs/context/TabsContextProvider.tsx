import { createContext, useCallback, useMemo, useState } from 'react';

export type TabsContextType = {
  selected: string;
  onTabChange: (selected: string) => void;
};

export const TabsContext = createContext<TabsContextType>({
  selected: '',
  onTabChange: () => {},
});

type TabsContextProviderProps = {
  children: React.ReactNode;
  initialTab: string;
  onTabChange: (tab: string) => void;
};

export const TabsContextProvider: React.FC<TabsContextProviderProps> = ({
  children,
  initialTab,
  onTabChange: _onTabChange,
}) => {
  const [selected, setSelected] = useState<string>(initialTab);

  const onTabChange = useCallback(
    (selected: string) => {
      setSelected(selected);
      _onTabChange(selected);
    },
    [_onTabChange]
  );

  const context = useMemo(
    () => ({ selected, onTabChange }),
    [selected, onTabChange]
  );

  return (
    <TabsContext.Provider value={context}>{children}</TabsContext.Provider>
  );
};
