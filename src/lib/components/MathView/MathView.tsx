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

export enum MathViewTabs {
  Preview = 'preview',
  Source = 'soure',
}

export const MathView: React.FC = () => {
  const { mode } = useTextEditorModeContext();
  const { setAttrs } = useNodeViewContext();

  const onSourceUpdate = (value: string) => {
    setAttrs({ value });
  };

  if (mode === 'preview') {
    return (
      <MathViewContainerStyled>
        <PreviewTabPanel />
      </MathViewContainerStyled>
    );
  }

  return (
    <MathViewContainerStyled>
      <Tabs initialTab={MathViewTabs.Preview}>
        <TabList>
          <Tab label={MathViewTabs.Preview}>Preview</Tab>
          <Tab label={MathViewTabs.Source}>Source</Tab>
        </TabList>
        <TabPanel label={MathViewTabs.Preview}>
          <PreviewTabPanel />
        </TabPanel>
        <SourceTabPanelStyled label={MathViewTabs.Source}>
          <SourceTabPanel {...{ onSourceUpdate }} />
        </SourceTabPanelStyled>
      </Tabs>
    </MathViewContainerStyled>
  );
};

const SourceTabPanelStyled = styled(TabPanel)`
  padding-right: 0;
`;

const MathViewContainerStyled = styled.div`
  margin: ${pxToRem(16)} 0;
`;
