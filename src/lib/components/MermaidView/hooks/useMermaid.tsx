import { useNodeViewContext } from '@prosemirror-adapter/react';
import mermaid from 'mermaid';
import { useCallback, useEffect, useMemo } from 'react';

type UseMermaidProps = {
  codePanelRef: React.RefObject<HTMLDivElement>;
};

export const useMermaid = ({ codePanelRef }: UseMermaidProps) => {
  const { node } = useNodeViewContext();

  const id = node.attrs.identity;
  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  const renderMermaid = useCallback(
    (canRetry = 3) => {
      const container = codePanelRef.current;
      if (!container) {
        return;
      }

      try {
        if (codeValue.length === 0) {
          return;
        }

        mermaid.initialize({
          startOnLoad: false,
        });
        mermaid.mermaidAPI.render(id, codeValue, (svg, bind) => {
          container.innerHTML = svg;
          bind?.(container);
        });
      } catch (e) {
        console.error(e);
        if (canRetry === 0) {
          return;
        }

        setTimeout(() => {
          renderMermaid(canRetry - 1);
        }, 200);
      }
    },
    [codeValue, id, codePanelRef]
  );

  useEffect(() => {
    renderMermaid();
  }, [renderMermaid]);
};
