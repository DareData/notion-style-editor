import { useNodeViewContext } from '@prosemirror-adapter/react';
import { useMemo } from 'react';
import { Option } from 'react-dropdown';
import styled from 'styled-components';

import { CodeStyled } from './CodeStyled';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { Select } from '../../common/Select';
import { useNotification } from '../../hooks/useNotification';
import { pxToRem } from '../../styles/utils';
import { Matcher } from '../../utils/Matcher';
import { useTextEditorModeContext } from '../TextEditorModeContext/useTextEditorModeContext';

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

export const CodeBlockNode: React.FC = () => {
  const { mode } = useTextEditorModeContext();
  const { onSuccessNotification } = useNotification();
  const { contentRef, node, setAttrs } = useNodeViewContext();

  const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSuccessNotification('Code snippet copied to clipboard!');
    navigator.clipboard.writeText(node.textContent);
  };

  const onLanguageChange = ({ value: language }: Option) => {
    setAttrs({ language });
  };

  const value = useMemo(
    () =>
      options.find(option => option.value === node.attrs.language)?.value ||
      'text',
    [node]
  );
  const label = useMemo(
    () => options.find(option => option.value === value)?.label || 'Text',
    [value]
  );

  return (
    <CodeBlockNodeContainerStyled>
      <CodeBlockNodeActionsStyled>
        {Matcher(mode)
          .match('active', () => (
            <Select {...{ value, options }} onChange={onLanguageChange} />
          ))
          .match('preview', () => (
            <LanguageLabelStyled>{label}</LanguageLabelStyled>
          ))
          .get()}
        <CopyButtonStyled oval onClick={onCopyClick} color="secondary">
          <Icon icon="copy" />
          <CopyTextStyled>Copy</CopyTextStyled>
        </CopyButtonStyled>
      </CodeBlockNodeActionsStyled>
      <pre>
        <CodeStyled ref={contentRef} />
      </pre>
    </CodeBlockNodeContainerStyled>
  );
};

const CodeBlockNodeContainerStyled = styled.div`
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

const CodeBlockNodeActionsStyled = styled.div`
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

const CopyButtonStyled = styled(Button)`
  &:hover,
  &:focus {
    background-color: ${props => props.theme.colors.secondaryGrey};
  }
`;
