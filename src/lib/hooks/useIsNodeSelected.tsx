import { findSelectedNodeOfType } from '@milkdown/prose';
import { NodeType } from '@milkdown/prose/model';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

type UseIsNodeSelected = {
  nodeType: NodeType;
};

export const useIsNodeSelected = ({ nodeType }: UseIsNodeSelected) => {
  const { view, getPos } = useNodeViewContext();

  const {
    state: { selection },
  } = view;

  const selected = useMemo(
    () => findSelectedNodeOfType(selection, nodeType),
    [selection, nodeType]
  );

  const nodePos = useMemo(() => getPos(), [getPos]);

  const isSelected = useMemo(
    () => selected?.pos === nodePos,
    [selected, nodePos]
  );

  return { isSelected };
};
