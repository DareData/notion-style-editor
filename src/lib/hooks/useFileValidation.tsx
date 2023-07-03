import { useCallback } from 'react';

import { useNotification } from './useNotification';
import { useTextEditorContext } from '../components/TextEditorContext/useTextEditoContext';
import { errorMessages } from '../config/errorMessages';
import { Matcher } from '../utils/Matcher';
import { bytesToMegaBytes } from '../utils/utils';

const validateFormat = (format: string, acceptedFormats: string[]) => {
  const splittedFormat = format.split('/');
  const { 0: type, [splittedFormat.length - 1]: extension } = splittedFormat;

  if (acceptedFormats.includes('*')) {
    return true;
  }

  return Matcher(type)
    .match('image', () => {
      if (acceptedFormats.includes('image/*')) {
        return true;
      }
      return acceptedFormats.includes(`.${extension}`);
    })
    .match('application', () => {
      if (acceptedFormats.includes('application/*')) {
        return true;
      }
      return acceptedFormats.includes(`.${extension}`);
    })
    .getOrElse(() => false);
};

export const useFileValidation = () => {
  const { acceptedFormats } = useTextEditorContext();
  const { onErrorNotification } = useNotification();

  const isFileValid = useCallback(
    (file: File | null) => {
      if (!file) {
        onErrorNotification(errorMessages.image.not_image);
        return false;
      }

      if (!validateFormat(file.type, acceptedFormats)) {
        onErrorNotification(errorMessages.image.format);
        return false;
      }

      if (bytesToMegaBytes(file.size) >= 20) {
        onErrorNotification(errorMessages.image.size);
        return false;
      }

      return true;
    },
    [onErrorNotification, acceptedFormats]
  );

  return { isFileValid };
};
