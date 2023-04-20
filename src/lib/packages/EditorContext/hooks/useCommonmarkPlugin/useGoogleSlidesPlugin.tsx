import { Node } from '@milkdown/prose/model';
import { Plugin, PluginKey } from '@milkdown/prose/state';
import { Decoration, DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useCallback, useMemo } from 'react';

import { GoogleSlidesWidget } from '../../../../components/GoogleSlidesWidget/GoogleSlidesWidget';
import { useTextEditorModeContext } from '../../../../components/TextEditorModeContext/useTextEditorModeContext';
import { useLinkDocAttributes } from '../../../../hooks/useLinkDocAttributes';

export const useGoogleSlidesPlugin = () => {
  const { mode } = useTextEditorModeContext();

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
              if (mode === 'active') {
                return DecorationSet.empty;
              }
              const googleSlidesLinks = getGoogleSlidesLinks(instance.doc);

              const decorations: Decoration[] = googleSlidesLinks.map(
                ({ href, end }) => createGoogleSlidesWidget(end, { href })
              );

              return DecorationSet.create(instance.doc, decorations);
            },
            apply(tr, value, oldState, newState) {
              if (mode === 'active') {
                return DecorationSet.empty;
              }

              if (oldState.doc.eq(newState.doc)) {
                return value;
              }

              const googleSlidesLinks = getGoogleSlidesLinks(newState.doc);

              const decorations: Decoration[] = googleSlidesLinks.map(
                ({ href, end }) => createGoogleSlidesWidget(end, { href })
              );

              return DecorationSet.create(newState.doc, decorations);
            },
          },
          props: {
            decorations(state) {
              return key.getState(state);
            },
          },
        });
      }),
    [mode, createGoogleSlidesWidget, getGoogleSlidesLinks]
  );

  return googleSlidesPlugin;
};
