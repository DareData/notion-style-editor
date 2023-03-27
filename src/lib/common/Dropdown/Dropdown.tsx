import { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { DropdownContextProvider } from './context/DropdownContextProvider';
import { useToggler } from '../../hooks/useToggler';
import { pxToRem } from '../../styles/utils';
import { Button } from '../Button';

type DropdownHandlerComponent = React.FC<{ onToggle: () => void }>;

type DropdownProps = {
  handler: DropdownHandlerComponent;
  children: React.ReactNode;
  className?: string;
  closeOnOutsideClick?: boolean;
};

export const Dropdown: React.FC<DropdownProps> = ({
  handler: Handler,
  children,
  className,
  closeOnOutsideClick = true,
}) => {
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const { state: isOpen, on, off, toggle } = useToggler();

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    if (!closeOnOutsideClick) {
      return;
    }

    const onBodyClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      const { current: dropdownRef } = dropdownContainerRef;

      if (!dropdownRef?.contains(element) && closeOnOutsideClick) {
        off();
      }
    };

    document.body.addEventListener('click', onBodyClick);

    return () => document.body.removeEventListener('click', onBodyClick);
  }, [closeOnOutsideClick, off, isOpen]);

  return (
    <DropdownContainerStyled ref={dropdownContainerRef} {...{ className }}>
      <Handler onToggle={toggle} />
      <DropdownContextProvider {...{ isOpen }} onClose={off} onOpen={on}>
        {isOpen && (
          <DropdownListContainerStyled>{children}</DropdownListContainerStyled>
        )}
      </DropdownContextProvider>
    </DropdownContainerStyled>
  );
};

const DropdownContainerStyled = styled.div`
  position: relative;
`;

const DropdownListContainerStyled = styled.div`
  position: absolute;
  right: 0;
  z-index: ${props => props.theme.zIndexes.dropdown.container};
  top: calc(100% + 14px);
`;

export const DropdownListStyled = styled.ul`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(8)};
  border: 1px solid ${props => props.theme.colors.lightGrey};
`;

export const DropdownItemStyled = styled.li`
  list-style-type: none;
`;

export const DropdownButtonActionStyled = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: ${pxToRem(10)};
  padding: ${pxToRem(14)} ${pxToRem(20)};
  min-width: ${pxToRem(200)};
`;
