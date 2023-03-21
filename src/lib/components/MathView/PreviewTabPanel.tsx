import { useRef } from 'react';
import styled from 'styled-components';

import { useMath } from './hooks/useMath';

export const PreviewTabPanel: React.FC = () => {
  const codePanelRef = useRef<HTMLDivElement>(null);

  useMath({ codePanelRef });

  return <PreviewContainerStyled ref={codePanelRef} />;
};

const PreviewContainerStyled = styled.div`
  text-align: center;
`;
