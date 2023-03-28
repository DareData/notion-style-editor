import {
  Editor as MilkdownEditor,
  rootCtx,
  defaultValueCtx,
} from '@milkdown/core';
import { history } from '@milkdown/plugin-history';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { prism, prismConfig } from '@milkdown/plugin-prism';
import {
  codeBlockSchema,
  commonmark,
  imageSchema,
} from '@milkdown/preset-commonmark';
import { useEditor, UseEditorReturn } from '@milkdown/react';
import { $view } from '@milkdown/utils';
import {
  useNodeViewFactory,
  usePluginViewFactory,
} from '@prosemirror-adapter/react';
import { createContext, useMemo } from 'react';
import { refractor } from 'refractor/lib/common';

import { useEditorViewPlugin } from './hooks/useEditorViewPlugin';
import { useGfmPlugin } from './hooks/useGfmPlugin/useGfmPlugin';
import { useMathPlugin } from './hooks/useMathPlugin';
import { useMermaidPlugin } from './hooks/useMermaidPlugin';
import { useSlashPlugin } from './hooks/useSlashPlugin';
import { useUploadPlugin } from './hooks/useUploadPlugin';
import { CodeBlockNode } from '../../components/CodeBlockNode';
import { ImageNode } from '../../components/ImageNode/ImageNode';
import {
  LinkTooltip,
  linktooltip,
} from '../../components/LinkTooltip/LinkTooltip';

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
  const pluginViewFactory = usePluginViewFactory();

  const gfmPlugin = useGfmPlugin();
  const mathPlugin = useMathPlugin();
  const uploadPlugin = useUploadPlugin();
  const mermaidPlugin = useMermaidPlugin();
  const slashPlugin = useSlashPlugin();
  useEditorViewPlugin();

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
          ctx.set(linktooltip.key, {
            view: pluginViewFactory({
              component: LinkTooltip,
            }),
          });
        })
        .use(listener)
        .use(commonmark)
        .use(history)
        .use(prism)
        .use(linktooltip)
        .use(uploadPlugin)
        .use(mermaidPlugin)
        .use(mathPlugin)
        .use(slashPlugin)
        .use(
          $view(codeBlockSchema.node, () =>
            nodeViewFactory({ component: CodeBlockNode, as: 'div' })
          )
        )
        .use(
          $view(imageSchema.node, () =>
            nodeViewFactory({ component: ImageNode, as: 'div' })
          )
        )
        .use(gfmPlugin),
    [
      defaultMarkdownValue,
      gfmPlugin,
      mathPlugin,
      mermaidPlugin,
      nodeViewFactory,
      onChange,
      slashPlugin,
      pluginViewFactory,
      uploadPlugin,
    ]
  );

  const context = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
  );
};
