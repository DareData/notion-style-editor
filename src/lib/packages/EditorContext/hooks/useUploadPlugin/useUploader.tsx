import { Schema, Node } from '@milkdown/prose/model';
import { useCallback } from 'react';

import { useTextEditorContext } from '../../../../components/TextEditorContext/useTextEditoContext';

export const useUploader = () => {
  const { onFileUpload } = useTextEditorContext();

  const uploader = useCallback(
    async (files: FileList, schema: Schema): Promise<Node[]> => {
      const images: File[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (!file) {
          continue;
        }

        if (!file.type.includes('image')) {
          continue;
        }

        images.push(file);
      }

      return await Promise.all(
        images.map(async image => {
          console.log('images: ', images);
          const src = await onFileUpload(image);
          const alt = image.name;
          return schema.nodes.image.createAndFill({
            src,
            alt,
          }) as Node;
        })
      );
    },
    [onFileUpload]
  );

  return uploader;
};
