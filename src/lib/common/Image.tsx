import { useRef } from 'react';
import styled from 'styled-components';

import { ImageLoader } from './ImageLoader';
import { LoaderSize } from './Loader';
import { errorMessages } from '../config/errorMessages';
import { useNotification } from '../hooks/useNotification';
import { useToggler } from '../hooks/useToggler';
import { pxToRem } from '../styles/utils';

type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'children'
> & {
  children?: (loading: boolean) => React.ReactNode;
  className?: string;
  loaderWidth?: number;
  loaderHeight?: number;
};

export const Image: React.FC<ImageProps> = ({
  onLoad,
  children,
  className = '',
  loaderHeight = 300,
  loaderWidth = 300,
  ...rest
}) => {
  const loading = useToggler(true);
  const imageRef = useRef<HTMLImageElement>(null);

  const { onErrorNotification } = useNotification();

  const onError = () => {
    loading.off();
    onErrorNotification(errorMessages.image.upload);
  };

  const loaderSize: LoaderSize =
    loaderHeight > 150 && loaderWidth > 150 ? 'large' : 'normal';

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    onLoad?.(e);
    loading.off();
  };

  return (
    <ImageLoaderStyled
      {...{ loaderSize, loaderHeight, loaderWidth, className }}
      isLoading={loading.state}
    >
      <>
        <ImageStyled
          ref={imageRef}
          {...rest}
          onLoad={onImageLoad}
          {...{ onError }}
        />
        {typeof children === 'function' && children(loading.state)}
      </>
    </ImageLoaderStyled>
  );
};

const ImageStyled = styled.img`
  aspect-ratio: auto;
  max-width: ${pxToRem(500)};
  max-height: ${pxToRem(500)};
`;

const ImageLoaderStyled = styled(ImageLoader)`
  display: flex;
`;
