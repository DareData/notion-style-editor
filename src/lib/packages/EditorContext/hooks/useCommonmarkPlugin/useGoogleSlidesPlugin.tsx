import { Node } from '@milkdown/prose/model';
import { Plugin, PluginKey } from '@milkdown/prose/state';
import { Decoration, DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useCallback, useMemo } from 'react';

import { GoogleSlidesWidget } from '../../../../components/GoogleSlidesWidget';
import { useLinkDocAttributes } from '../../../../hooks/useLinkDocAttributes';

export const useGoogleSlidesPlugin = () => {
  const widgetViewFactory = useWidgetViewFactory();
  const { getLinkAttributes } = useLinkDocAttributes();

  const createGoogleSlidesWidget = useMemo(
    () =>
      widgetViewFactory({
        as: 'div',
        component: GoogleSlidesWidget,
      }),
    [widgetViewFactory]
  );

  const getGoogleSlidesLinks = useCallback(
    (node: Node) =>
      getLinkAttributes(node).filter(node =>
        node.href.includes('docs.google.com/presentation')
      ),
    [getLinkAttributes]
  );

  const googleSlidesPlugin = useMemo(
    () =>
      $prose(() => {
        const key = new PluginKey('MILKDOWN_GOOGLE_SLIDES_PLUGIN');
        return new Plugin({
          key,
          state: {
            init(config, instance) {
              const googleSlidesLinks = getGoogleSlidesLinks(instance.doc);

              const decorations: Decoration[] = googleSlidesLinks.map(link =>
                createGoogleSlidesWidget(link.end, { href: link.href })
              );

              return {
                decorations: DecorationSet.create(instance.doc, decorations),
                pos: 0,
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

              const googleSlidesLinks = getGoogleSlidesLinks(newState.doc);

              const decorations: Decoration[] = googleSlidesLinks.map(link =>
                createGoogleSlidesWidget(link.end, { href: link.href })
              );

              return {
                decorations: DecorationSet.create(tr.doc, decorations),
                pos: 0,
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
    [getGoogleSlidesLinks, createGoogleSlidesWidget]
  );

  return googleSlidesPlugin;
};
