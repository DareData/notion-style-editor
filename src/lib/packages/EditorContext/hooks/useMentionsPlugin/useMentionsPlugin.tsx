import { Meta, MilkdownPlugin } from '@milkdown/ctx';
import { expectDomTypeError } from '@milkdown/exception';
import { wrappingInputRule } from '@milkdown/prose/inputrules';
import { $nodeAttr, $nodeSchema, $inputRule } from '@milkdown/utils';
import { useMemo } from 'react';

const withMeta = <T extends MilkdownPlugin>(
  plugin: T,
  meta: Partial<Meta> & Pick<Meta, 'displayName'>
): T => {
  Object.assign(plugin, {
    meta: {
      package: '@milkdown/plugin-mentions',
      ...meta,
    },
  });

  return plugin;
};

export const mentionsAttr = $nodeAttr('mentions');

withMeta(mentionsAttr, {
  displayName: 'Attr<mentions>',
  group: 'Mentions',
});

export const mentionsSchema = $nodeSchema('mentions', ctx => ({
  content: 'block+',
  group: 'block',
  attrs: {
    value: {},
    label: {},
  },
  parseDOM: [
    {
      tag: 'span[value][label]',
      getAttrs: dom => {
        if (!(dom instanceof HTMLElement)) {
          throw expectDomTypeError(dom);
        }

        return {
          label: dom.getAttribute('label'),
          value: dom.getAttribute('value'),
        };
      },
    },
  ],
  toDOM: node => [
    'span',
    {
      ...ctx.get(mentionsAttr.key)(node),
      class: 'mention',
      value: node.attrs.value,
      label: node.attrs.label,
    },
    `@${node.attrs.label}`,
  ],
  parseMarkdown: {
    match: ({ type }) => type === 'mentions',
    runner: (state, node, type) => {
      const value = node.value as string;
      const label = node.label as string;
      state.openNode(type, { value, label });
      if (node.children) {
        state.next(node.children);
      } else {
        state.addText(label || 'Mentions!!');
      }
      state.closeNode();
    },
  },
  toMarkdown: {
    match: node => node.type.name === 'mentions',
    runner: (state, node) => {
      state.openNode('mentions', undefined, {
        value: node.attrs.value,
        label: node.attrs.label,
      });
      state.next(node.content);
      state.closeNode();
    },
  },
}));

withMeta(mentionsSchema.node, {
  displayName: 'NodeSchema<mentions>',
  group: 'Blockquote',
});

withMeta(mentionsSchema.ctx, {
  displayName: 'NodeSchemaCtx<mentions>',
  group: 'Mentions',
});

export const wrapInMentionsInputRule = $inputRule(ctx =>
  wrappingInputRule(/@.*?(?=\s@|$)/g, mentionsSchema.type(ctx))
);

withMeta(wrapInMentionsInputRule, {
  displayName: 'InputRule<wrapInMentionsInputRule>',
  group: 'Mentions',
});

export const useMentionsPlugin = () => {
  const mentionsPlugin = useMemo(
    () => [mentionsAttr, mentionsSchema, wrapInMentionsInputRule].flat(),
    []
  );

  return mentionsPlugin;
};
