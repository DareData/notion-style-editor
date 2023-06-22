import { InitReady, prosePluginsCtx } from '@milkdown/core';
import { createSlice, createTimer, Ctx, TimerType } from '@milkdown/ctx';
import { Plugin, PluginKey } from '@milkdown/prose/state';
import { EditorView } from '@milkdown/prose/view';
import { useMemo } from 'react';

import { useTextEditorContext } from '../../../components/TextEditorContext/useTextEditoContext';

const placeholderTimerCtx = createSlice([] as TimerType[], 'editorStateTimer');
const PlaceholderReady = createTimer('PlaceholderReady');

const key = new PluginKey('MILKDOWN_PLACEHOLDER');

export const usePlaceholderPlugin = () => {
  const { placeholder } = useTextEditorContext();

  const placeholderPlugin = useMemo(
    () =>
      [
        (ctx: Ctx) => {
          ctx.inject(placeholderTimerCtx, [InitReady]).record(PlaceholderReady);

          return async () => {
            await ctx.waitTimers(placeholderTimerCtx);

            const prosePlugins = ctx.get(prosePluginsCtx);

            const update = (view: EditorView) => {
              const doc = view.state.doc;
              if (
                view.editable &&
                doc.childCount === 1 &&
                doc.firstChild?.isTextblock &&
                doc.firstChild?.content.size === 0 &&
                doc.firstChild?.type.name === 'paragraph'
              ) {
                view.dom.setAttribute('data-placeholder', placeholder);
              } else {
                view.dom.removeAttribute('data-placeholder');
              }
            };

            const plugins = [
              ...prosePlugins,
              new Plugin({
                key,
                view(view) {
                  update(view);

                  return { update };
                },
              }),
            ];

            ctx.set(prosePluginsCtx, plugins);

            ctx.done(PlaceholderReady);
          };
        },
      ].flat(),
    [placeholder]
  );

  return placeholderPlugin;
};
