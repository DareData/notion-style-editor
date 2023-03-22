import { findChildrenByMark } from '@milkdown/prose';
import { MarkType } from '@milkdown/prose/model';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

export const useSelectedMarkPosition = () => {
  const getSelectedMarkPosition = useCallback(
    (view: EditorView, markType: MarkType) => {
      const { state } = view;
      const { selection } = state;

      return findChildrenByMark(state.doc, markType)
        .map(link => ({
          start: link.pos,
          end: link.pos + link.node.nodeSize,
        }))
        .find(({ start, end }) => selection.from > start && selection.to < end);
    },
    []
  );

  return { getSelectedMarkPosition };
};
