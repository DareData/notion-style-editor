import { MarkType } from '@milkdown/prose/model';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { useFindNodesByMark } from './useFindNodesByMark';

export const useSelectedMarkPosition = () => {
  const { getNodesByMark } = useFindNodesByMark();

  const getNodesPositions = useCallback(
    (view: EditorView, markType: MarkType) => {
      const { state } = view;

      return getNodesByMark(state.doc, markType).map(link => ({
        end: link.pos + link.node.nodeSize,
        start: link.pos,
        text: link.node.text ?? '',
      }));
    },
    [getNodesByMark]
  );

  const getSelectedMarkPosition = useCallback(
    (view: EditorView, markType: MarkType) => {
      const { state } = view;
      const { selection } = state;

      return getNodesPositions(view, markType).find(
        ({ start, end }) => selection.from > start && selection.to < end
      );
    },
    [getNodesPositions]
  );

  return { getSelectedMarkPosition, getNodesPositions };
};
