import { katexOptionsCtx } from '@milkdown/plugin-math';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import katex from 'katex';
import { useEffect, useMemo } from 'react';

type UseMathProps = {
  codePanelRef: React.RefObject<HTMLDivElement>;
};

export const useMath = ({ codePanelRef }: UseMathProps) => {
  const { node } = useNodeViewContext();
  const [loading, getEditor] = useInstance();

  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const editor = getEditor();
      if (editor) {
        if (!codePanelRef.current || loading) {
          return;
        }
        try {
          katex.render(
            codeValue,
            codePanelRef.current,
            editor.ctx.get(katexOptionsCtx.key)
          );
        } catch {
          /* empty */
        }
      }
    });
  }, [codeValue, getEditor, loading, codePanelRef]);
};
