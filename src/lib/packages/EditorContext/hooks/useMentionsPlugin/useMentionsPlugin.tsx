import { editorViewCtx } from '@milkdown/core';
import { Ctx } from '@milkdown/ctx';
import { linkSchema } from '@milkdown/preset-commonmark';
import { posToDOMRect } from '@milkdown/prose';
import { Plugin, PluginKey, Selection } from '@milkdown/prose/state';
import { DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MentionsWidget } from '../../../../components/MentionsWidget/MentionsWidget';

export type MentionsPluginAttrs = {
  active: boolean;
  range: {
    to: number;
    from: number;
  };
  queryText: string | undefined;
};

const mentionsRegex = new RegExp('(^|\\s)@([\\w-\\+]+)$');
const computeStateFromSelection = (
  ctx: Ctx,
  selection: Selection
): MentionsPluginAttrs | undefined => {
  const { $from } = selection;

  const parastart = $from.before();
  const text = $from.doc.textBetween(parastart, $from.pos, '\n', '\0');
  const match = text.match(mentionsRegex);

  if (match) {
    const { index = 0 } = match;
    const [value, , queryText] = match;

    match.index = value.startsWith(' ') ? index + 1 : match.index;
    match[0] = value.trim();

    const from = $from.start() + (match.index as number);
    const to = from + match[0].length;

    const isLink = $from.doc.rangeHasMark(from, to, linkSchema.type(ctx));

    if (isLink) {
      return undefined;
    }

    return {
      active: true,
      range: { from: from, to: to },
      queryText: queryText,
    };
  }

  return undefined;
};

const getInitState = (): MentionsPluginAttrs => ({
  active: false,
  range: {
    to: 0,
    from: 0,
  },
  queryText: 'krzys',
});

export const useMentionsPlugin = () => {
  const widgetViewFactory = useWidgetViewFactory();

  const proseMentionsPlugin = useMemo(
    () =>
      $prose(ctx => {
        const key = new PluginKey<MentionsPluginAttrs>('MENTIONS_PLUGIN');
        return new Plugin({
          key,
          state: {
            init() {
              return getInitState();
            },
            apply(tr) {
              const newState = getInitState();
              const { selection } = tr;

              if (selection.from !== selection.to) {
                return newState;
              }

              const stateFromSelection = computeStateFromSelection(
                ctx,
                selection
              );

              if (stateFromSelection) {
                return stateFromSelection;
              }

              return newState;
            },
          },
          props: {
            decorations(state) {
              const newState = key.getState(state);

              if (newState?.active) {
                const { range } = newState;
                const editorView = ctx.get(editorViewCtx);

                const { top, left } = posToDOMRect(
                  editorView,
                  range.from,
                  range.to
                );

                const div = document.createElement('div');
                div.style.position = 'fixed';
                div.style.top = `${top + 24}px`;
                div.style.left = `${left}px`;
                div.style.zIndex = '100000';

                const createWidget = widgetViewFactory({
                  as: div,
                  component: MentionsWidget,
                });

                return DecorationSet.create(state.tr.doc, [
                  createWidget(newState.range.from, newState),
                ]);
              }

              return DecorationSet.empty;
            },
          },
        });
      }),
    [widgetViewFactory]
  );

  const mentionsPlugin = useMemo(
    () => [proseMentionsPlugin].flat(),
    [proseMentionsPlugin]
  );

  return mentionsPlugin;
};
