import { createContext, useMemo } from 'react';

import { useBase64File } from '../../hooks/useBase64File';
import { TextEditorMode } from '../../packages/TextEditor';

type TextEditorContextData = {
  mode: TextEditorMode;
  stickyOnMenu: number;
  onFileUpload: (file: File) => Promise<string>;
  acceptedFormats: string[];
};

export const TextEditorContext = createContext<TextEditorContextData>({
  mode: 'preview',
  stickyOnMenu: 10,
  onFileUpload: () => Promise.resolve(''),
  acceptedFormats: [],
});

export type TextEditorContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
  stickyOnMenu?: number;
  onFileUpload?: (file: File) => Promise<string>;
  acceptedFormats?: string[];
};

export const TextEditorContextProvider = ({
  mode,
  children,
  stickyOnMenu = 10,
  onFileUpload,
  acceptedFormats = ['*'],
}: TextEditorContextProviderProps) => {
  const { getBase64 } = useBase64File();

  const context = useMemo(
    () => ({
      mode,
      stickyOnMenu,
      onFileUpload: onFileUpload || getBase64,
      acceptedFormats,
    }),
    [mode, onFileUpload, getBase64, stickyOnMenu, acceptedFormats]
  );

  return (
    <TextEditorContext.Provider value={context}>
      {children}
    </TextEditorContext.Provider>
  );
};
