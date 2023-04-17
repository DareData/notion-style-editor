import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { clipboard } from '@milkdown/plugin-clipboard';
import { emoji } from '@milkdown/plugin-emoji';
import { history } from '@milkdown/plugin-history';
import { trailing } from '@milkdown/plugin-trailing';
import { useEditor, UseEditorReturn } from '@milkdown/react';
import { createContext, useMemo } from 'react';

import { useCommonmarkPlugin } from './hooks/useCommonmarkPlugin';
import { useEditorViewPlugin } from './hooks/useEditorViewPlugin';
import { useGfmPlugin } from './hooks/useGfmPlugin/useGfmPlugin';
import { useListenerPlugin } from './hooks/useListenerPlugin';
import { useMathPlugin } from './hooks/useMathPlugin';
import { useMenuBarPlugin } from './hooks/useMenuBarPlugin';
import { useMermaidPlugin } from './hooks/useMermaidPlugin';
import { usePrismPlugin } from './hooks/usePrismPlugin';
import { useSlashPlugin } from './hooks/useSlashPlugin';
import { useUploadPlugin } from './hooks/useUploadPlugin';

type EditorContextData = {
  editor: UseEditorReturn | null;
};

export const EditorContext = createContext<EditorContextData>({
  editor: null,
});

type EditorContextProviderProps = {
  children: React.ReactNode;
  onChange: (markdown: string) => void;
  debounceChange?: number;
  defaultMarkdownValue: string;
};

export const EditorContextProvider: React.FC<EditorContextProviderProps> = ({
  children,
  onChange,
  debounceChange,
  defaultMarkdownValue,
}) => {
  const gfmPlugin = useGfmPlugin();
  const mathPlugin = useMathPlugin();
  const uploadPlugin = useUploadPlugin();
  const mermaidPlugin = useMermaidPlugin();
  const slashPlugin = useSlashPlugin();
  const commonmarkPlugin = useCommonmarkPlugin();
  const prismPlugin = usePrismPlugin();
  const menuBarPlugin = useMenuBarPlugin();
  const listenerPlugin = useListenerPlugin({ onChange, debounceChange });

  useEditorViewPlugin();

  const editor = useEditor(
    root =>
      MilkdownEditor.make()
        .config(ctx => {
          ctx.set(rootCtx, root);
          ctx.set(defaultValueCtx, defaultMarkdownValue);
        })
        .use(commonmarkPlugin)
        .use(listenerPlugin)
        .use(prismPlugin)
        .use(history)
        .use(uploadPlugin)
        .use(mermaidPlugin)
        .use(mathPlugin)
        .use(slashPlugin)
        .use(trailing)
        .use(emoji)
        .use(clipboard)
        .use(menuBarPlugin)
        .use(gfmPlugin),
    [
      commonmarkPlugin,
      defaultMarkdownValue,
      listenerPlugin,
      menuBarPlugin,
      gfmPlugin,
      mathPlugin,
      mermaidPlugin,
      onChange,
      slashPlugin,
      uploadPlugin,
      prismPlugin,
    ]
  );

  const context = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};
