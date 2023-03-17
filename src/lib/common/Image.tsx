import { forwardRef } from 'react';

import { ImageLoader } from './ImageLoader';
import { LoaderSize } from './Loader';
import { errorMessages } from '../config/errorMessages';
import { useNotification } from '../hooks/useNotification';
import { useToggler } from '../hooks/useToggler';

type ImageProps = Omit<
  React.ImgHTMLAttributes<HTMLImageElement>,
  'children'
> & {
  children?: (loading: boolean) => React.ReactNode;
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
      <ImageLoader
        {...{ loaderSize, loaderHeight, loaderWidth, className }}
        isLoading={loading.state}
      >
        <>
          <img ref={imageRef} {...rest} onLoad={loading.off} {...{ onError }} />
          {typeof children === 'function' && children(loading.state)}
        </>
      </ImageLoader>
    );
  }
);
