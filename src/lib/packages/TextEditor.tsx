import 'prosemirror-view/style/prosemirror.css';
import 'prosemirror-tables/style/tables.css';
import 'tippy.js/dist/tippy.css';
import 'react-tabs/style/react-tabs.css';

import { MilkdownProvider, Milkdown as MilkdownEditor } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../common/GlobalStyles';
import { EditorContainer } from '../components/EditorContainer';
import { EditorContextProvider } from '../components/EditorContext/EditorContextProvider';
import { MenuBar } from '../components/MenuBar/MenuBar';
import { toasterStyles } from '../styles/common/toaster.styles';
import { theme } from '../styles/theme';

export type TextEditorProps = {
  data: string;
  className?: string;
  onDataChange: (data: string) => void;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  className = '',
  onDataChange,
}) => (
  <ThemeProvider {...{ theme }}>
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <Toaster toastOptions={toasterStyles} />
        <GlobalStyles />
        <EditorContextProvider
          defaultMarkdownValue={data}
          onChange={onDataChange}
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
  </ThemeProvider>
);
