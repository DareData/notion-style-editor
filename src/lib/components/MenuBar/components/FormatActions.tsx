import {
  toggleEmphasisCommand,
  toggleStrongCommand,
} from '@milkdown/preset-commonmark';
import { toggleStrikethroughCommand } from '@milkdown/preset-gfm';
import styled, { css } from 'styled-components';

import { Button, ButtonProps } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { useCallEditorCommand } from '../../../hooks/useCallEditorCommand';
import { pxToRem } from '../../../styles/utils';
import { useActiveMarks } from '../hooks/useActiveMarks';

export const FormatActions: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();
  const activeMarks = useActiveMarks();

  return (
    <>
      <BoldItemStyled>
        <ButtonStyled
          onClick={() => onCallCommand(toggleStrongCommand.key)}
          oval
          space="small"
          color="secondary"
          $isActive={activeMarks.isStrongActive}
        >
          <Icon icon="bold" />
        </ButtonStyled>
      </BoldItemStyled>
      <li>
        <ButtonStyled
          onClick={() => onCallCommand(toggleEmphasisCommand.key)}
          oval
          space="small"
          color="secondary"
          $isActive={activeMarks.isEmphasisActive}
        >
          <Icon icon="italic" />
        </ButtonStyled>
      </li>
      <li>
        <ButtonStyled
          onClick={() => onCallCommand(toggleStrikethroughCommand.key)}
          oval
          space="small"
          color="secondary"
          $isActive={activeMarks.isStrikethroughActive}
        >
          <Icon icon="strikethrough" />
        </ButtonStyled>
      </li>
    </>
  );
};

const BoldItemStyled = styled.li`
  margin-left: ${pxToRem(12)};
`;

type ButtonStyledProps = ButtonProps & { $isActive: boolean };
const ButtonStyled = styled<React.FC<ButtonStyledProps>>(Button)`
  ${props =>
    props.$isActive &&
    css`
      background-color: ${props => props.theme.colors.secondaryGrey};
    `}
`;
