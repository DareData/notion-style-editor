import { useNodeViewContext } from '@prosemirror-adapter/react';

import { Button } from '../common/Button';
import { Icon } from '../common/Icon/Icon';

export const CodeBlock: React.FC = () => {
  const { contentRef, selected, node, setAttrs } = useNodeViewContext();

  const onCopyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigator.clipboard.writeText(node.textContent);
  };

  return (
    <div className="code-block">
      <div className="code-block_actions">
        <div>Select</div>
        <Button className="code-block_copy-button" onClick={onCopyClick}>
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
