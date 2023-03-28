import { Ctx } from '@milkdown/ctx';
import { slashFactory } from '@milkdown/plugin-slash';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { SlashNode } from '../../../components/SlashNode/SlashNode';
import { Plugin } from '../../../types/plugins';

const slash = slashFactory('MILKDOWN');

export const useSlashPlugin = (): Plugin => {
  const pluginViewFactory = usePluginViewFactory();

  const slashPlugin = useMemo(
    () =>
      [
        slash,
        (ctx: Ctx) => () => {
          ctx.set(slash.key, {
            view: pluginViewFactory({
              component: SlashNode,
            }),
          });
        },
      ].flat(),
    [pluginViewFactory]
  );

  return slashPlugin;
};
