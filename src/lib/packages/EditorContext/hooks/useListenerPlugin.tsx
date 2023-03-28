import { Ctx } from '@milkdown/ctx';
import { listener, listenerCtx } from '@milkdown/plugin-listener';
import { useCallback, useMemo } from 'react';

type UseListenerPluginProps = {
  onChange: (markdown: string) => void;
};

export const useListenerPlugin = ({ onChange }: UseListenerPluginProps) => {
  const onMarkdownUpdated = useCallback(
    (markdown: string) => {
      onChange(markdown);
    },
    [onChange]
  );

  const listenerPlugin = useMemo(
    () =>
      [
        listener,
        (ctx: Ctx) => () => {
          ctx.get(listenerCtx).markdownUpdated((_, markdown) => {
            onMarkdownUpdated(markdown);
          });
        },
      ].flat(),
    [onMarkdownUpdated]
  );

  return listenerPlugin;
};
