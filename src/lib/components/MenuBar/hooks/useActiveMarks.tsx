import { EditorStatus } from '@milkdown/core';
import { emphasisSchema, strongSchema } from '@milkdown/preset-commonmark';
import { strikethroughSchema } from '@milkdown/preset-gfm';
import { Mark, MarkType, Node } from '@milkdown/prose/model';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { useMilkdownInstance } from '../../../hooks/useMilkdownInstance';

const doesRangeHasMark =
  (doc: Node, from: number, to: number) => (markType: MarkType) =>
    doc.rangeHasMark(from, to, markType);

const isMarkInSet = (marks: readonly Mark[]) => (markType: MarkType) =>
  !!markType.isInSet(marks);

export const useActiveMarks = () => {
  const { view } = useWidgetViewContext();
  const { state } = view;
  const { selection } = state;

  const { editor, loading } = useMilkdownInstance();

  const activeMarksMap = useMemo(() => {
    if (!editor || loading || editor.status !== EditorStatus.Created) {
      return {
        isStrongActive: false,
        isEmphasisActive: false,
        isStrikethroughActive: false,
      };
    }

    const { ctx } = editor;
    const { doc, storedMarks } = state;
    const { from, to, empty, $from } = selection;

    if (empty) {
      const isSchemaActive = isMarkInSet(storedMarks || $from.marks());

      return {
        isStrongActive: !!(ctx && isSchemaActive(strongSchema.type(ctx))),
        isEmphasisActive: !!(ctx && isSchemaActive(emphasisSchema.type(ctx))),
        isStrikethroughActive: !!(
          ctx && isSchemaActive(strikethroughSchema.type(ctx))
        ),
      };
    }

    const isSchemaActive = doesRangeHasMark(doc, from, to);

    return {
      isStrongActive: !!(ctx && isSchemaActive(strongSchema.type(ctx))),
      isEmphasisActive: !!(ctx && isSchemaActive(emphasisSchema.type(ctx))),
      isStrikethroughActive: !!(
        ctx && isSchemaActive(strikethroughSchema.type(ctx))
      ),
    };
  }, [state, selection, editor, loading]);

  return activeMarksMap;
};
