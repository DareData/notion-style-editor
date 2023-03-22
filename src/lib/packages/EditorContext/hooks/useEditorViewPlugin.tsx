import { editorViewOptionsCtx } from '@milkdown/core';
import { Ctx } from '@milkdown/ctx';
import { useInstance } from '@milkdown/react';
import { useEffect, useMemo } from 'react';

import { useTextEditorModeContext } from '../../../components/TextEditorModeContext/useTextEditorModeContext';

export const useEditorViewPlugin = () => {
  const [, getEditor] = useInstance();
  const { mode } = useTextEditorModeContext();

  const editor = useMemo(() => getEditor(), [getEditor]);

  const editorViewPlugin = useMemo(
    () =>
      [
        (ctx: Ctx) => () => {
          ctx.update(editorViewOptionsCtx, prev => ({
            ...prev,
            editable: () => mode === 'active',
          }));
        },
      ].flat(),
    [mode]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      const updateEditorViewPlugin = async () => {
        if (editor) {
          editor.use(editorViewPlugin);
          await editor.create();
        }
      };
      updateEditorViewPlugin();
    });
  }, [editor, editorViewPlugin]);

  return editorViewPlugin;
};
