import { EditorStatus } from '@milkdown/core';
import { Ctx } from '@milkdown/ctx';
import { findSelectedNodeOfType } from '@milkdown/prose';
import { NodeType } from '@milkdown/prose/model';
import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { useMilkdownInstance } from './useMilkdownInstance';

type UseIsNodeSelected = {
  nodeType: (ctx: Ctx) => NodeType;
};

export const useIsNodeSelected = ({ nodeType }: UseIsNodeSelected) => {
  const { view, getPos } = useNodeViewContext();
  const { editor, loading } = useMilkdownInstance();
  const {
    state: { selection },
  } = view;

  const selected = useMemo(() => {
    if (loading || !editor || editor.status !== EditorStatus.Created) {
      return undefined;
    }
    const { ctx } = editor;
    return findSelectedNodeOfType(selection, nodeType(ctx));
  }, [selection, nodeType, editor, loading]);

  const nodePos = useMemo(() => getPos(), [getPos]);

  const isSelected = useMemo(
    () => selected?.pos === nodePos,
    [selected, nodePos]
  );

  return { isSelected };
};
