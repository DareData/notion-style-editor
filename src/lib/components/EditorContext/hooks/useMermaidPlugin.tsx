import { diagram, diagramSchema } from '@milkdown/plugin-diagram';
import { $view } from '@milkdown/utils';
import { useNodeViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { MermaidView } from '../../MermaidView/MermaidView';

export const useMermaidPlugin = () => {
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
