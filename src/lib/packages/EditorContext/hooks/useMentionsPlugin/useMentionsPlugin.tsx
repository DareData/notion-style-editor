import { expectDomTypeError } from '@milkdown/exception';
import { $remark, $markSchema, $markAttr } from '@milkdown/utils';
import { PhrasingContent, Nodes } from 'mdast';
import { findAndReplace, ReplaceFunction } from 'mdast-util-find-and-replace';
import { useMemo } from 'react';

export const mentionsAttr = $markAttr('mentions');

export const mentionsSchema = $markSchema('mentions', ctx => ({
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
  toDOM: mark => [
    'span',
    { ...ctx.get(mentionsAttr.key)(mark), ...mark.attrs },
  ],
  parseMarkdown: {
    match: node => node.type === 'mentions',
    runner: (state, node, markType) => {
      const username = node.username as string;
      state.openMark(markType, { 'data-mentions-username': username });
      state.next(node.children);
      state.closeMark(markType);
    },
  },
  toMarkdown: {
    match: mark => mark.type.name === 'mentions',
    runner: (state, mark) => {
      state.withMark(mark, 'mentions', undefined, {
        'data-mentions-username': mark.attrs.username,
      });
    },
  },
}));

const userGroup = '[\\da-z][-\\da-z_]{0,38}';
const mentionRegex = new RegExp('(?:^|\\s)@(' + userGroup + ')', 'gi');
const remarkMentions = () => {
  const replaceMention: ReplaceFunction = (value: string, username: string) => {
    const whitespace: PhrasingContent[] = [];

    if (value.indexOf('@') > 0) {
      whitespace.push({
        type: 'text',
        value: value.substring(0, value.indexOf('@')),
      });
    }

    return [
      ...whitespace,
      {
        type: 'mentions',
        username,
        children: [{ type: 'text', value: value.trim() }],
      },
    ] as any[];
  };

  return (tree: Nodes) => {
    findAndReplace(tree, [[mentionRegex, replaceMention]]);
  };
};

const remarkMentionsPlugin = $remark('mentions', () => remarkMentions);

export const useMentionsPlugin = () => {
  const mentionsPlugin = useMemo(
    () => [mentionsAttr, mentionsSchema, remarkMentionsPlugin].flat(),
    []
  );

  return mentionsPlugin;
};
