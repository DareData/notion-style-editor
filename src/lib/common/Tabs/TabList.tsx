import styled from 'styled-components';

import { pxToRem } from '../../styles/utils';

type TabListProps = {
  children: React.ReactNode;
};

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return <TabListStyled>{children}</TabListStyled>;
};

const TabListStyled = styled.ul`
  display: flex;
  align-items: center;
  margin-bottom: ${pxToRem(10)};

  &&& {
    padding: 0;
  }
`;
