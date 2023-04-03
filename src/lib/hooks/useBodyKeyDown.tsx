import { useEffect } from 'react';

import { KeyboardCodesTypes, KeyboardMatcher } from '../utils/Keyboard';

type UseBodyKeyDownProps = Partial<Record<KeyboardCodesTypes, () => void>>;

export const useBodyKeyDown = ({
  ArrowDown,
  ArrowUp,
  Escape,
}: UseBodyKeyDownProps) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      KeyboardMatcher(e)
        .ArrowUp(() => ArrowUp?.())
        .ArrowDown(() => ArrowDown?.())
        .Escape(() => Escape?.());
    };

    document.body.addEventListener('keydown', onKeyDown);

    return () => document.body.removeEventListener('keydown', onKeyDown);
  }, [Escape, ArrowDown, ArrowUp]);
};
