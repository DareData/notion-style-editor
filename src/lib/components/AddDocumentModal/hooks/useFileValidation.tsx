import { errorMessages } from '../../../config/errorMessages';
import { useNotification } from '../../../hooks/useNotification';
import { bytesToMegaBytes } from '../../../utils/utils';
import { useTextEditorContext } from '../../TextEditorContext/useTextEditoContext';

export const useFileValidation = () => {
  const { onErrorNotification } = useNotification();
  const { acceptedFormats } = useTextEditorContext();

  const isFileValid = (file: File) => {
    if (!file) {
      onErrorNotification(errorMessages.image.not_image);
      return false;
    }

    if (
      !acceptedFormats.includes('*') &&
      !acceptedFormats.includes(file.type)
    ) {
      onErrorNotification(errorMessages.image.format);
      return false;
    }

    if (bytesToMegaBytes(file.size) >= 20) {
      onErrorNotification(errorMessages.image.size);
      return false;
    }

    return true;
  };

  return { isFileValid };
};
