import { createContext, useMemo } from 'react';

import { useBase64File } from '../../hooks/useBase64File';
import { TextEditorMode } from '../../packages/TextEditor';

type TextEditorContextData = {
  mode: TextEditorMode;
  showMenu: boolean;
  stickyOnMenu: number;
  onFileUpload: (file: File) => Promise<string>;
};

export const TextEditorContext = createContext<TextEditorContextData>({
  mode: 'preview',
  showMenu: true,
  stickyOnMenu: 10,
  onFileUpload: () => Promise.resolve(''),
});

export type TextEditorContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
  showMenu?: boolean;
  stickyOnMenu?: number;
  onFileUpload?: (file: File) => Promise<string>;
};

export const TextEditorContextProvider = ({
  mode,
  showMenu = true,
  children,
  stickyOnMenu = 10,
  onFileUpload,
}: TextEditorContextProviderProps) => {
  const { getBase64 } = useBase64File();

  const context = useMemo(
    () => ({
      mode,
      stickyOnMenu,
      onFileUpload: onFileUpload || getBase64,
      showMenu,
    }),
    [mode, onFileUpload, getBase64, stickyOnMenu, showMenu]
  );

  return (
    <TextEditorContext.Provider value={context}>
      {children}
    </TextEditorContext.Provider>
  );
};
