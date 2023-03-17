import { errorMessages } from '../../../config/errorMessages';
import { useNotification } from '../../../hooks/useNotification';
import { bytesToMegaBytes } from '../../../utils/utils';

const formats = [
  'image/jpeg',
  'image/jpg',
  'image/gif',
  'image/png',
  'image/tiff',
  'image/bmp',
  'image/eps',
  'image/svg',
];

export const useFileValidation = () => {
  const { onErrorNotification } = useNotification();

  const isFileValid = (file: File) => {
    if (!file) {
      onErrorNotification(errorMessages.image.not_image);
      return false;
    }

    if (bytesToMegaBytes(file.size) >= 20) {
      onErrorNotification(errorMessages.image.size);
      return false;
    }

    if (!formats.includes(file.type)) {
      onErrorNotification(errorMessages.image.format);
      return false;
    }
    return true;
  };

  return { isFileValid };
};
