import { findChildrenByMark } from '@milkdown/prose';
import { MarkType } from '@milkdown/prose/model';
import { Node } from 'prosemirror-model';
import { useCallback } from 'react';

export const useFindNodesByMark = () => {
  const getNodesByMark = useCallback(
    (node: Node, markType: MarkType) => findChildrenByMark(node, markType),
    []
  );

  return { getNodesByMark };
};
