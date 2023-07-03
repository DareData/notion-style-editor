import { linkSchema } from '@milkdown/preset-commonmark';
import { useInstance } from '@milkdown/react';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { useSelectedMarkPosition } from './useSelectedMarkPosition';

type LinkValues = {
  href: string;
  text?: string;
};

export const useEditorLinkActions = () => {
  const { getSelectedMarkPosition } = useSelectedMarkPosition();
  const [, getEditor] = useInstance();
  const ctx = getEditor()?.ctx;

  const getLinkCreationTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
      const { state } = view;

      if (!ctx) {
        return;
      }

      const link = linkSchema.type(ctx).create({ href: href });
      const node = state.schema.text(text || href).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    [ctx]
  );

  const getLinkUpdateTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
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
    [getSelectedMarkPosition, ctx]
  );

  return { getLinkCreationTransaction, getLinkUpdateTransaction };
};
