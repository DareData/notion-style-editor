import { linkSchema } from '@milkdown/preset-commonmark';
import { Plugin, PluginKey } from '@milkdown/prose/state';
import { DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { GoogleSlidesWidget } from '../../../../components/GoogleSlidesWidget';
import { useFindNodesByMark } from '../../../../hooks/useFindNodesByMark';

export const useGoogleSlidesPlugin = () => {
  const widgetViewFactory = useWidgetViewFactory();
  const createWidget = widgetViewFactory({
    as: 'div',
    component: GoogleSlidesWidget,
  });
  const { getNodesByMark } = useFindNodesByMark();

  const googleSlidesPlugin = useMemo(
    () =>
      $prose(() => {
        const key = new PluginKey('MILKDOWN_GOOGLE_SLIDES_PLUGIN');
        return new Plugin({
          key,
          state: {
            init() {
              return {
                pos: 0,
                decorations: DecorationSet.empty,
              };
            },
            apply(
              tr,
              value: { decorations: DecorationSet; pos: number },
              oldState,
              newState
            ) {
              if (oldState.doc.eq(newState.doc)) {
                return value;
              }

              const links = getNodesByMark(newState.doc, linkSchema.type())
                .map(({ pos: start, node }) => {
                  const {
                    nodeSize,
                    marks: [link],
                  } = node;
                  const end = start + nodeSize;
                  const href = link.attrs?.href;
                  return { start, end, href };
                })
                .filter(nodeProperties =>
                  nodeProperties.href.includes('docs.google.com/presentation')
                );

              if (links.length) {
                return {
                  decorations: DecorationSet.create(
                    tr.doc,
                    links.map(link =>
                      createWidget(link.end, { href: link.href })
                    )
                  ),
                  pos: 0,
                };
              }

              return {
                pos: 0,
                decorations: DecorationSet.empty,
              };
            },
          },
          props: {
            decorations(state) {
              return key.getState(state).decorations;
            },
          },
        });
      }),
    [getNodesByMark]
  );

  return googleSlidesPlugin;
};
