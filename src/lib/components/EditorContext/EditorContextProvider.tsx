import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { useEditor, UseEditorReturn } from '@milkdown/react';
import { createContext, useMemo } from 'react';

type EditorContextData = {
  editor: UseEditorReturn | null;
};

export const EditorContext = createContext<EditorContextData>({
  editor: null,
});

type EditorContextProviderProps = {
  children: React.ReactNode;
  defaultEditorValue: string;
};

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({
  children,
  defaultEditorValue,
}) => {
  const editor = useEditor(root =>
    MilkdownEditor.make()
      .config(ctx => {
        ctx.set(rootCtx, root);
        ctx.set(defaultValueCtx, defaultEditorValue);
      })
      .use(commonmark)
      .use(history)
      .use(gfm)
  );

  const context = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};
