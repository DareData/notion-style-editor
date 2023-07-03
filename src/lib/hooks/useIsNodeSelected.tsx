import { Ctx } from '@milkdown/ctx';
import { findSelectedNodeOfType } from '@milkdown/prose';
import { NodeType } from '@milkdown/prose/model';
import { useInstance } from '@milkdown/react';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

type UseIsNodeSelected = {
  nodeType: (ctx: Ctx) => NodeType;
};

export const useIsNodeSelected = ({ nodeType }: UseIsNodeSelected) => {
  const { view, getPos } = useNodeViewContext();
  const [, getEditor] = useInstance();
  const ctx = getEditor()?.ctx;

  const {
    state: { selection },
  } = view;

  const selected = useMemo(
    () => ctx && findSelectedNodeOfType(selection, nodeType(ctx)),
    [selection, nodeType, ctx]
  );

  const nodePos = useMemo(() => getPos(), [getPos]);

  const isSelected = useMemo(
    () => selected?.pos === nodePos,
    [selected, nodePos]
  );

  return { isSelected };
};
