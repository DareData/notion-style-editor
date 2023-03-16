import { useState } from 'react';

import { useBase64File } from '../../../hooks/useBase64File';

export const useFileConvertion = () => {
  const [loading, setLoading] = useState(false);
  const { getBase64 } = useBase64File();

  const onFileConvert = async (files: FileList) => {
    const [file] = files;

    if (!file) {
      console.log('no file found');
      return;
    }

    try {
      setLoading(true);
      return await getBase64(file);
    } catch (e) {
      console.log('e: ', e);
    } finally {
      setLoading(false);
    }
  };

  return { onFileConvert, loading };
};
