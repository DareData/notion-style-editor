import styled from 'styled-components';

import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon/Icon';
import { useCallEditorCommand } from '../../hooks/useCallEditorCommand';
import { toggleSubscriptCommand } from '../../packages/EditorContext/hooks/useSubscriptCommand';
import { toggleSuperscriptCommand } from '../../packages/EditorContext/hooks/useSuperscriptCommand';
import { pxToRem } from '../../styles/utils';

export const ScriptActions: React.FC = () => {
  const { onCallCommand } = useCallEditorCommand();

  return (
    <>
      <SuperscriptItemStyled>
        <Button
          oval
          space="small"
          color="secondary"
          onClick={() => onCallCommand(toggleSuperscriptCommand.key)}
        >
          <Icon icon="superscript" />
        </Button>
      </SuperscriptItemStyled>
      <li>
        <Button
          oval
          space="small"
          color="secondary"
          onClick={() => onCallCommand(toggleSubscriptCommand.key)}
        >
          <Icon icon="subscript" />
        </Button>
      </li>
    </>
  );
};

const SuperscriptItemStyled = styled.li`
  margin-left: ${pxToRem(16)};
`;
