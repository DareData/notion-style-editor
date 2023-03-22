import { linkSchema } from '@milkdown/preset-commonmark';
import { EditorView } from 'prosemirror-view';
import { useCallback } from 'react';

import { HyperlinkFormValues } from './useHyperlinkForm';

export const useLinkCreate = () => {
  const getTransactionWithLink = useCallback(
    (view: EditorView, { href, text }: HyperlinkFormValues) => {
      const { state } = view;

      const link = linkSchema.type().create({ href: href });
      const node = state.schema.text(text).mark([link]);
      return state.tr.replaceSelectionWith(node, false);
    },
    []
  );

  return { getTransactionWithLink };
};
