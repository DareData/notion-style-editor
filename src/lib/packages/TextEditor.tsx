import { MilkdownProvider } from '@milkdown/react';

import { Editor } from '../components/Editor';
import { EditorContextProvider } from '../components/EditorContext/EditorContextProvider';
import { MenuBar } from '../components/MenuBar/MenuBar';

export type TextEditorProps = {
  data: string;
  onDataChange: (data: string) => void;
};

export const TextEditor: React.FC<TextEditorProps> = ({ data }) => (
  <MilkdownProvider>
    <EditorContextProvider defaultEditorValue={data}>
      <div className="date-data_text-editor">
        <MenuBar />
        <Editor />
      </div>
    </EditorContextProvider>
  </MilkdownProvider>
);
