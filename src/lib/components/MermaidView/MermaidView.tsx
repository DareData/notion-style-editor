import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { PreviewTabPanel } from './PreviewTabPanel';
import { SourceTabPanel } from './SourceTabPanel';
import { Tab } from '../../common/Tabs/Tab';
import { TabList } from '../../common/Tabs/TabList';
import { TabPanel } from '../../common/Tabs/TabPanel';
import { Tabs } from '../../common/Tabs/Tabs';

export enum TabsLabels {
  Preview = 'preview',
  Source = 'soure',
}

export const MermaidView: React.FC = () => {
  const { setAttrs } = useNodeViewContext();

  const onSourceUpdate = (value: string) => {
    setAttrs({ value });
  };

  return (
    <Tabs initialTab={TabsLabels.Preview}>
      <TabList>
        <Tab label={TabsLabels.Preview}>Preview</Tab>
        <Tab label={TabsLabels.Source}>Source</Tab>
      </TabList>
      <TabPanel label={TabsLabels.Preview}>
        <PreviewTabPanel />
      </TabPanel>
      <SourceTabPanelStyled label={TabsLabels.Source}>
        <SourceTabPanel {...{ onSourceUpdate }} />
      </SourceTabPanelStyled>
    </Tabs>
  );
};

const SourceTabPanelStyled = styled(TabPanel)`
  padding-right: 0;
`;
