import {
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { pxToRem } from '../../../styles/utils';

export const ParagraphFormat: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <ParagraphFormatItemStyled>
        <Button
          onClick={() => onCallCommand(wrapInBulletListCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="bulleted_list" />
        </Button>
      </ParagraphFormatItemStyled>
      <li>
        <Button
          onClick={() => onCallCommand(wrapInOrderedListCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="numbered_list" />
        </Button>
      </li>
    </>
  );
};

const ParagraphFormatItemStyled = styled.li`
  margin-left: ${pxToRem(12)};
`;
