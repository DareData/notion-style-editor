import { commandsCtx } from '@milkdown/core';
import { toggleMark } from '@milkdown/prose/commands';
import { $command, $useKeymap, $markAttr, $markSchema } from '@milkdown/utils';
import { useMemo } from 'react';

export const subscriptAttr = $markAttr('subscript');

export const subscriptSchema = $markSchema('subscript', ctx => ({
  inclusive: false,
  parseDOM: [{ tag: 'sub' }],
  toDOM: mark => ['sub', ctx.get(subscriptAttr.key)(mark)],
  parseMarkdown: {
    match: node => node.type === 'subscript',
    runner: (state, node, markType) => {
      state.openMark(markType);
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: mark => mark.type.name === 'subscript',
    runner: (state, mark) => {
      state.withMark(mark, 'subscript');
    },
  },
}));

export const toggleSubscriptCommand = $command(
  'ToggleSubscript',
  () => () => toggleMark(subscriptSchema.type())
);

export const subscriptKeymap = $useKeymap('subscriptKeymap', {
  ToggleSubscript: {
    shortcuts: ['Mod-k'],
    command: ctx => {
      const commands = ctx.get(commandsCtx);
      return () => commands.call(toggleSubscriptCommand.key);
    },
  },
});

export const useSubscriptCommand = () => {
  const subscriptCommand = useMemo(
    () =>
      [
        subscriptAttr,
        subscriptSchema,
        toggleSubscriptCommand,
        subscriptKeymap,
      ].flat(),
    []
  );

  return subscriptCommand;
};
