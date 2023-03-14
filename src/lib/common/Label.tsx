import styled, { css } from 'styled-components';

import { pxToRem } from '../styles/utils';

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  text: string;
  error?: string;
  required?: boolean;
};

export const Label: React.FC<LabelProps> = ({
  text,
  required = false,
  ...rest
}) => (
  <LabelStyled required={required} {...rest}>
    {text}
  </LabelStyled>
);

const LabelStyled = styled.label<{ required: boolean; error?: string }>`
  display: inline-block;
  margin-bottom: ${pxToRem(8)};
  color: ${props =>
    props.error ? props.theme.colors.darkRed : props.theme.colors.lightBlack};
  ${props =>
    props.required &&
    css`
      &:after {
        color: ${props => props.theme.colors.darkRed};
        content: '*';
      }
    `}
`;
