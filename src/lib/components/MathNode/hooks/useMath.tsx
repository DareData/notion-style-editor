import { EditorStatus } from '@milkdown/core';
import { katexOptionsCtx } from '@milkdown/plugin-math';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import katex from 'katex';
import { useEffect, useMemo } from 'react';

import { useMilkdownInstance } from '../../../hooks/useMilkdownInstance';

type UseMathProps = {
  codePanelRef: React.RefObject<HTMLDivElement>;
};

export const useMath = ({ codePanelRef }: UseMathProps) => {
  const { node } = useNodeViewContext();
  const { editor, loading } = useMilkdownInstance();

  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (editor && !loading && editor.status === EditorStatus.Created) {
        if (!codePanelRef.current) {
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
  }, [codeValue, loading, editor, codePanelRef]);
};
