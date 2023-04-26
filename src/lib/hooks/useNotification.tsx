import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

export const useNotification = () => {
  const onErrorNotification = useCallback((message: string) => {
    toast.error(message, { position: 'bottom-center' });
  }, []);

  const onSuccessNotification = useCallback((message: string) => {
    toast.success(message, { position: 'bottom-center' });
  }, []);

  return { onErrorNotification, onSuccessNotification };
};
