import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';
import 'tippy.js/dist/tippy.css';
import 'katex/dist/katex.min.css';

import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { forwardRef } from 'react';
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
  className?: string;
  onDataChange?: (data: string) => void;
  onEditorFocus?: () => void;
  debounceChange?: number;
} & Omit<TextEditorContextProviderProps, 'children'>;

export const TextEditor = forwardRef<EditorRef, TextEditorProps>(
  (
    {
      data,
      mode,
      showMenu,
      className = '',
      placeholder,
      onDataChange,
      onFileUpload,
      stickyOnMenu,
      onEditorFocus,
      onFileValidation,
      inputAcceptedFormats,
      ...rest
    },
    ref
  ) => (
    <ThemeProvider {...{ theme }}>
      <TextEditorContextProvider
        {...{
          mode,
          showMenu,
          placeholder,
          onFileUpload,
          stickyOnMenu,
          onFileValidation,
          inputAcceptedFormats,
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
                <Editor {...{ ref }} />
              </EditorContainer>
            </EditorContextProvider>
          </ProsemirrorAdapterProvider>
        </MilkdownProvider>
      </TextEditorContextProvider>
    </ThemeProvider>
  )
);
