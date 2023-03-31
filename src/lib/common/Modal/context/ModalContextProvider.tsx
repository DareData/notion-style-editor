import { createContext, useMemo } from 'react';

export type ModalContextType = {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
};

type ModalContextProviderProps = ModalContextType & {
  children: React.ReactNode;
};

export const ModalContext = createContext<ModalContextType>({
  onOpen: () => {},
  isOpen: false,
  onClose: () => {},
});

export const ModalContextProvider: React.FC<ModalContextProviderProps> = ({
  onClose,
  isOpen,
  onOpen,
  children,
}) => {
  const context = useMemo(
    () => ({
      onOpen,
      isOpen,
      onClose,
    }),
    [onClose, isOpen, onOpen]
  );

  return (
    <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
  );
};
