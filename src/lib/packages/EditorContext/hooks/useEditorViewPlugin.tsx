import { EditorStatus, editorViewOptionsCtx } from '@milkdown/core';
import { Ctx } from '@milkdown/ctx';
import { useEffect } from 'react';

import { useTextEditorContext } from '../../../components/TextEditorContext/useTextEditorContext';
import { useMilkdownInstance } from '../../../hooks/useMilkdownInstance';

export const useEditorViewPlugin = () => {
  const { loading, editor } = useMilkdownInstance();
  const { mode } = useTextEditorContext();

  useEffect(() => {
    const effect = async () => {
      if (loading || !editor || editor.status !== EditorStatus.Created) {
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
  }, [loading, editor, mode]);
};
