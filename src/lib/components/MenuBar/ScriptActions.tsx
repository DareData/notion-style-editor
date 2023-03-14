import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { pxToRem } from '../../styles/utils';

export const ScriptActions: React.FC = () => (
  <>
    <SuperscriptItemStyled>
      {/* add missing superscript command */}
      <Button oval>
        <Icon icon="superscript" />
      </Button>
    </SuperscriptItemStyled>
    <li>
      {/* add missing subscript command */}
      <Button oval>
        <Icon icon="subscript" />
      </Button>
    </li>
  </>
);

const SuperscriptItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
