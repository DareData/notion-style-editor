import { Ctx } from '@milkdown/ctx';
import { tooltipFactory } from '@milkdown/plugin-tooltip';
import {
  bulletListSchema,
  codeBlockSchema,
  commonmark,
  imageSchema,
  orderedListSchema,
} from '@milkdown/preset-commonmark';
import { $view, $command } from '@milkdown/utils';
import {
  useNodeViewFactory,
  usePluginViewFactory,
} from '@prosemirror-adapter/react';
import { wrapInList } from 'prosemirror-schema-list';
import { useMemo } from 'react';

import { useGoogleSlidesPlugin } from './useGoogleSlidesPlugin';
import { CodeBlockNode } from '../../../../components/CodeBlockNode/CodeBlockNode';
import { DocumentNode } from '../../../../components/DocumentNode/DocumentNode';
import { LinkTooltip } from '../../../../components/LinkTooltip/LinkTooltip';

const linkTooltip = tooltipFactory('HYPERLINK');

export const wrapEntireInBulletListCommand = $command(
  'WrapEntireInBulletListCommand',
  ctx => () => wrapInList(bulletListSchema.type(ctx))
);

export const wrapEntireInOrderedListCommand = $command(
  'WrapEntireInOrderedListCommand',
  ctx => () => wrapInList(orderedListSchema.type(ctx))
);

export const useCommonmarkPlugin = () => {
  const nodeViewFactory = useNodeViewFactory();
  const googleSlidesPlugin = useGoogleSlidesPlugin();
  const pluginViewFactory = usePluginViewFactory();

  const commonMarkPlugin = useMemo(
    () =>
      [
        commonmark,
        linkTooltip,
        (ctx: Ctx) => () => {
          ctx.set(linkTooltip.key, {
            view: pluginViewFactory({
              component: LinkTooltip,
            }),
          });
        },
        $view(codeBlockSchema.node, () =>
          nodeViewFactory({ component: CodeBlockNode, as: 'div' })
        ),
        $view(imageSchema.node, () =>
          nodeViewFactory({ component: DocumentNode, as: 'div' })
        ),
        googleSlidesPlugin,
        wrapEntireInBulletListCommand,
        wrapEntireInOrderedListCommand,
      ].flat(),
    [pluginViewFactory, nodeViewFactory, googleSlidesPlugin]
  );

  return commonMarkPlugin;
};
