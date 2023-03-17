import { Ctx } from '@milkdown/ctx';
import { upload, uploadConfig } from '@milkdown/plugin-upload';
import { useWidgetViewFactory } from '@prosemirror-adapter/react';
import { useMemo } from 'react';

import { ImageLoader } from '../../../common/ImageLoader';

export const useUploadPlugin = () => {
  const widgetViewFactory = useWidgetViewFactory();

  const uploadPlugin = useMemo(
    () =>
      [
        upload,
        (ctx: Ctx) => {
          ctx.update(uploadConfig.key, prev => ({
            ...prev,
            uploadWidgetFactory: widgetViewFactory({
              as: 'div',
              component: () => <ImageLoader />,
            }),
          }));
        },
      ].flat(),
    [widgetViewFactory]
  );

  return uploadPlugin;
};
