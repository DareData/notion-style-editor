import { useRef } from 'react';

import { useMermaid } from './hooks/useMermaid';

export const PreviewTabPanel: React.FC = () => {
  const codePanelRef = useRef<HTMLDivElement>(null);

  useMermaid({ codePanelRef });

  return <div ref={codePanelRef} />;
};
