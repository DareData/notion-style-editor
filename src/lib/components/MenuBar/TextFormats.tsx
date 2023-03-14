import { CmdKey } from '@milkdown/core';
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { toggleUnderlineCommand } from '../../hooks/useUnderlineCommand';
import { pxToRem } from '../../styles/utils';

type TextFormatsProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const TextFormats: React.FC<TextFormatsProps> = ({ onActionClick }) => (
  <>
    <BoldItemStyled>
      <Button onClick={() => onActionClick(toggleStrongCommand.key)} oval>
        <Icon icon="bold" />
      </Button>
    </BoldItemStyled>
    <li>
      <Button onClick={() => onActionClick(toggleEmphasisCommand.key)} oval>
        <Icon icon="italic" />
      </Button>
    </li>
    <li>
      <Button onClick={() => onActionClick(toggleUnderlineCommand.key)} oval>
        <Icon icon="underline" />
      </Button>
    </li>
    <li>
      <Button
        onClick={() => onActionClick(toggleStrikethroughCommand.key)}
        oval>
        <Icon icon="strikethrough" />
      </Button>
    </li>
  </>
);

const BoldItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
