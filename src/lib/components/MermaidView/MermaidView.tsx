import { useNodeViewContext } from '@prosemirror-adapter/react';
import styled from 'styled-components';

import { PreviewTabPanel } from './PreviewTabPanel';
import { SourceTabPanel } from './SourceTabPanel';
import { Tab } from '../../common/Tabs/Tab';
import { TabList } from '../../common/Tabs/TabList';
import { TabPanel } from '../../common/Tabs/TabPanel';
import { Tabs } from '../../common/Tabs/Tabs';
import { pxToRem } from '../../styles/utils';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

export enum TabsLabels {
  Preview = 'preview',
  Source = 'soure',
}

export const MermaidView: React.FC = () => {
  const { setAttrs } = useNodeViewContext();
  const { mode } = useTextEditorModeContext();

  const onSourceUpdate = (value: string) => {
    setAttrs({ value });
  };

  if (mode === 'preview') {
    return (
      <MermaidViewContainerStyled>
        <PreviewTabPanel />
      </MermaidViewContainerStyled>
    );
  }

  return (
    <MermaidViewContainerStyled contentEditable={false}>
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
    </MermaidViewContainerStyled>
  );
};

const SourceTabPanelStyled = styled(TabPanel)`
  padding-right: 0;
`;

const MermaidViewContainerStyled = styled.div`
  margin: ${pxToRem(16)} 0;
`;
