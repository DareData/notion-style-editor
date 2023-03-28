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
      const view = ctx.get(editorViewCtx);
      const { state } = view;
      const value = state.doc.content.firstChild?.textContent || '';
      onCallCommand(insertMathCommand.key, value);
    });
  }, [loading, getEditor, onCallCommand]);

  return { onInsertMathBlock };
};
