import { forwardRef } from 'react';
import styled, { css } from 'styled-components';

import { Loader, LoaderSize } from './Loader';
import { errorMessages } from '../config/errorMessages';
import { useNotification } from '../hooks/useNotification';
import { useToggler } from '../hooks/useToggler';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  children: (loading: boolean) => React.ReactNode;
  className?: string;
  loaderWidth?: number;
  loaderHeight?: number;
};

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      children,
      className = '',
      loaderHeight = 300,
      loaderWidth = 300,
      ...rest
    },
    imageRef
  ) => {
    const { onErrorNotification } = useNotification();
    const loading = useToggler(true);

    const onError = () => {
      loading.off();
      onErrorNotification(errorMessages.image.upload);
    };

    const loaderSize: LoaderSize =
      loaderHeight > 150 && loaderWidth > 150 ? 'large' : 'normal';

    return (
      <ImageContainerStyled
        {...{ className }}
        $loading={loading.state}
        $loaderHeight={loaderHeight}
        $loaderWidth={loaderWidth}
      >
        <LoaderStyled size={loaderSize} loading={loading.state} />
        <img ref={imageRef} {...rest} onLoad={loading.off} {...{ onError }} />
        {typeof children === 'function' && children(loading.state)}
      </ImageContainerStyled>
    );
  }
);

const ImageContainerStyled = styled.div<{
  $loading: boolean;
  $loaderWidth: number;
  $loaderHeight: number;
}>`
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
