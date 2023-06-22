import { useState } from 'react';

import { useFileValidation } from './useFileValidation';
import { useNotification } from '../../../hooks/useNotification';
import { useTextEditorContext } from '../../TextEditorContext/useTextEditoContext';

export const useFileConvertion = () => {
  const { onFileUpload } = useTextEditorContext();
  const [loading, setLoading] = useState(false);

  const { isFileValid } = useFileValidation();
  const { onErrorNotification } = useNotification();

  const onFileConvert = async (files: FileList) => {
    const [file] = files;

    if (!isFileValid(file)) {
      return;
    }

    try {
      setLoading(true);
      return await onFileUpload(file);
    } catch (e) {
      onErrorNotification('Something bad happened');
    } finally {
      setLoading(false);
    }
  };

  return { onFileConvert, loading };
};
