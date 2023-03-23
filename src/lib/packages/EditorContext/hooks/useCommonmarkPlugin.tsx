import { Ctx } from '@milkdown/ctx';
import { tooltipFactory } from '@milkdown/plugin-tooltip';
import { commonmark } from '@milkdown/preset-commonmark';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { HyperlinkTooltip } from '../../../../components/HyperlinkTooltip/HyperlinkTooltip';

const hyperlinktooltip = tooltipFactory('HYPERLINK');

export const useCommonmarkPlugin = () => {
  const pluginViewFactory = usePluginViewFactory();

  const commonMarkPlugin = useMemo(
    () =>
      [
        commonmark,
        hyperlinktooltip,
        (ctx: Ctx) => () => {
          ctx.set(hyperlinktooltip.key, {
            view: pluginViewFactory({
              component: HyperlinkTooltip,
            }),
          });
        },
      ].flat(),
    [pluginViewFactory, googleHyperlinkWidgetPlugin]
  );

  return commonMarkPlugin;
};
