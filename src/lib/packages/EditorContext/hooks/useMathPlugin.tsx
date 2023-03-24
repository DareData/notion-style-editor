import { math, mathBlockSchema, mathInlineSchema } from '@milkdown/plugin-math';
import { setBlockType } from '@milkdown/prose/commands';
import { $view, $command } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MathView } from '../../../components/MathView/MathView';
import { Plugin } from '../../../types/plugins';

export const insertMathCommand = $command(
  'InsertMathCommand',
  () => () => setBlockType(mathBlockSchema.type())
);

export const insertInlineCommand = $command(
  'InsertInlineCommand',
  () => () => setBlockType(mathInlineSchema.type())
);

export const useMathPlugin = (): Plugin => {
  const nodeViewFactory = useNodeViewFactory();

  const mathPlugin = useMemo(
    () =>
      [
        math,
        insertMathCommand,
        insertInlineCommand,
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
