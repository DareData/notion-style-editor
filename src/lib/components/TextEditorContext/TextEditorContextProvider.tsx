import { createContext, useMemo } from 'react';

import { useBase64File } from '../../hooks/useBase64File';
import { TextEditorMode } from '../../packages/TextEditor';

type TextEditorContextData = {
  mode: TextEditorMode;
  onFileUpload: (file: File) => Promise<string>;
};

export const TextEditorContext = createContext<TextEditorContextData>({
  mode: 'preview',
  onFileUpload: () => Promise.resolve(''),
});

export type TextEditorContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
  onFileUpload?: (file: File) => Promise<string>;
};

export const TextEditorContextProvider = ({
  mode,
  children,
  onFileUpload,
}: TextEditorContextProviderProps) => {
  const { getBase64 } = useBase64File();

  const context = useMemo(
    () => ({ mode, onFileUpload: onFileUpload || getBase64 }),
    [mode, onFileUpload, getBase64]
  );

  return (
    <TextEditorContext.Provider value={context}>
      {children}
    </TextEditorContext.Provider>
  );
};
