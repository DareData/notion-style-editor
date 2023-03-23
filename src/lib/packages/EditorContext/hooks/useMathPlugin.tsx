import { MilkdownPlugin } from '@milkdown/ctx';
import { math, mathBlockSchema } from '@milkdown/plugin-math';
import { setBlockType } from '@milkdown/prose/commands';
import { NodeViewConstructor } from '@milkdown/prose/view';
import { $view, $command, $View, $Node } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MathView } from '../../../components/MathView/MathView';

export const insertMathCommand = $command(
  'InsertMathCommand',
  () => () => setBlockType(mathBlockSchema.type())
);

export const useMathPlugin = (): (
  | MilkdownPlugin
  | $View<$Node, NodeViewConstructor>
)[] => {
  const nodeViewFactory = useNodeViewFactory();

  const mathPlugin = useMemo(
    () =>
      [
        math,
        insertMathCommand,
        $view(mathBlockSchema.node, () =>
          nodeViewFactory({
            component: MathView,
            stopEvent: () => true,
          })
        ),
      ].flat(),
    [nodeViewFactory]
  );

  return mathPlugin;
};
