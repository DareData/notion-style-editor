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
      e.preventDefault();
      e.stopPropagation();
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
        <DropdownListContainerStyled $isOpen={isOpen}>
          <DropdownListStyled>{children}</DropdownListStyled>
        </DropdownListContainerStyled>
      </DropdownContextProvider>
    </DropdownContainerStyled>
  );
};

const DropdownContainerStyled = styled.div`
  position: relative;
`;

const DropdownListContainerStyled = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  right: 0;
  z-index: ${props =>
    props.$isOpen ? props.theme.zIndexes.dropdown.container : -1};
  top: calc(100% + 14px);
  display: ${props => (props.$isOpen ? 'block' : 'none')};
`;

export const DropdownListStyled = styled.ul`
  position: relative;
  padding-left: 0 !important;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${pxToRem(8)};
  border: 1px solid ${props => props.theme.colors.lightGrey};
  z-index: ${props => props.theme.zIndexes.dropdown.container};
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
`;

export const DropdownItemStyled = styled.li`
  list-style-type: none;
  z-index: ${props => props.theme.zIndexes.dropdown.container};
`;

export const DropdownButtonActionStyled = styled(Button)`
  width: 100%;
  justify-content: flex-start;
  gap: ${pxToRem(10)};
  z-index: ${props => props.theme.zIndexes.dropdown.container};
  padding: ${pxToRem(14)} ${pxToRem(20)};
  min-width: ${pxToRem(200)};
`;
