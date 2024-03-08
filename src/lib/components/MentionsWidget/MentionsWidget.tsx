import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { MentionsPluginAttrs } from '../../packages/EditorContext/hooks/useMentionsPlugin/useMentionsPlugin';

const names = [
  'Adam',
  'Alex',
  'Emily',
  'Ethan',
  'Emma',
  'Jacob',
  'James',
  'Olivia',
  'Ava',
  'Noah',
  'Isabella',
  'Liam',
  'Sophia',
  'Michael',
  'Benjamin',
  'Mia',
  'Charlotte',
  'Amelia',
  'William',
  'Elijah',
];

export const MentionsWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const { editor, loading } = useMilkdownInstance();

  const { queryText = '', range } = spec as NonNullable<MentionsPluginAttrs>;

  const results = useMemo(
    () => names.filter(name => name.includes(queryText)),
    [queryText]
  );

  const onPersonClick = (value: string) => {
    if (editor && !loading && editor.status === EditorStatus.Created) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);

        const { state } = view;

        const link = linkSchema
          .type(ctx)
          .create({ href: `https://sciencehub.com/${value}` });
        const node = state.schema.text(`@${value}`).mark([link]);
        const tr = state.tr.replaceWith(range.from, range.to, node);
        view.dispatch(tr);
      });
    }
  };

  if (!results.length) {
    return <div style={{ backgroundColor: 'red' }}>No results</div>;
  }

  return (
    <div style={{ backgroundColor: 'red' }}>
      {results.map(name => (
        <button
          style={{ display: 'block' }}
          onClick={() => {
            console.log('focus');
          }}
          onFocus={() => {
            onPersonClick(name);
          }}
          key={name}
        >
          {name}
        </button>
      ))}
    </div>
  );
};
