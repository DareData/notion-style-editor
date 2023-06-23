import { useNodeViewContext } from '@prosemirror-adapter/react';
import mermaid from 'mermaid';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTheme } from 'styled-components';

type UseMermaidProps = {
  codePanelRef: React.RefObject<HTMLDivElement>;
};

export const useMermaid = ({ codePanelRef }: UseMermaidProps) => {
  const {
    components: { editor },
  } = useTheme();
  const { node } = useNodeViewContext();
  const rendering = useRef(false);

  const id = node.attrs.identity;
  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  const renderMermaid = useCallback(
    async (canRetry = 3) => {
      const container = codePanelRef.current;
      if (!container) {
        return;
      }
      if (codeValue.length === 0) {
        return;
      }
      if (rendering.current) {
        return;
      }

      try {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          themeVariables: {
            primaryColor: editor.mermaid.primaryColor,
            primaryTextColor: editor.mermaid.primaryTextColor,
            primaryBorderColor: editor.mermaid.primaryBorderColor,
            lineColor: editor.mermaid.lineColor,
            secondaryColor: editor.mermaid.secondaryColor,
            tertiaryColor: editor.mermaid.tertiaryColor,
          },
        });
        rendering.current = true;
        const { svg, bindFunctions } = await mermaid.render(id, codeValue);
        rendering.current = false;
        container.innerHTML = svg;
        bindFunctions?.(container);
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
    [codeValue, id, codePanelRef, editor]
  );

  useEffect(() => {
    requestAnimationFrame(() => {
      renderMermaid();
    });
  }, [renderMermaid]);
};
