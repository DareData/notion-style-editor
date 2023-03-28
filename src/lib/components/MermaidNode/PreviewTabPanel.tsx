import { useRef } from 'react';
import styled from 'styled-components';

import { useMermaid } from './hooks/useMermaid';

export const PreviewTabPanel: React.FC = () => {
  const codePanelRef = useRef<HTMLDivElement>(null);

  useMermaid({ codePanelRef });

  return <MermaidContainerStyled id="mermaid-preview" ref={codePanelRef} />;
};

const MermaidContainerStyled = styled.div`
  text-align: center;
  .edgeLabel {
    display: block !important;
  }
`;
