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

export enum MathNodeTabs {
  Preview = 'preview',
  Source = 'soure',
}

export const MathNode: React.FC = () => {
  const { mode } = useTextEditorContext();
  const { setAttrs } = useNodeViewContext();

  const onSourceUpdate = (value: string) => {
    setAttrs({ value });
  };

  if (mode === 'preview') {
    return (
      <MathNodeContainerStyled>
        <PreviewTabPanel />
      </MathNodeContainerStyled>
    );
  }

  return (
    <MathNodeContainerStyled contentEditable={false} data-testid="math-node">
      <Tabs initialTab={MathNodeTabs.Preview}>
        <TabList>
          <Tab label={MathNodeTabs.Preview}>Preview</Tab>
          <Tab label={MathNodeTabs.Source}>Source</Tab>
        </TabList>
        <TabPanel label={MathNodeTabs.Preview}>
          <PreviewTabPanel />
        </TabPanel>
        <SourceTabPanelStyled label={MathNodeTabs.Source}>
          <SourceTabPanel {...{ onSourceUpdate }} />
        </SourceTabPanelStyled>
      </Tabs>
    </MathNodeContainerStyled>
  );
};

const SourceTabPanelStyled = styled(TabPanel)`
  padding-right: 0;
`;

const MathNodeContainerStyled = styled.div`
  margin: ${pxToRem(16)} 0;
`;
