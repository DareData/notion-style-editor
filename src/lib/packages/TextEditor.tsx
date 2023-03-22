import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';
import 'tippy.js/dist/tippy.css';
import 'react-tabs/style/react-tabs.css';
import 'katex/dist/katex.min.css';

import { MilkdownProvider, Milkdown as MilkdownEditor } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import { EditorContextProvider } from './EditorContext/EditorContextProvider';
import { GlobalStyles } from '../common/GlobalStyles';
import { EditorContainer } from '../components/EditorContainer';
import { MenuBar } from '../components/MenuBar/MenuBar';
import { TextEditorModeContextProvider } from '../components/TextEditorModeContext/TextEditorModeContextProvider';
import { toasterStyles } from '../styles/common/toaster.styles';
import { theme } from '../styles/theme';

export type TextEditorMode = 'preview' | 'active';

export type TextEditorProps = {
  data: string;
  mode: TextEditorMode;
  className?: string;
  onDataChange: (data: string) => void;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  mode,
  className = '',
  onDataChange,
}) => (
  <ThemeProvider {...{ theme }}>
    <TextEditorModeContextProvider {...{ mode }}>
      <MilkdownProvider>
        <ProsemirrorAdapterProvider>
          <Toaster toastOptions={toasterStyles} />
          <GlobalStyles />
          <EditorContextProvider
            onChange={onDataChange}
            defaultMarkdownValue={data}
          >
            <EditorContainer
              className={['date-data_text-editor', className].join(' ')}
              tabIndex={-1}
            >
              <MenuBar />
              <MilkdownEditor />
            </EditorContainer>
          </EditorContextProvider>
        </ProsemirrorAdapterProvider>
      </MilkdownProvider>
    </TextEditorModeContextProvider>
  </ThemeProvider>
);
