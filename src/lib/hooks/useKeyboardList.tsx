import { createRef, useCallback, useEffect, useRef, useState } from 'react';

import { useBodyKeyDown, UseBodyKeyDownOptions } from './useBodyKeyDown';

type UseKeyboardListProps<T extends Element> = {
  length: number;
  onEscape?: () => void;
  onActiveChange: (ref: T) => void;
} & UseBodyKeyDownOptions;

export const useKeyboardList = <T extends Element>({
  length,
  onEscape,
  onActiveChange,
  ...options
}: UseKeyboardListProps<T>) => {
  const [active, setActive] = useState<number | null>(null);
  const keyboardListRefs = useRef<React.RefObject<T>[]>([]);

  useEffect(() => {
    if (length) {
      keyboardListRefs.current = Array.from({ length }, () => createRef<T>());
    }
  }, [length]);

  const onArrowDown = useCallback(() => {
    const { length: listLength } = keyboardListRefs.current;
    setActive(prevActive => {
      if (typeof prevActive !== 'number') {
        return 0;
      }
      if (prevActive === listLength - 1) {
        return 0;
      }
      return prevActive + 1;
    });
  }, []);

  const onArrowUp = useCallback(() => {
    const { length: listLength } = keyboardListRefs.current;
    setActive(prevActive => {
      if (typeof prevActive !== 'number') {
        return 0;
      }
      if (prevActive === 0) {
        return listLength - 1;
      }
      return prevActive - 1;
    });
  }, []);

  useBodyKeyDown({
    Escape: onEscape,
    options,
    ArrowUp: onArrowUp,
    ArrowDown: onArrowDown,
  });

  useEffect(() => {
    if (typeof active === 'number') {
      const activeRef = keyboardListRefs.current[active];
      if (activeRef && activeRef.current) {
        onActiveChange(activeRef.current);
      }
    }
  }, [active, keyboardListRefs, onActiveChange]);

  return { keyboardListRefs, setActive };
};
