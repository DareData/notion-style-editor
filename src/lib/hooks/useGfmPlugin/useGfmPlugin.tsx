import { Ctx } from '@milkdown/ctx';
import { tooltipFactory, TooltipProvider } from '@milkdown/plugin-tooltip';
import { gfm } from '@milkdown/preset-gfm';
import { $ctx } from '@milkdown/utils';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { useCallback } from 'react';

import { useTableSelectorPlugin } from './useTableSelectorPlugin';
import { TableTooltip } from '../../components/TableTooltip';

export const tableTooltip = tooltipFactory('TABLE');
export const tableTooltipCtx = $ctx<TooltipProvider | null, 'tableTooltip'>(
  null,
  'tableTooltip'
);

export const useGfmPlugin = () => {
  const pluginViewFactory = usePluginViewFactory();

  const { tableSelectorPlugin } = useTableSelectorPlugin();

  return useCallback(
    () =>
      [
        gfm,
        tableTooltip,
        tableTooltipCtx,
        (ctx: Ctx) => async () => {
          ctx.set(tableTooltip.key, {
            view: pluginViewFactory({
              component: TableTooltip,
            }),
          });
        },
        tableSelectorPlugin,
      ].flat(),
    [tableSelectorPlugin, pluginViewFactory]
  );
};
