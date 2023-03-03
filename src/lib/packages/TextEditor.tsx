import { MilkdownProvider } from '@milkdown/react';

import { Editor, EditorProps } from '../components/Editor';
import { MenuBar } from '../components/MenuBar/MenuBar';

export type TextEditorProps = EditorProps;

export const TextEditor: React.FC<TextEditorProps> = props => (
  <MilkdownProvider>
    <div className="date-data_text-editor">
      <MenuBar />
      <Editor {...props} />
    </div>
  </MilkdownProvider>
);
