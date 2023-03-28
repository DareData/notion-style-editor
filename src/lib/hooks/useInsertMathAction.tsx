import { editorViewCtx } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import { useCallback } from 'react';

import { useCallEditorCommand } from './useCallEditorCommand';
import { insertMathCommand } from '../packages/EditorContext/hooks/useMathPlugin';

export const useInsertMathBlock = () => {
  const { onCallCommand } = useCallEditorCommand();
  const [loading, getEditor] = useInstance();

  const onInsertMathBlock = useCallback(() => {
    const editor = getEditor();

    if (loading || !editor) {
      return;
    }

    editor.action(ctx => {
      // const view = ctx.get(editorViewCtx);
      // const { state } = view;
      // const { selection } = state;
      // const { from, to } = selection;
      // const value = state.tr.doc.textBetween(from, to) || '';
      onCallCommand(insertMathCommand.key);
    });
  }, [loading, getEditor, onCallCommand]);

  return { onInsertMathBlock };
};
