import { Ctx } from '@milkdown/ctx';
import { slashFactory } from '@milkdown/plugin-slash';
import { usePluginViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { Slash } from '../../../components/Slash/Slash';
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
              component: Slash,
            }),
          });
        },
      ].flat(),
    [pluginViewFactory]
  );

  return slashPlugin;
};
