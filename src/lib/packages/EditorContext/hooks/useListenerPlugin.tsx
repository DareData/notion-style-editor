import { Ctx } from '@milkdown/ctx';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { useMemo } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';

type UseListenerPluginProps = {
  onFocus?: () => void;
  onChange?: (markdown: string) => void;
  debounceChange?: number;
};

export const useListenerPlugin = ({
  onFocus,
  onChange,
  debounceChange = 0,
}: UseListenerPluginProps) => {
  const { debounce: onChangeDebounced } = useDebounce({
    callback: onChange,
    wait: debounceChange,
  });

  const listenerPlugin = useMemo(
    () =>
      [
        listener,
        (ctx: Ctx) => () => {
          ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
            onChangeDebounced?.(markdown);
          });
          ctx.get(listenerCtx).focus(() => {
            onFocus?.();
          });
        },
      ].flat(),
    [onChangeDebounced, onFocus]
  );

  return listenerPlugin;
};
