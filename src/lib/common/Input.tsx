import { forwardRef } from 'react';
import styled from 'styled-components';

import { Label } from './Label';
import { pxToRem } from '../styles/utils';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, required, name, label, error, ...rest }, ref) => (
    <InputFieldStyled {...{ className }}>
      {label && (
        <Label text={label as string} htmlFor={name} {...{ required }} />
      )}
      <InputStyled
        {...rest}
        ref={ref}
        {...{ required, name, error: !!error }}
      />
      {error && <ErrorStyled>{error}</ErrorStyled>}
    </InputFieldStyled>
  )
);

export const InputFieldStyled = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${pxToRem(16)};
`;

export const InputStyled = styled.input<
  Omit<InputProps, 'label' | 'forwardedRef' | 'error'> & {
    error: boolean;
  }
>`
  width: 100%;
  padding: ${pxToRem(10)} ${pxToRem(16)};
  color: ${props => props.theme.colors.lightBlack};
  font-size: ${pxToRem(16)};
  font-weight: 500;
  border: 1px solid
    ${props =>
      props.error ? props.theme.colors.darkRed : props.theme.colors.lightGrey};
  border-radius: ${pxToRem(8)};
  transition: border-color 0.2s ease-in;
  &::placeholder {
    color: ${props => props.theme.colors.lightGrey};
  }
  &:hover,
  &:focus {
    border-color: ${props => props.theme.colors.lightBlack};
  }
`;

const ErrorStyled = styled.span`
  color: ${props => props.theme.colors.darkRed};
  font-size: ${pxToRem(12)};
`;
