import { createContext, useMemo } from 'react';

export type DropdownContextType = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

type DropdownContextProviderProps = DropdownContextType & {
  children: React.ReactNode;
};

export const DropdownContext = createContext<DropdownContextType>({
  onOpen: () => {},
  isOpen: false,
  onClose: () => {},
});

export const DropdownContextProvider: React.FC<
  DropdownContextProviderProps
> = ({ onClose, isOpen, onOpen, children }) => {
  const context = useMemo(
    () => ({
      onOpen,
      isOpen,
      onClose,
    }),
    [onClose, isOpen, onOpen]
  );

  return (
    <DropdownContext.Provider value={context}>
      {children}
    </DropdownContext.Provider>
  );
};
