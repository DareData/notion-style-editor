import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { useCallback } from 'react';

import { useCallEditorCommand } from './useCallEditorCommand';
import { useMilkdownInstance } from './useMilkdownInstance';
import { insertMathCommand } from '../packages/EditorContext/hooks/useMathPlugin';

export const useInsertMathBlock = () => {
  const { onCallCommand } = useCallEditorCommand();
  const { editor, loading } = useMilkdownInstance();

  const onInsertMathBlock = useCallback(() => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
      return;
    }

    editor.action(ctx => {
      const view = ctx.get(editorViewCtx);
      const { state } = view;
      const { selection } = state;
      const { from, to } = selection;
      const value = state.tr.doc.textBetween(from, to) || '';
      onCallCommand(insertMathCommand.key, value);
    });
  }, [loading, editor, onCallCommand]);

  return { onInsertMathBlock };
};
