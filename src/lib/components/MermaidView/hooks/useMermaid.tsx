import { useNodeViewContext } from '@prosemirror-adapter/react';
import mermaid from 'mermaid';
import { useCallback, useEffect, useMemo } from 'react';
import { useTheme } from 'styled-components';

type UseMermaidProps = {
  codePanelRef: React.RefObject<HTMLDivElement>;
};

export const useMermaid = ({ codePanelRef }: UseMermaidProps) => {
  const {
    components: { editor },
  } = useTheme();
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
    [codeValue, id, codePanelRef, editor]
  );

  useEffect(() => {
    renderMermaid();
  }, [renderMermaid]);
};
