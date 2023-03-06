import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { commonmark } from '@milkdown/preset-commonmark';
import { gfm } from '@milkdown/preset-gfm';
import { useEditor, UseEditorReturn } from '@milkdown/react';
import { createContext, useMemo } from 'react';
import css from 'refractor/lang/css';
import javascript from 'refractor/lang/javascript';
import jsx from 'refractor/lang/jsx';
import markdown from 'refractor/lang/markdown';
import tsx from 'refractor/lang/tsx';
import typescript from 'refractor/lang/typescript';

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
        ctx.set(prismConfig.key, {
          configureRefractor: refractor => {
            refractor.register(markdown);
            refractor.register(css);
            refractor.register(javascript);
            refractor.register(typescript);
            refractor.register(jsx);
            refractor.register(tsx);
          },
        });
      })
      .use(commonmark)
      .use(history)
      .use(gfm)
      .use(prism)
  );

  const context = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};