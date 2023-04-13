import { CmdKey } from '@milkdown/core';
import { useInstance } from '@milkdown/react';
import { callCommand } from '@milkdown/utils';
import { useCallback } from 'react';

export const useCallEditorCommand = () => {
  const [loading, getEditor] = useInstance();

  const onCallCommand = useCallback(
    <T,>(command: CmdKey<T>, payload?: T | undefined) => {
      const editor = getEditor();
      if (loading || !editor) {
        return;
      }

      editor.action(callCommand(command, payload));
    },
    [loading, getEditor]
  );

  return { onCallCommand };
};
