import styled, { keyframes } from 'styled-components';

const sizes = { thin: '16px', small: '24px', normal: '36px', large: '60px' };
const borderSizes = { thin: '2px', small: '2px', normal: '4px', large: '4px' };
export type LoaderSize = keyof typeof sizes;

export type LoaderProps = React.HtmlHTMLAttributes<HTMLDivElement> & {
  size?: LoaderSize;
  loading?: boolean;
  children?: React.ReactNode;
};

export const Loader: React.FC<LoaderProps> = ({
  size = 'small',
  loading = true,
  children,
  className,
  ...rest
}) => {
  if (!loading) {
    return <>{children}</>;
  }
  return (
    <ContainerStyled data-test-role="spinner" {...{ className }}>
      <SpinnerStyled {...rest} {...{ size }} />
    </ContainerStyled>
  );
};

const ContainerStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const getSize = (size: LoaderSize = 'small') => sizes[size];
const getBorderSize = (size: LoaderSize = 'small') => borderSizes[size];

export const SpinnerStyled = styled.div<{ size: LoaderSize }>`
  width: ${props => getSize(props.size)};
  height: ${props => getSize(props.size)};
  text-indent: -9999em;
  border-top: ${props => getBorderSize(props.size)} solid
    ${props => props.theme.colors.secondaryGrey};
  border-right: ${props => getBorderSize(props.size)} solid
    ${props => props.theme.colors.secondaryGrey};
  border-bottom: ${props => getBorderSize(props.size)} solid
    ${props => props.theme.colors.secondaryGrey};
  border-left: ${props => getBorderSize(props.size)} solid
    ${props => props.theme.colors.lightGreen};
  border-radius: 50%;
  animation: 0.65s linear ${spinAnimation} infinite;
`;
