import { emphasisSchema, strongSchema } from '@milkdown/preset-commonmark';
import { strikethroughSchema } from '@milkdown/preset-gfm';
import { Mark, MarkType, Node } from '@milkdown/prose/model';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

const doesRangeHasMark =
  (doc: Node, from: number, to: number) => (markType: MarkType) =>
    doc.rangeHasMark(from, to, markType);

const isMarkInSet = (marks: readonly Mark[]) => (markType: MarkType) =>
  !!markType.isInSet(marks);

export const useActiveMarks = () => {
  const { view } = useWidgetViewContext();
  const { state } = view;
  const { selection } = state;

  const activeMarksMap = useMemo(() => {
    const { doc, storedMarks } = state;
    const { from, to, empty, $from } = selection;

    if (empty) {
      const isSchemaActive = isMarkInSet(storedMarks || $from.marks());

      return {
        isStrongActive: isSchemaActive(strongSchema.type()),
        isEmphasisActive: isSchemaActive(emphasisSchema.type()),
        isStrikethroughActive: isSchemaActive(strikethroughSchema.type()),
      };
    }

    const isSchemaActive = doesRangeHasMark(doc, from, to);

    return {
      isStrongActive: isSchemaActive(strongSchema.type()),
      isEmphasisActive: isSchemaActive(emphasisSchema.type()),
      isStrikethroughActive: isSchemaActive(strikethroughSchema.type()),
    };
  }, [state, selection]);

  return activeMarksMap;
};
