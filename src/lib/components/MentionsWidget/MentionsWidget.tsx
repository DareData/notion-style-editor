import { EditorStatus, editorViewCtx } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { useWidgetViewContext } from '@prosemirror-adapter/react';

import { useMilkdownInstance } from '../../hooks/useMilkdownInstance';
import { MentionsPluginAttrs } from '../../packages/EditorContext/hooks/useMentionsPlugin/useMentionsPlugin';
import { useTextEditorContext } from '../TextEditorContext/useTextEditorContext';

export type MentionsListDropdownProps = {
  queryText: string;
  onMentionItemClick: (value: string, href: string) => void;
};

export const MentionsWidget: React.FC = () => {
  const { spec } = useWidgetViewContext();
  const { editor, loading } = useMilkdownInstance();
  const { components } = useTextEditorContext();

  const { queryText = '', range } = spec as NonNullable<MentionsPluginAttrs>;

  const onMentionItemClick = (value: string, href: string) => {
    if (editor && !loading && editor.status === EditorStatus.Created) {
      editor.action(ctx => {
        const view = ctx.get(editorViewCtx);

        const { state } = view;

        const link = linkSchema.type(ctx).create({ href });
        const node = state.schema.text(`@${value}`).mark([link]);
        const tr = state.tr.replaceWith(range.from, range.to, node);
        view.dispatch(tr);
      });
    }
  };

  if (!components?.MentionsListDropdown) {
    return <div style={{ background: 'red' }}>kwa</div>;
  }

  return (
    <components.MentionsListDropdown
      queryText={queryText}
      onMentionItemClick={onMentionItemClick}
    />
  );
};
