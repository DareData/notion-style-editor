import { editorViewCtx } from '@milkdown/core';
import { SlashProvider } from '@milkdown/plugin-slash';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useCallback, useEffect, useRef } from 'react';

type UseSlashProviderProps = {
  tooltipRef: React.RefObject<HTMLDivElement>;
};

export const useSlashProvider = ({ tooltipRef }: UseSlashProviderProps) => {
  const slashProviderRef = useRef<SlashProvider>();

  const [loading, getEditor] = useInstance();
  const { view, prevState } = usePluginViewContext();

  const onKeydown = useCallback((e: KeyboardEvent, show: boolean) => {
    const key = e.key;
    if (show && (key === 'ArrowDown' || key === 'ArrowUp' || key === 'Enter')) {
      e.stopPropagation();
      e.preventDefault();
      // TODO: handle keyboard event here
    }
  }, []);

  useEffect(() => {
    const editor = getEditor();

    if (loading || !tooltipRef?.current || !editor) {
      return;
    }

    let show = false;
    slashProviderRef.current ??= new SlashProvider({
      content: tooltipRef.current,
      tippyOptions: {
        arrow: false,
        onShow: () => {
          show = true;
        },
        onHide: () => {
          show = false;
        },
      },
    });

    const root =
      editor.ctx.isInjected(editorViewCtx) && editor.ctx.get(editorViewCtx).dom;

    if (!root) {
      return;
    }

    root.addEventListener('keydown', e => onKeydown(e, show));

    return () => {
      root.removeEventListener('keydown', e => onKeydown(e, show));
      slashProviderRef.current?.destroy();
    };
  }, [loading, getEditor, tooltipRef, onKeydown]);

  useEffect(() => {
    slashProviderRef.current?.update(view, prevState);
  });
};
