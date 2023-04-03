import { useCallback, useEffect } from 'react';

import { KeyboardCodesTypes, KeyboardMatcher } from '../utils/Keyboard';

export type UseBodyKeyDownOptions = {
  onMount?: boolean;
  isBodyKeyDownActive?: boolean;
};

type UseBodyKeyDownProps = Partial<
  Record<KeyboardCodesTypes, (e: KeyboardEvent) => void>
> & {
  options?: UseBodyKeyDownOptions;
};

export const useBodyKeyDown = ({
  Enter,
  Escape,
  ArrowUp,
  options,
  ArrowDown,
}: UseBodyKeyDownProps) => {
  const { onMount = true, isBodyKeyDownActive } = options || {};

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      KeyboardMatcher(e)
        .ArrowUp(() => ArrowUp?.(e))
        .ArrowDown(() => ArrowDown?.(e))
        .Escape(() => Escape?.(e))
        .Enter(() => Enter?.(e));
    },
    [Escape, ArrowDown, ArrowUp, Enter]
  );

  useEffect(() => {
    if (onMount) {
      document.body.addEventListener('keydown', onKeyDown);

      return () => document.body.removeEventListener('keydown', onKeyDown);
    }
  }, [onMount, onKeyDown]);

  useEffect(() => {
    if (isBodyKeyDownActive) {
      document.body.addEventListener('keydown', onKeyDown, false);

      return () =>
        document.body.removeEventListener('keydown', onKeyDown, false);
    }
  }, [isBodyKeyDownActive, onKeyDown]);
};
