import { useNotification } from '../../../hooks/useNotification';
import { bytesToMegaBytes } from '../../../utils/utils';

const formats = ['image/jpeg'];

export const useFileValidation = () => {
  const { onErrorNotification } = useNotification();

  const isFileValid = (file: File) => {
    if (!file) {
      onErrorNotification('File is not provided');
      return false;
    }

    if (bytesToMegaBytes(file.size) >= 20) {
      onErrorNotification(
        'File size exceeds 20MB. Rather add a link to larger files if needed.'
      );
      return false;
    }

    if (!formats.includes(file.type)) {
      onErrorNotification(
        'Unsupported file format. Please upload an image format.'
      );
      return false;
    }
    return true;
  };

  return { isFileValid };
};
