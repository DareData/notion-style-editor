import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

import { MermaidNodeTabs } from './MermaidNode';
import { Button } from '../../common/Button';
import { useTabsContext } from '../../common/Tabs/context/useTabsContext';
import { pxToRem } from '../../styles/utils';

type SourceTabPanelProps = {
  onSourceUpdate: (value: string) => void;
};

export const SourceTabPanel: React.FC<SourceTabPanelProps> = ({
  onSourceUpdate,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { node } = useNodeViewContext();
  const { onTabChange } = useTabsContext();

  const onUpdateClick = () => {
    const value = textareaRef.current?.value || '';

    onSourceUpdate(value);
    onTabChange(MermaidNodeTabs.Preview);
  };

  const codeValue = useMemo(() => node.attrs.value, [node.attrs.value]);

  return (
    <>
      <TextareaStyled ref={textareaRef} defaultValue={codeValue} />
      <UpdateButtonStyled
        oval
        variant="contained"
        color="primary"
        onClick={onUpdateClick}
      >
        Update
      </UpdateButtonStyled>
    </>
  );
};

const TextareaStyled = styled(TextareaAutosize)`
  outline: 0;
  background-color: transparent;
  border: 0;
  min-height: ${pxToRem(60)};
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
