import { createContext, useMemo } from 'react';

import { useBase64File } from '../../hooks/useBase64File';
import { TextEditorMode } from '../../packages/TextEditor';

type TextEditorContextData = {
  mode: TextEditorMode;
  showMenu: boolean;
  placeholder: string;
  stickyOnMenu: number;
  onFileUpload: (file: File) => Promise<string>;
  acceptedFormats: string[];
};

export const TextEditorContext = createContext<TextEditorContextData>({
  mode: 'preview',
  showMenu: true,
  placeholder: '',
  stickyOnMenu: 10,
  onFileUpload: () => Promise.resolve(''),
  acceptedFormats: [],
});

export type TextEditorContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
  showMenu?: boolean;
  placeholder?: string;
  stickyOnMenu?: number;
  onFileUpload?: (file: File) => Promise<string>;
  acceptedFormats?: string[];
};

export const TextEditorContextProvider = ({
  mode,
  showMenu = true,
  children,
  placeholder = 'Post an update..',
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
      showMenu,
      placeholder,
      acceptedFormats,
    }),
    [
      mode,
      onFileUpload,
      getBase64,
      placeholder,
      showMenu,
      stickyOnMenu,
      acceptedFormats,
    ]
  );

  return (
    <TextEditorContext.Provider value={context}>
      {children}
    </TextEditorContext.Provider>
  );
};
