import {
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { pxToRem } from '../../../styles/utils';

export const ListsActions: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <BulletListItemStyled>
        <Button
          onClick={() => onCallCommand(wrapInBulletListCommand.key)}
          oval
          space="small"
          color="secondary"
        >
          <Icon icon="bulleted_list" />
        </Button>
      </BulletListItemStyled>
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

const BulletListItemStyled = styled.li`
  margin-left: ${pxToRem(12)};
`;
