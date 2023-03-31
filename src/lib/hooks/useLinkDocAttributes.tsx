import { linkSchema } from '@milkdown/preset-commonmark';
import { Node } from '@milkdown/prose/model';
import { useCallback } from 'react';

import { useFindNodesByMark } from './useFindNodesByMark';

export const useLinkDocAttributes = () => {
  const { getNodesByMark } = useFindNodesByMark();

  const getLinkAttributes = useCallback(
    (node: Node) =>
      getNodesByMark(node, linkSchema.type()).map(({ pos: start, node }) => {
        const {
          nodeSize,
          marks: [link],
        } = node;
        const end = start + nodeSize;
        const href = link.attrs?.href;
        return { start, end, href };
      }),
    [getNodesByMark]
  );

  return { getLinkAttributes };
};
