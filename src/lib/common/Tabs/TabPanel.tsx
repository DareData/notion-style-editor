import styled from 'styled-components';

import { useTabsContext } from './context/useTabsContext';
import { pxToRem } from '../../styles/utils';

type TabPanelProps = {
  label: string;
  children: React.ReactNode;
};

export const TabPanel: React.FC<TabPanelProps> = ({ label, children }) => {
  const { selected } = useTabsContext();

  if (label !== selected) {
    return null;
  }

  return <TabPanelContainerStyled>{children}</TabPanelContainerStyled>;
};

const TabPanelContainerStyled = styled.div`
  position: relative;
  padding: ${pxToRem(16)};
  background-color: ${props => props.theme.colors.lightAzure};
  border: 1px solid ${props => props.theme.colors.azure};
  border-radius: ${pxToRem(8)};
  font-size: ${props => props.theme.fonts.secondary};
  min-height: ${pxToRem(200)};
`;
