import { Ctx } from '@milkdown/ctx';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { useMemo } from 'react';

import { useDebounce } from '../../../hooks/useDebounce';

type UseListenerPluginProps = {
  onChange: (markdown: string) => void;
  debounceChange?: number;
};

export const useListenerPlugin = ({
  onChange,
  debounceChange,
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
            onChangeDebounced(markdown);
          });
        },
      ].flat(),
    [onChangeDebounced]
  );

  return listenerPlugin;
};
