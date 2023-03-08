import { useNodeViewContext } from '@prosemirror-adapter/react';
import { Option } from 'react-dropdown';

import { Button } from '../common/Button';
import { Dropdown } from '../common/Dropdown';
import { Icon } from '../common/Icon/Icon';

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
  const { contentRef, node, setAttrs } = useNodeViewContext();

  const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(node.textContent);
  };

  const onLanguageChange = ({ value: language }: Option) => {
    setAttrs({ language });
  };

  const value = node.attrs.language || 'text';

  return (
    <div className="code-block">
      <div className="code-block_actions">
        <Dropdown {...{ value, options }} onChange={onLanguageChange} />
        <Button className="code-block_copy-button oval" onClick={onCopyClick}>
          <Icon icon="copy" />
          <span className="copy-button_text">Copy</span>
        </Button>
      </div>
      <pre>
        <code ref={contentRef} />
      </pre>
    </div>
  );
};
