import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';
import { Option } from 'react-dropdown';
import styled from 'styled-components';

import { useTextEditorModeContext } from './TextEditorModeContext/useTextEditorModeContext';
import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';
import { Icon } from '../common/Icon/Icon';
import { pxToRem } from '../styles/utils';
import { Matcher } from '../utils/Matcher';

const options: Option[] = [
  {
    value: 'r',
    label: 'R',
  },
  {
    value: 'python',
    label: 'Python',
  },
  {
    value: 'c',
    label: 'C',
  },
  {
    value: 'java',
    label: 'Java',
  },
  {
    value: 'json',
    label: 'JSON',
  },
];

export const CodeBlock: React.FC = () => {
  const { mode } = useTextEditorModeContext();
  const { contentRef, node, setAttrs } = useNodeViewContext();

  const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(node.textContent);
  };

  const onLanguageChange = ({ value: language }: Option) => {
    setAttrs({ language });
  };

  const value = node.attrs.language || 'text';
  const label = useMemo(
    () => options.find(option => option.value === value)?.label || 'Text',
    [value]
  );

  return (
    <CodeBlockContainerStyled>
      <CodeBlockActionsStyled>
        {Matcher(mode)
          .match('active', () => (
            <Dropdown {...{ value, options }} onChange={onLanguageChange} />
          ))
          .match('preview', () => (
            <LanguageLabelStyled>{label}</LanguageLabelStyled>
          ))
          .get()}
        <Button oval onClick={onCopyClick} variant="contained">
          <Icon icon="copy" />
          <CopyTextStyled>Copy</CopyTextStyled>
        </Button>
      </CodeBlockActionsStyled>
      <pre>
        <code ref={contentRef} />
      </pre>
    </CodeBlockContainerStyled>
  );
};

const CodeBlockContainerStyled = styled.div`
  margin: ${pxToRem(16)} 0;
  padding: ${pxToRem(16)};
  font-size: ${pxToRem(16)};
  line-height: ${pxToRem(22)};
  background-color: ${props => props.theme.colors.lightAzure};
  border: 1px solid ${props => props.theme.colors.azure};
  border-radius: ${pxToRem(8)};
  * {
    font-family: ${props => props.theme.fonts.secondary};
  }
`;

const CodeBlockActionsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${pxToRem(16)};
`;

const CopyTextStyled = styled.span`
  margin-left: ${pxToRem(5)};
`;

const LanguageLabelStyled = styled.span`
  padding: ${pxToRem(7)} ${pxToRem(12)};
  background-color: ${props => props.theme.colors.azure};
  border-radius: ${pxToRem(8)};
`;
