import { toast } from 'react-hot-toast';

export const useNotification = () => {
  const onErrorNotification = (message: string) => {
    toast.error(message, { position: 'bottom-right' });
  };

  return { onErrorNotification };
};
