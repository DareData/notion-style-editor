import { MilkdownPlugin } from '@milkdown/ctx';
import { diagram, diagramSchema } from '@milkdown/plugin-diagram';
import { NodeViewConstructor } from '@milkdown/prose/view';
import { $view, $View, $Node } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MermaidView } from '../../../components/MermaidView/MermaidView';

export const useMermaidPlugin = (): (
  | MilkdownPlugin
  | $View<$Node, NodeViewConstructor>
)[] => {
  const nodeViewFactory = useNodeViewFactory();

  const mermaidPlugin = useMemo(
    () =>
      [
        diagram,
        $view(diagramSchema.node, () =>
          nodeViewFactory({
            component: MermaidView,
            stopEvent: () => true,
          })
        ),
      ].flat(),
    [nodeViewFactory]
  );

  return mermaidPlugin;
};
