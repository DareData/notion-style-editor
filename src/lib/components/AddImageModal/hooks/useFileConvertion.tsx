import { useState } from 'react';

import { useFileValidation } from './useFileValidation';
import { useBase64File } from '../../../hooks/useBase64File';
import { useNotification } from '../../../hooks/useNotification';

export const useFileConvertion = () => {
  const [loading, setLoading] = useState(false);

  const { getBase64 } = useBase64File();
  const { isFileValid } = useFileValidation();
  const { onErrorNotification } = useNotification();

  const onFileConvert = async (files: FileList) => {
    const [file] = files;

    if (!isFileValid(file)) {
      return;
    }

    try {
      setLoading(true);
      return await getBase64(file);
    } catch (e) {
      onErrorNotification('Something bad happened');
    } finally {
      setLoading(false);
    }
  };

  return { onFileConvert, loading };
};
