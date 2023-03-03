import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { commonmark } from '@milkdown/preset-commonmark';
import { Milkdown, useEditor } from '@milkdown/react';

export type EditorProps = {
  data: string;
  onDataChange: (data: string) => void;
};

export const Editor: React.FC<EditorProps> = ({ data }) => {
  useEditor(root =>
    MilkdownEditor.make()
      .config(ctx => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, data);
      })
      .use(commonmark)
  );

  return <Milkdown />;
};
