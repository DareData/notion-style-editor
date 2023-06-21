import styled from 'styled-components';

import { Button } from '../../../common/Button';
import { Icon } from '../../../common/Icon/Icon';
import { pxToRem } from '../../../styles/utils';

type FileNodeContentProps = {
  name: string;
  children: React.ReactNode;
};

export const FileNodeContent: React.FC<FileNodeContentProps> = ({
  name,
  children,
}) => {
  return (
    <>
      <WrapperStyled>
        <IconContainerStyled>
          <Icon icon="document" />
        </IconContainerStyled>
        {name}
      </WrapperStyled>
      {children}
    </>
  );
};

export const FileNodeRemoveButtonStyled = styled(Button)`
  pointer-events: none;
  opacity: 0;
  transition: 0.1s ease-in;

  &:hover {
    background-color: #eeefee;
  }
`;

const WrapperStyled = styled.div`
  display: flex;
  align-items: center;
  gap: ${pxToRem(8)};
`;

const IconContainerStyled = styled.div`
  display: flex;
  padding: ${pxToRem(7)};
  border-radius: ${pxToRem(4)};
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  border: 1px solid ${props => props.theme.colors.lightGrey};
`;
