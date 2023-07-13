import { EditorStatus } from '@milkdown/core';
import { linkSchema } from '@milkdown/preset-commonmark';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { useMilkdownInstance } from './useMilkdownInstance';
import { useSelectedMarkPosition } from './useSelectedMarkPosition';

type LinkValues = {
  href: string;
  text?: string;
};

export const useEditorLinkActions = () => {
  const { getSelectedMarkPosition } = useSelectedMarkPosition();
  const { editor, loading } = useMilkdownInstance();

  const getLinkCreationTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
      if (!loading || !editor || editor.status !== EditorStatus.Created) {
        return;
      }
      const { ctx } = editor;
      const { state } = view;

      const link = linkSchema.type(ctx).create({ href: href });
      const node = state.schema.text(text || href).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    [loading, editor]
  );

  const getLinkUpdateTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
      if (!loading || !editor || editor.status !== EditorStatus.Created) {
        return;
      }
      const { ctx } = editor;
      const { state } = view;

      const linkPosition =
        ctx && getSelectedMarkPosition(view, linkSchema.type(ctx));

      if (linkPosition) {
        const link = linkSchema.type(ctx).create({ href: href });
        const node = state.schema.text(text || href).mark([link]);

        return state.tr.replaceRangeWith(
          linkPosition.start,
          linkPosition.end,
          node
        );
      }
    },
    [getSelectedMarkPosition, editor, loading]
  );

  return { getLinkCreationTransaction, getLinkUpdateTransaction };
};
