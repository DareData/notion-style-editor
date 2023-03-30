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
      <div>{children}</div>
    </TabsContextProvider>
  );
};
