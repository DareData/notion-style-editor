import { CmdKey } from '@milkdown/core';
import {
  wrapInBulletListCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark';
import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';

type ParagraphFormatProps = {
  onActionClick: <T>(action: CmdKey<T>) => void;
};

export const ParagraphFormat: React.FC<ParagraphFormatProps> = ({
  onActionClick,
}) => (
  <>
    <ParagraphFormatItemStyled>
      <Button onClick={() => onActionClick(wrapInBulletListCommand.key)} oval>
        <Icon icon="bulleted_list" />
      </Button>
    </ParagraphFormatItemStyled>
    <li>
      <Button onClick={() => onActionClick(wrapInOrderedListCommand.key)} oval>
        <Icon icon="numbered_list" />
      </Button>
    </li>
  </>
);

const ParagraphFormatItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
