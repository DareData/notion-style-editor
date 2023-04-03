import { SlashProvider } from '@milkdown/plugin-slash';
import { linkSchema } from '@milkdown/preset-commonmark';
import { findSelectedNodeOfType } from '@milkdown/prose';
import { TextSelection } from '@milkdown/prose/state';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useFindNodesByMark } from '../../../hooks/useFindNodesByMark';
import { useKeyboardList } from '../../../hooks/useKeyboardList';
import { useSelectedMarkPosition } from '../../../hooks/useSelectedMarkPosition';

type UseSlashProviderProps = {
  tooltipRef: React.RefObject<HTMLDivElement>;
};

export const useSlashProvider = ({ tooltipRef }: UseSlashProviderProps) => {
  const [isBodyKeyDownActive, setBodyKeyDownActive] = useState(false);

  const slashProviderRef = useRef<SlashProvider>();

  const [loading, getEditor] = useInstance();
  const { view, prevState } = usePluginViewContext();
  const { getNodesPositions } = useSelectedMarkPosition();

  const { keyboardListRefs, setActive, active } =
    useKeyboardList<HTMLButtonElement>({
      length: 10,
      onMount: false,
      onEscape: useCallback(() => {
        slashProviderRef.current?.hide();
      }, []),
      onEnter: useCallback(
        (
          e: KeyboardEvent,
          activeRef: React.RefObject<HTMLButtonElement> | null
        ) => {
          if (!activeRef) {
            return;
          }
          e.preventDefault();
          activeRef.current?.click();
        },
        []
      ),
      isBodyKeyDownActive: isBodyKeyDownActive,
    });

  useEffect(() => {
    const editor = getEditor();

    if (loading || !tooltipRef?.current || !editor) {
      return;
    }

    slashProviderRef.current ??= new SlashProvider({
      content: tooltipRef.current,
      shouldShow: view => {
        const { selection, tr } = view.state;
        const { empty, from, to } = selection;
        const isTextBlock = selection instanceof TextSelection;

        const isSlashChildren = tooltipRef.current?.contains(
          document.activeElement
        );
        const notHasFocus = !view.hasFocus() && !isSlashChildren;
        const isReadonly = !view.editable;

        if (notHasFocus || isReadonly || !empty || !isTextBlock) {
          return false;
        }

        if (from !== to) {
          return false;
        }

        const currentTextBlockContent = tr.doc.content.textBetween(
          from - 1,
          to
        );

        return currentTextBlockContent.includes('/');
      },
      tippyOptions: {
        arrow: false,
        onMount: () => {
          const [firstElementRef] = keyboardListRefs.current;
          if (firstElementRef) {
            setActive(0);
            setBodyKeyDownActive(true);
          }
        },
        onHide: () => {
          setActive(null);
          setBodyKeyDownActive(false);
        },
      },
    });

    return () => {
      slashProviderRef.current?.destroy();
    };
  }, [loading, getEditor, tooltipRef, keyboardListRefs, setActive]);

  useEffect(() => {
    slashProviderRef.current?.update(view, prevState);
  });

  return { keyboardListRefs, activeItemIndex: active };
};
