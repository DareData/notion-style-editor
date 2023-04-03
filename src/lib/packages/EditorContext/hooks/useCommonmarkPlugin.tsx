import { Ctx } from '@milkdown/ctx';
import { tooltipFactory } from '@milkdown/plugin-tooltip';
import {
  codeBlockSchema,
  commonmark,
  imageSchema,
  linkSchema,
} from '@milkdown/preset-commonmark';
import { $view } from '@milkdown/utils';
import {
  useNodeViewFactory,
  usePluginViewFactory,
} from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { CodeBlockNode } from '../../../components/CodeBlockNode';
import { ImageNode } from '../../../components/ImageNode/ImageNode';
import { LinkNode } from '../../../components/LinkNode/LinkNode';
import { LinkTooltip } from '../../../components/LinkTooltip/LinkTooltip';

const linkTooltip = tooltipFactory('HYPERLINK');

export const useCommonmarkPlugin = () => {
  const nodeViewFactory = useNodeViewFactory();
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
          nodeViewFactory({ component: ImageNode, as: 'div' })
        ),
        $view(linkSchema.mark, () =>
          nodeViewFactory({
            component: LinkNode,
            as: 'span',
            contentAs: 'span',
          })
        ),
      ].flat(),
    [pluginViewFactory, nodeViewFactory]
  );

  return commonMarkPlugin;
};
