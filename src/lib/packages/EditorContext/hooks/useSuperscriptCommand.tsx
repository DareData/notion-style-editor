import { commandsCtx } from '@milkdown/core';
import { toggleMark } from '@milkdown/prose/commands';
import { $command, $markAttr, $markSchema, $useKeymap } from '@milkdown/utils';
import { useMemo } from 'react';

const superscriptAttr = $markAttr('superscript');

const superscriptSchema = $markSchema('superscript', ctx => ({
  parseDOM: [{ tag: 'sup' }],
  toDOM: mark => ['sup', ctx.get(superscriptAttr.key)(mark)],
  parseMarkdown: {
    match: node => node.type === 'superscript',
    runner: (state, node, markType) => {
      state.openMark(markType);
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: mark => mark.type.name === 'superscript',
    runner: (state, mark) => {
      state.withMark(mark, 'superscript');
    },
  },
}));

export const toggleSuperscriptCommand = $command(
  'ToggleSuperscript',
  () => () => toggleMark(superscriptSchema.type())
);

const superscriptKeymap = $useKeymap('superscriptKeymap', {
  ToggleSuperscript: {
    shortcuts: 'Mod-Alt-.',
    command: ctx => {
      const commands = ctx.get(commandsCtx);
      return () => commands.call(toggleSuperscriptCommand.key);
    },
  },
});

export const useSuperscriptCommand = () => {
  const superscriptCommand = useMemo(
    () =>
      [
        superscriptAttr,
        superscriptSchema,
        toggleSuperscriptCommand,
        superscriptKeymap,
      ].flat(),
    []
  );

  return superscriptCommand;
};
