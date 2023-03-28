import {
  toggleEmphasisCommand,
  toggleStrongCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { pxToRem } from '../../../styles/utils';

export const TextFormats: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <BoldItemStyled>
        <Button
          onClick={() => onCallCommand(toggleStrongCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="bold" />
        </Button>
      </BoldItemStyled>
      <li>
        <Button
          onClick={() => onCallCommand(toggleEmphasisCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="italic" />
        </Button>
      </li>
      <li>
        <Button oval space="small" color="secondary">
          <Icon icon="underline" />
        </Button>
      </li>
      <li>
        <Button
          onClick={() => onCallCommand(toggleStrikethroughCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="strikethrough" />
        </Button>
      </li>
    </>
  );
};

const BoldItemStyled = styled.li`
  margin-left: ${pxToRem(12)};
`;
