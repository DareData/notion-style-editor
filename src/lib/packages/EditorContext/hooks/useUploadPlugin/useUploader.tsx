import { Schema, Node } from '@milkdown/prose/model';
import { useCallback } from 'react';

import { useTextEditorContext } from '../../../../components/TextEditorContext/useTextEditoContext';
import { errorMessages } from '../../../../config/errorMessages';
import { useNotification } from '../../../../hooks/useNotification';
import { Matcher } from '../../../../utils/Matcher';

const isFormatValid = (format: string, acceptedFiles: string[]) => {
  const splittedFormat = format.split('/');
  const { 0: type, [splittedFormat.length - 1]: extension } = splittedFormat;

  if (acceptedFiles.includes('*')) {
    return true;
  }

  return Matcher(type)
    .match('image', () => {
      if (acceptedFiles.includes('image/*')) {
        return true;
      }
      return acceptedFiles.includes(`.${extension}`);
    })
    .match('application', () => {
      if (acceptedFiles.includes('application/*')) {
        return true;
      }
      return acceptedFiles.includes(`.${extension}`);
    })
    .getOrElse(() => false);
};

export const useUploader = () => {
  const { onErrorNotification } = useNotification();
  const { onFileUpload, acceptedFormats } = useTextEditorContext();

  const uploader = useCallback(
    async (files: FileList, schema: Schema): Promise<Node[]> => {
      try {
        const images: File[] = [];

        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          if (!file) {
            continue;
          }
          if (!isFormatValid(file.type, acceptedFormats)) {
            onErrorNotification(errorMessages.image.format);
            continue;
          }
          images.push(file);
        }

        return await Promise.all(
          images.map(async image => {
            const src = await onFileUpload(image);
            const alt = image.name;
            return schema.nodes.image.createAndFill({
              src,
              alt,
            }) as Node;
          })
        );
      } catch (e) {
        onErrorNotification('Something bad happened');
        return [];
      }
    },
    [onFileUpload, onErrorNotification, acceptedFormats]
  );

  return uploader;
};
