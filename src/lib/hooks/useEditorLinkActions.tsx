import { linkSchema } from '@milkdown/preset-commonmark';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { useSelectedMarkPosition } from './useSelectedMarkPosition';

type LinkValues = {
  href: string;
  text?: string;
};

export const useEditorLinkActions = () => {
  const { getSelectedMarkPosition } = useSelectedMarkPosition();

  const getLinkCreationTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
      const { state } = view;

      const link = linkSchema.type().create({ href: href });
      const node = state.schema.text(text || href).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    []
  );

  const getLinkUpdateTransaction = useCallback(
    (view: EditorView, { href, text }: LinkValues) => {
      const { state } = view;

      const linkPosition = getSelectedMarkPosition(view, linkSchema.type());

      if (linkPosition) {
        const link = linkSchema.type().create({ href: href });
        const node = state.schema.text(text || href).mark([link]);

        return state.tr.replaceRangeWith(
          linkPosition.start,
          linkPosition.end,
          node
        );
      }
    },
    [getSelectedMarkPosition]
  );

  return { getLinkCreationTransaction, getLinkUpdateTransaction };
};
