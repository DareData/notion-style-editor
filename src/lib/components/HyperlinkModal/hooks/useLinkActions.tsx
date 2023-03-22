import { linkSchema } from '@milkdown/preset-commonmark';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { HyperlinkFormValues } from './useHyperlinkForm';
import { useSelectedMarkPosition } from '../../../hooks/useSelectedMarkPosition';

export const useLinkActions = () => {
  const { getSelectedMarkPosition } = useSelectedMarkPosition();

  const getLinkCreationTransaction = useCallback(
    (view: EditorView, { href, text }: HyperlinkFormValues) => {
      const { state } = view;

      const link = linkSchema.type().create({ href: href });
      const node = state.schema.text(text).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    []
  );

  const getLinkUpdateTransaction = useCallback(
    (view: EditorView, { href, text, title = '' }: HyperlinkFormValues) => {
      const { state } = view;

      const linkPosition = getSelectedMarkPosition(view, linkSchema.type());

      if (linkPosition) {
        const link = linkSchema.type().create({ href: href, title });
        const node = state.schema.text(text).mark([link]);

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
