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
      <WrapperStyled data-testid="file-node">
        <IconContainerStyled>
          <Icon icon="document" />
        </IconContainerStyled>
        <NameStyled>{name}</NameStyled>
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
  overflow: hidden;
`;

const IconContainerStyled = styled.div`
  display: flex;
  padding: ${pxToRem(7)};
  border-radius: ${pxToRem(4)};
  background-color: ${props => props.theme.colors.secondaryLightGrey};
  border: 1px solid ${props => props.theme.colors.lightGrey};
`;

const NameStyled = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
`;
