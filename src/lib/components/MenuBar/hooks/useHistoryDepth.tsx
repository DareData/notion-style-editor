import { redoDepth, undoDepth } from '@milkdown/prose/history';
import { useWidgetViewContext } from '@prosemirror-adapter/react';

export const useHistoryDepth = () => {
  const { view } = useWidgetViewContext();
  const { state } = view;

  return {
    isRedoDisabled: redoDepth(state) === 0,
    isUndoDisabled: undoDepth(state) === 0,
  };
};
