import { emphasisSchema, strongSchema } from '@milkdown/preset-commonmark';
import { strikethroughSchema } from '@milkdown/preset-gfm';
import { Mark, MarkType, Node } from '@milkdown/prose/model';
import { useWidgetViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

const doesRangeHasMark = (
  doc: Node,
  from: number,
  to: number,
  markType: MarkType
) => doc.rangeHasMark(from, to, markType);

const isMarkInSet = (markType: MarkType, marks: readonly Mark[]) =>
  markType.isInSet(marks);

export const useActiveMarks = () => {
  const { view } = useWidgetViewContext();
  const { state } = view;
  const { selection } = state;

  const activeMarksMap = useMemo(() => {
    const { doc, storedMarks } = state;
    const { from, to, empty, $from } = selection;
    if (empty) {
      return {
        isStrongActive: !!isMarkInSet(
          strongSchema.type(),
          storedMarks || $from.marks()
        ),
        isEmphasisActive: !!isMarkInSet(
          emphasisSchema.type(),
          storedMarks || $from.marks()
        ),
        isStrikethroughActive: !!isMarkInSet(
          strikethroughSchema.type(),
          storedMarks || $from.marks()
        ),
      };
    }
    return {
      isStrongActive: doesRangeHasMark(doc, from, to, strongSchema.type()),
      isEmphasisActive: doesRangeHasMark(doc, from, to, emphasisSchema.type()),
      isStrikethroughActive: doesRangeHasMark(
        doc,
        from,
        to,
        strikethroughSchema.type()
      ),
    };
  }, [state, selection]);

  return activeMarksMap;
};
