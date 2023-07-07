import { Ctx } from '@milkdown/ctx';
import { linkSchema } from '@milkdown/preset-commonmark';
import { Node } from '@milkdown/prose/model';
import { useCallback } from 'react';

import { useFindNodesByMark } from './useFindNodesByMark';

export const useLinkDocAttributes = () => {
  const { getNodesByMark } = useFindNodesByMark();

  const getLinkAttributes = useCallback(
    (ctx: Ctx, node: Node) => {
      return getNodesByMark(node, linkSchema.type(ctx)).map(
        ({ pos: start, node }) => {
          const {
            nodeSize,
            marks: [link],
          } = node;
          const end = start + nodeSize;
          const href: string = link.attrs?.href || '';
          return { start, end, href };
        }
      );
    },
    [getNodesByMark]
  );

  return { getLinkAttributes };
};
