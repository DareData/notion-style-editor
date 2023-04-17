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
import { TextEditorModeContextProvider } from '../components/TextEditorModeContext/TextEditorModeContextProvider';
import { toasterStyles } from '../styles/common/toaster.styles';
import { theme } from '../styles/theme';

export type TextEditorMode = 'preview' | 'active';

export type TextEditorProps = {
  data: string;
  mode: TextEditorMode;
  className?: string;
  onDataChange: (data: string) => void;
  debounceChange?: number;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  mode,
  className = '',
  onDataChange,
  debounceChange = 0,
}) => (
  <ThemeProvider {...{ theme }}>
    <TextEditorModeContextProvider {...{ mode }}>
      <MilkdownProvider>
        <ProsemirrorAdapterProvider>
          <EditorContextProvider
            onChange={onDataChange}
            defaultMarkdownValue={data}
            {...{ debounceChange }}
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
    </TextEditorModeContextProvider>
  </ThemeProvider>
);
