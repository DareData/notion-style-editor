import { diagram, diagramSchema } from '@milkdown/plugin-diagram';
import { $view } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MermaidNode } from '../../../components/MermaidNode/MermaidNode';
import { Plugin } from '../../../types/plugins';

export const useMermaidPlugin = (): Plugin => {
  const nodeViewFactory = useNodeViewFactory();

  const mermaidPlugin = useMemo(
    () =>
      [
        diagram,
        $view(diagramSchema.node, () =>
          nodeViewFactory({
            component: MermaidNode,
            stopEvent: () => true,
          })
        ),
      ].flat(),
    [nodeViewFactory]
  );

  return mermaidPlugin;
};
