import { useNodeViewContext } from '@prosemirror-adapter/react';
import mermaid from 'mermaid';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Tab } from '../../common/Tabs/Tab';
import { TabList } from '../../common/Tabs/TabList';
import { TabPanel } from '../../common/Tabs/TabPanel';
import { Tabs } from '../../common/Tabs/Tabs';
import { pxToRem } from '../../styles/utils';
import { Matcher } from '../../utils/Matcher';

enum TabsLabels {
  Preview = 'preview',
  Source = 'soure',
}

export const MermaidView: React.FC = () => {
  const codePanel = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { node, setAttrs, selected } = useNodeViewContext();

  const id = node.attrs.identity;
  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  const renderMermaid = useCallback(
    (canRetry = 3) => {
      const container = codePanel.current;
      if (!container) {
        return;
      }

      try {
        if (codeValue.length === 0) {
          return;
        }

        mermaid.initialize({
          startOnLoad: false,
        });
        mermaid.mermaidAPI.render(id, codeValue, (svg, bind) => {
          container.innerHTML = svg;
          bind?.(container);
        });
      } catch (e) {
        console.error(e);
        if (canRetry === 0) {
          return;
        }

        setTimeout(() => {
          renderMermaid(canRetry - 1);
        }, 200);
      }
    },
    [codeValue, id]
  );

  useEffect(() => {
    renderMermaid();
  }, [renderMermaid]);

  const onTabChange = useCallback(
    (tab: string) => {
      Matcher(tab).match(TabsLabels.Preview, () =>
        requestAnimationFrame(() => {
          renderMermaid();
        })
      );
    },
    [renderMermaid]
  );

  const onUpdateClick = () => {
    const value = textareaRef.current?.value || '';
    setAttrs({ value });
  };

  return (
    <Tabs initialTab={TabsLabels.Preview} {...{ onTabChange }}>
      <TabList>
        <Tab label={TabsLabels.Preview}>Preview</Tab>
        <Tab label={TabsLabels.Source}>Source</Tab>
      </TabList>
      <TabPanel label={TabsLabels.Preview}>
        <div ref={codePanel} />
      </TabPanel>
      <TabPanel label={TabsLabels.Source}>
        <>
          <TextareaStyled ref={textareaRef} defaultValue={codeValue} />
          <UpdateButtonStyled
            oval
            color="success"
            variant="contained"
            onClick={onUpdateClick}
          >
            Update
          </UpdateButtonStyled>
        </>
      </TabPanel>
    </Tabs>
  );
};

const TextareaStyled = styled.textarea`
  outline: 0;
  background-color: transparent;
  border: 0;
  min-height: 100%;
  min-height: ${pxToRem(200)};
  font-family: ${props => props.theme.fonts.secondary};
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(22)};
  width: 100%;
  resize: vertical;
`;

const UpdateButtonStyled = styled(Button)`
  position: absolute;
  top: ${pxToRem(16)};
  right: ${pxToRem(16)};
`;
