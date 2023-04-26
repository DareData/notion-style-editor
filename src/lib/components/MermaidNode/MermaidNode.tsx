import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { PreviewTabPanel } from './PreviewTabPanel';
import { SourceTabPanel } from './SourceTabPanel';
import { Tab } from '../../common/Tabs/Tab';
import { TabList } from '../../common/Tabs/TabList';
import { TabPanel } from '../../common/Tabs/TabPanel';
import { Tabs } from '../../common/Tabs/Tabs';
import { pxToRem } from '../../styles/utils';
import { useTextEditorContext } from '../TextEditorContext/useTextEditoContext';

export enum MermaidNodeTabs {
  Preview = 'preview',
  Source = 'soure',
}

export const MermaidNode: React.FC = () => {
  const { setAttrs } = useNodeViewContext();
  const { mode } = useTextEditorContext();

  const onSourceUpdate = (value: string) => {
    setAttrs({ value });
  };

  if (mode === 'preview') {
    return (
      <MermaidNodeContainerStyled>
        <PreviewTabPanel />
      </MermaidNodeContainerStyled>
    );
  }

  return (
    <MermaidNodeContainerStyled contentEditable={false}>
      <Tabs initialTab={MermaidNodeTabs.Preview}>
        <TabList>
          <Tab label={MermaidNodeTabs.Preview}>Preview</Tab>
          <Tab label={MermaidNodeTabs.Source}>Source</Tab>
        </TabList>
        <TabPanel label={MermaidNodeTabs.Preview}>
          <PreviewTabPanel />
        </TabPanel>
        <SourceTabPanelStyled label={MermaidNodeTabs.Source}>
          <SourceTabPanel {...{ onSourceUpdate }} />
        </SourceTabPanelStyled>
      </Tabs>
    </MermaidNodeContainerStyled>
  );
};

const SourceTabPanelStyled = styled(TabPanel)`
  padding-right: 0;
`;

const MermaidNodeContainerStyled = styled.div`
  margin: ${pxToRem(16)} 0;
`;
