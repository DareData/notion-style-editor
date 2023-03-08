import { MilkdownProvider, Milkdown as MilkdownEditor } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';

import { EditorContextProvider } from '../components/EditorContext/EditorContextProvider';
import { MenuBar } from '../components/MenuBar/MenuBar';

export type TextEditorProps = {
  data: string;
  onDataChange: (data: string) => void;
};

export const TextEditor: React.FC<TextEditorProps> = ({
  data,
  onDataChange,
}) => (
  <MilkdownProvider>
    <ProsemirrorAdapterProvider>
      <EditorContextProvider
        defaultMarkdownValue={data}
        onChange={onDataChange}>
        <div className="date-data_text-editor">
          <MenuBar />
          <MilkdownEditor />
        </div>
      </EditorContextProvider>
    </ProsemirrorAdapterProvider>
  </MilkdownProvider>
);
