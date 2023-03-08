import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import { codeBlockSchema, commonmark } from '@milkdown/preset-commonmark';
import { useEditor, UseEditorReturn } from '@milkdown/react';
import { $view } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { createContext, useMemo } from 'react';
import { refractor } from 'refractor/lib/common';

import { useGfmPlugin } from '../../hooks/useGfmPlugin/useGfmPlugin';
import { useUnderlineCommand } from '../../hooks/useUnderlineCommand';
import { CodeBlock } from '../CodeBlock';

type EditorContextData = {
  editor: UseEditorReturn | null;
};

export const EditorContext = createContext<EditorContextData>({
  editor: null,
});

type EditorContextProviderProps = {
  children: React.ReactNode;
  onChange: (markdown: string) => void;
  defaultMarkdownValue: string;
};

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({
  children,
  onChange,
  defaultMarkdownValue,
}) => {
  const nodeViewFactory = useNodeViewFactory();

  const gfmPlugin = useGfmPlugin();
  const underlineCommand = useUnderlineCommand();

  const editor = useEditor(
    root =>
      MilkdownEditor.make()
        .config(ctx => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, defaultMarkdownValue);
          ctx.update(prismConfig.key, prev => ({
            ...prev,
            configureRefractor: () => refractor,
          }));
          ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
            onChange(markdown);
          });
        })
        .use(listener)
        .use(underlineCommand)
        .use(commonmark)
        .use(history)
        .use(prism)
        .use(
          $view(codeBlockSchema.node, () =>
            nodeViewFactory({ component: () => <CodeBlock /> })
          )
        )
        .use(gfmPlugin),
    []
  );

  const context = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};
