import { expectDomTypeError } from '@milkdown/exception';
import { paragraphSchema } from '@milkdown/preset-commonmark';
import { InputRule } from '@milkdown/prose/inputrules';
import { $nodeSchema, $nodeAttr, $inputRule, $remark } from '@milkdown/utils';
import { useMemo } from 'react';
import directive from 'remark-directive';

const remarkDirective = $remark('mentions', () => directive);

export const mentionsAttr = $nodeAttr('mentions');

export const mentionsSchema = $nodeSchema('mentions', ctx => ({
  content: 'inline*',
  group: 'block',
  attrs: {
    'data-mentions-username': {},
  },
  parseDOM: [
    {
      tag: 'span[data-mentions-username]',
      getAttrs: dom => {
        if (!(dom instanceof HTMLElement)) {
          throw expectDomTypeError(dom);
        }

        return {
          username: dom.getAttribute('data-mentions-username'),
        };
      },
    },
  ],
  toDOM: node => [
    'span',
    { ...ctx.get(mentionsAttr.key)(node), ...node.attrs },
    0,
  ],
  parseMarkdown: {
    match: node => node.type === 'leafDirective' && node.name === 'mentions',
    runner: (state, node, type) => {
      const username = node.username as string;
      state.openNode(type, { 'data-mentions-username': username });
      state.next(node.children);
      state.closeNode();
    },
  },
  toMarkdown: {
    match: node => node.type.name === 'mentions',
    runner: (state, node) => {
      state.openNode('leafDirective', undefined, {
        name: 'mentions',
        'data-mentions-username': node.attrs['data-mentions-username'],
      });
      state.next(node.content);
      state.closeNode();
    },
  },
}));

const userGroup = '[\\da-z][-\\da-z_]{0,38}';
const mentionRegex = new RegExp('(?:^|\\s)@(' + userGroup + ')', 'gi');

const wrapInMentionsInputRule = $inputRule(
  ctx =>
    new InputRule(mentionRegex, (state, match, start, end) => {
      const [value, username = ''] = match;
      const { tr } = state;
      if (value) {
        tr.replaceWith(
          start,
          end,
          mentionsSchema
            .type(ctx)
            .create({ 'data-mentions-username': username })
        );
      }

      return tr;
    })
);

export const useMentionsPlugin = () => {
  const mentionsPlugin = useMemo(
    () =>
      [
        mentionsAttr,
        mentionsSchema,
        wrapInMentionsInputRule,
        remarkDirective,
      ].flat(),
    []
  );

  return mentionsPlugin;
};
