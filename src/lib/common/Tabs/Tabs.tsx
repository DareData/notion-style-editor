import styled from 'styled-components';

import { TabsContextProvider } from './context/TabsContextProvider';

type TabsProps = {
  children: React.ReactNode;
  initialTab: string;
  onTabChange?: (tab: string) => void;
};

export const Tabs: React.FC<TabsProps> = ({
  children,
  initialTab,
  onTabChange = () => {},
}) => {
  return (
    <TabsContextProvider {...{ initialTab, onTabChange }}>
      <TabsContainerStyled>{children}</TabsContainerStyled>
    </TabsContextProvider>
  );
};

const TabsContainerStyled = styled.div``;
