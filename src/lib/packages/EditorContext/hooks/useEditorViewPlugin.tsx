import { editorViewOptionsCtx } from '@milkdown/core';
import { Ctx } from '@milkdown/ctx';
import { useInstance } from '@milkdown/react';
import { useEffect } from 'react';

import { useTextEditorModeContext } from '../../../components/TextEditorModeContext/useTextEditorModeContext';

export const useEditorViewPlugin = () => {
  const [loading, getEditor] = useInstance();
  const { mode } = useTextEditorModeContext();

  useEffect(() => {
    const effect = async () => {
      const editor = getEditor();

      if (loading || !editor) {
        return;
      }

      editor.use(
        [
          (ctx: Ctx) => () => {
            ctx.update(editorViewOptionsCtx, prev => ({
              ...prev,
              editable: () => mode === 'active',
            }));
          },
        ].flat()
      );

      await editor.create();
    };

    requestAnimationFrame(() => {
      effect();
    });
  }, [loading, getEditor, mode]);
};
