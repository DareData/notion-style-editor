import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';
import 'tippy.js/dist/tippy.css';
import 'katex/dist/katex.min.css';

import { MilkdownProvider, Milkdown as MilkdownEditor } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

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
  debounceChange?: number;
} & Omit<TextEditorContextProviderProps, 'children'>;

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  mode,
  className = '',
  onDataChange = () => {},
  onFileUpload,
  stickyOnMenu,
  acceptedFormats,
  ...rest
}) => (
  <ThemeProvider {...{ theme }}>
    <TextEditorContextProvider
      {...{ mode, onFileUpload, stickyOnMenu, acceptedFormats }}
    >
      <MilkdownProvider>
        <ProsemirrorAdapterProvider>
          <EditorContextProvider
            defaultMarkdownValue={data}
            onChange={onDataChange}
            {...rest}
          >
            <EditorContainer
              className={['date-data_text-editor', className].join(' ')}
              tabIndex={-1}
            >
              <Toaster toastOptions={toasterStyles} />
              <MilkdownEditor />
            </EditorContainer>
          </EditorContextProvider>
        </ProsemirrorAdapterProvider>
      </MilkdownProvider>
    </TextEditorContextProvider>
  </ThemeProvider>
);
