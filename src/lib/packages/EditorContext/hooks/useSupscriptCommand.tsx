import { commandsCtx } from '@milkdown/core';
import { toggleMark } from '@milkdown/prose/commands';
import { $command, $markAttr, $markSchema, $useKeymap } from '@milkdown/utils';
import { useMemo } from 'react';

const subscriptAttr = $markAttr('subscript');

const subscriptSchema = $markSchema('subscript', ctx => ({
  inclusive: false,
  parseDOM: [
    { tag: 'sub' },
    {
      getAttrs: value => (value === 'subscript') as false,
    },
  ],
  toDOM: mark => ['sub', ctx.get(subscriptAttr.key)(mark)],
  parseMarkdown: {
    match: node => node.type === 'delete',
    runner: (state, node, markType) => {
      state.openMark(markType);
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: mark => mark.type.name === 'subscript',
    runner: (state, mark) => {
      state.withMark(mark, 'delete');
    },
  },
}));

export const toggleSubscriptCommand = $command(
  'ToggleSubscript',
  () => () => toggleMark(subscriptSchema.type())
);

const subscriptKeymap = $useKeymap('subscriptKeymap', {
  ToggleSubscript: {
    shortcuts: 'Mod-Alt-.',
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
