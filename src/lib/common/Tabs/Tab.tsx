import styled from 'styled-components';

import { useTabsContext } from './context/useTabsContext';
import { Button } from '../Button';

type TabProps = {
  label: string;
  children: React.ReactNode;
};

export const Tab: React.FC<TabProps> = ({ label, children }) => {
  const { selected, onTabChange } = useTabsContext();

  const onTabClick = () => onTabChange(label);

  const isSelected = selected === label;

  return (
    <TabStyled $isSelected={isSelected}>
      <Button oval onClick={onTabClick}>
        {children}
      </Button>
    </TabStyled>
  );
};

const TabStyled = styled.li<{ $isSelected: boolean }>`
  list-style-type: none;
  border-bottom: 2px solid
    ${props =>
      props.$isSelected ? props.theme.colors.lightGreen : 'transparent'};
  transition: border-color 0.1s ease-in;
`;
