import { useState } from 'react';

import { useNotification } from '../../../hooks/useNotification';
import { useTextEditorContext } from '../../TextEditorContext/useTextEditoContext';

export const useFileConvertion = () => {
  const { onFileUpload, onFileValidation } = useTextEditorContext();
  const [loading, setLoading] = useState(false);

  const { onErrorNotification } = useNotification();

  const onFileConvert = async (files: FileList) => {
    const [file] = files;

    if (onFileValidation && !onFileValidation(file)) {
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
