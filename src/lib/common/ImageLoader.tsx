import styled, { css } from 'styled-components';

import { Loader, LoaderSize } from './Loader';

type ImageLoaderProps = {
  isLoading?: boolean;
  children?: React.ReactNode;
  className?: string;
  loaderSize?: LoaderSize;
  loaderWidth?: number;
  loaderHeight?: number;
};

export const ImageLoader: React.FC<ImageLoaderProps> = ({
  children,
  isLoading = true,
  loaderSize = 'large',
  className = '',
  loaderWidth = 300,
  loaderHeight = 300,
}) => (
  <ImageContainerStyled
    {...{ className }}
    $loading={isLoading}
    $loaderHeight={loaderHeight}
    $loaderWidth={loaderWidth}
  >
    <LoaderStyled size={loaderSize} loading={isLoading} />
    {children}
  </ImageContainerStyled>
);

type ImageContainerProps = {
  $loading: boolean;
  $loaderWidth: number;
  $loaderHeight: number;
};
const ImageContainerStyled = styled.div<ImageContainerProps>`
  position: relative;
  ${props =>
    props.$loading &&
    css<{ $loaderWidth: number; $loaderHeight: number }>`
      background-color: ${props => props.theme.colors.secondaryLightGrey};
      width: ${props => props.$loaderWidth}px;
      height: ${props => props.$loaderHeight}px;
    `}
`;

const LoaderStyled = styled(Loader)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;
