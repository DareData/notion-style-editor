import { math, mathBlockSchema } from '@milkdown/plugin-math';
import { setBlockType } from '@milkdown/prose/commands';
import { $view, $command } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MathView } from '../../../components/MathView/MathView';

export const insertMathCommand = $command(
  'InsertMathCommand',
  () => () => setBlockType(mathBlockSchema.type())
);

export const useMathPlugin = () => {
  const nodeViewFactory = useNodeViewFactory();

  const mathPlugin = useMemo(
    () =>
      [
        math,
        insertMathCommand,
        // $view(mathBlockSchema.node, () =>
        //   nodeViewFactory({
        //     component: MathView,
        //     stopEvent: () => true,
        //   })
        // ),
      ].flat(),
    [nodeViewFactory]
  );

  return mathPlugin;
};
