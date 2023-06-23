import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';
import 'tippy.js/dist/tippy.css';
import 'katex/dist/katex.min.css';

import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import { Editor, EditorRef } from './Editor';
import { EditorContainer } from './EditorContainer';
import { EditorContextProvider } from './EditorContext/EditorContextProvider';
import {
  TextEditorContextProvider,
  TextEditorContextProviderProps,
} from '../components/TextEditorContext/TextEditorContextProvider';
import { toasterStyles } from '../styles/common/toaster.styles';
import { theme } from '../styles/theme';

export type TextEditorMode = 'preview' | 'active';

export type TextEditorProps = {
  data: string;
  editorRef?: React.Ref<EditorRef>;
  className?: string;
  onDataChange?: (data: string) => void;
  onEditorFocus?: () => void;
  debounceChange?: number;
} & Omit<TextEditorContextProviderProps, 'children'>;

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  mode,
  showMenu,
  className = '',
  editorRef,
  placeholder,
  onDataChange = () => {},
  onFileUpload,
  stickyOnMenu,
  onEditorFocus,
  acceptedFormats,
  ...rest
}) => (
  <ThemeProvider {...{ theme }}>
    <TextEditorContextProvider
      {...{
        mode,
        onFileUpload,
        stickyOnMenu,
        showMenu,
        acceptedFormats,
        placeholder,
      }}
    >
      <MilkdownProvider>
        <ProsemirrorAdapterProvider>
          <EditorContextProvider
            onFocus={onEditorFocus}
            onChange={onDataChange}
            defaultMarkdownValue={data}
            {...rest}
          >
            <EditorContainer
              className={['date-data_text-editor', className].join(' ')}
              tabIndex={-1}
            >
              <Toaster toastOptions={toasterStyles} />
              <Editor ref={editorRef} />
            </EditorContainer>
          </EditorContextProvider>
        </ProsemirrorAdapterProvider>
      </MilkdownProvider>
    </TextEditorContextProvider>
  </ThemeProvider>
);
