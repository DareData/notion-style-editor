import { commandsCtx } from '@milkdown/core';
import { toggleMark } from '@milkdown/prose/commands';
import { $command, $markAttr, $markSchema, $useKeymap } from '@milkdown/utils';

const underlineAttr = $markAttr('underline');

const underlineSchema = $markSchema('underline', ctx => ({
  inclusive: false,
  parseDOM: [
    { tag: 'u' },
    {
      getAttrs: value => (value === 'underline') as false,
    },
  ],
  toDOM: mark => ['u', ctx.get(underlineAttr.key)(mark)],
  parseMarkdown: {
    match: node => node.type === 'delete',
    runner: (state, node, markType) => {
      state.openMark(markType);
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: mark => mark.type.name === 'underline',
    runner: (state, mark) => {
      state.withMark(mark, 'delete');
    },
  },
}));

export const toggleUnderlineCommand = $command(
  'ToggleUnderline',
  () => () => toggleMark(underlineSchema.type())
);

const underlineKeymap = $useKeymap('underlineKeymap', {
  ToggleUnderline: {
    shortcuts: 'Mod-Alt-p',
    command: ctx => {
      const commands = ctx.get(commandsCtx);
      return () => commands.call(toggleUnderlineCommand.key);
    },
  },
});

export const useUnderlineCommand = () =>
  [
    underlineAttr,
    underlineSchema,
    toggleUnderlineCommand,
    underlineKeymap,
  ].flat();
