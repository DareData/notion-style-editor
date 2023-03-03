import { MilkdownProvider } from '@milkdown/react';

import { Editor, EditorProps } from '../components/Editor';

export type TextEditorProps = EditorProps;

export const TextEditor: React.FC<TextEditorProps> = props => (
  <MilkdownProvider>
    <Editor {...props} />
  </MilkdownProvider>
);
