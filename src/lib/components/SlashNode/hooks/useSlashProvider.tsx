import { SlashProvider } from '@milkdown/plugin-slash';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { useKeyboardList } from '../../../hooks/useKeyboardList';

type UseSlashProviderProps = {
  tooltipRef: React.RefObject<HTMLDivElement>;
};

export const useSlashProvider = ({ tooltipRef }: UseSlashProviderProps) => {
  const [isBodyKeyDownActive, setBodyKeyDownActive] = useState(false);

  const slashProviderRef = useRef<SlashProvider>();

  const [loading, getEditor] = useInstance();
  const { view, prevState } = usePluginViewContext();

  const { keyboardListRefs, setActive } = useKeyboardList<HTMLButtonElement>({
    length: 10,
    onMount: false,
    onEscape: useCallback(() => {
      slashProviderRef.current?.hide();
    }, []),
    isBodyKeyDownActive: isBodyKeyDownActive,
    onActiveChange: useCallback(buttonRef => buttonRef.focus(), []),
  });

  useEffect(() => {
    const editor = getEditor();

    if (loading || !tooltipRef?.current || !editor) {
      return;
    }

    slashProviderRef.current ??= new SlashProvider({
      content: tooltipRef.current,
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

  return { keyboardListRefs };
};
