import { createRef, useCallback, useEffect, useRef, useState } from 'react';

import { useBodyKeyDown, UseBodyKeyDownOptions } from './useBodyKeyDown';

type UseKeyboardListProps<T extends Element> = {
  length: number;
  onEnter?: (e: KeyboardEvent, activeRef: React.RefObject<T> | null) => void;
  onEscape?: (e: KeyboardEvent) => void;
} & UseBodyKeyDownOptions;

export const useKeyboardList = <T extends Element>({
  length,
  onEnter,
  onEscape,
  ...options
}: UseKeyboardListProps<T>) => {
  const [active, setActive] = useState<number | null>(null);
  const keyboardListRefs = useRef<React.RefObject<T>[]>([]);

  useEffect(() => {
    if (length) {
      keyboardListRefs.current = Array.from({ length }, () => createRef<T>());
    }
  }, [length]);

  const onArrowDown = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const onArrowUp = useCallback((e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
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

  const activeRef = active ? keyboardListRefs.current[active] : null;

  useBodyKeyDown({
    Enter: useCallback(
      (e: KeyboardEvent) => onEnter?.(e, activeRef),
      [activeRef, onEnter]
    ),
    Escape: onEscape,
    options,
    ArrowUp: onArrowUp,
    ArrowDown: onArrowDown,
  });

  return { keyboardListRefs, setActive, active };
};
