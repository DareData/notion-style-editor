import { createContext, useMemo } from 'react';

import { useBase64File } from '../../hooks/useBase64File';
import { TextEditorMode } from '../../packages/TextEditor';
import { AddGoogleSlidesModalProps } from '../AddGoogleSlidesModal/DefaultAddGoogleSlidesModal';
import { MentionsListDropdownProps } from '../MentionsWidget/MentionsWidget';

type TextEditorContextData = {
  mode: TextEditorMode;
  showMenu: boolean;
  placeholder: string;
  stickyOnMenu: number;
  onFileUpload: (file: File) => Promise<string>;
  onFileValidation?: (file: File | null) => boolean;
  inputAcceptedFormats: string;
  components?: {
    AddGoogleSlidesModal?: React.FC<AddGoogleSlidesModalProps>;
    MentionsListDropdown?: React.FC<MentionsListDropdownProps>;
  };
};

export const TextEditorContext = createContext<TextEditorContextData>({
  mode: 'preview',
  showMenu: true,
  placeholder: '',
  stickyOnMenu: 10,
  onFileUpload: () => Promise.resolve(''),
  inputAcceptedFormats: '',
  onFileValidation: () => true,
});

export type TextEditorContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
  showMenu?: boolean;
  placeholder?: string;
  stickyOnMenu?: number;
  onFileUpload?: (file: File) => Promise<string>;
  onFileValidation?: (file: File | null) => boolean;
  inputAcceptedFormats?: string;
  components?: {
    AddGoogleSlidesModal?: React.FC<AddGoogleSlidesModalProps>;
    MentionsListDropdown?: React.FC<MentionsListDropdownProps>;
  };
};

export const TextEditorContextProvider = ({
  mode,
  showMenu = true,
  children,
  placeholder = 'Post an update..',
  stickyOnMenu = 10,
  onFileUpload,
  onFileValidation,
  inputAcceptedFormats = '*',
  components,
}: TextEditorContextProviderProps) => {
  const { getBase64 } = useBase64File();

  const context = useMemo(
    () => ({
      mode,
      stickyOnMenu,
      onFileUpload: onFileUpload || getBase64,
      showMenu,
      placeholder,
      onFileValidation,
      inputAcceptedFormats,
      components,
    }),
    [
      mode,
      onFileUpload,
      getBase64,
      placeholder,
      showMenu,
      stickyOnMenu,
      onFileValidation,
      inputAcceptedFormats,
      components,
    ]
  );

  return (
    <TextEditorContext.Provider value={context}>
      {children}
    </TextEditorContext.Provider>
  );
};
