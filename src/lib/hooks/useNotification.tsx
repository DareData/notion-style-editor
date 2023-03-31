import { toast } from 'react-hot-toast';

export const useNotification = () => {
  const onErrorNotification = (message: string) => {
    toast.error(message, { position: 'bottom-center' });
  };

  const onSuccessNotification = (message: string) => {
    toast.success(message, { position: 'bottom-center' });
  };

  return { onErrorNotification, onSuccessNotification };
};
