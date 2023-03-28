import { linkSchema } from '@milkdown/preset-commonmark';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { LinkFormValues } from './useLinkForm';
import { useSelectedMarkPosition } from '../../../hooks/useSelectedMarkPosition';

export const useLinkActions = () => {
  const { getSelectedMarkPosition } = useSelectedMarkPosition();

  const getLinkCreationTransaction = useCallback(
    (view: EditorView, { href, text }: LinkFormValues) => {
      const { state } = view;

      const link = linkSchema.type().create({ href: href });
      const node = state.schema.text(text || href).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    []
  );

  const getLinkUpdateTransaction = useCallback(
    (view: EditorView, { href, text }: LinkFormValues) => {
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
