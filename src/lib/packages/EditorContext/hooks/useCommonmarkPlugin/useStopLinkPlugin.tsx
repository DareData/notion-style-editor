import { commandsCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { MarkType } from '@milkdown/prose/model';
import { EditorState } from '@milkdown/prose/state';
import { $command, $useKeymap } from '@milkdown/utils';
import { useMemo } from 'react';

const hasLinkMark = (state: EditorState, linkSchema: MarkType) => {
  const { from, $from, to, empty } = state.selection;
  if (empty) {
    return !!linkSchema.isInSet(state.storedMarks || $from.marks());
  }
  return state.doc.rangeHasMark(from, to, linkSchema);
};

export const stopLinkCommand = $command('StopLink', ctx => () => {
  return (state, dispatch) => {
    const linkSchemaType = linkSchema.type(ctx);
    if (hasLinkMark(state, linkSchemaType)) {
      dispatch?.(state.tr.removeStoredMark(linkSchemaType));
    }
    return false;
  };
});

const linkCustomKeymap = $useKeymap('linkCustomKeymap', {
  StopLink: {
    shortcuts: ['Space'],
    command: ctx => {
      const commands = ctx.get(commandsCtx);
      return () => commands.call(stopLinkCommand.key);
    },
  },
});

export const useStopLinkPlugin = () => {
  const stopLinkPlugin = useMemo(
    () => [stopLinkCommand, linkCustomKeymap].flat(),
    []
  );

  return stopLinkPlugin;
};
