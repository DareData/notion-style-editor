import { CmdKey, EditorStatus } from '@milkdown/core';
import { callCommand } from '@milkdown/utils';
import { useCallback } from 'react';

import { useMilkdownInstance } from './useMilkdownInstance';

export const useCallEditorCommand = () => {
  const { editor, loading } = useMilkdownInstance();

  const onCallCommand = useCallback(
    <T,>(command: CmdKey<T>, payload?: T | undefined) => {
      if (!loading || !editor || editor.status !== EditorStatus.Created) {
        return;
      }

      editor.action(callCommand(command, payload));
    },
    [editor, loading]
  );

  return { onCallCommand };
};
