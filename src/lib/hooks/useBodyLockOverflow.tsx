import { useEffect } from 'react';

type UseBodyLockOverflowProps = {
  isLock: boolean;
};

export const useBodyLockOverflow = ({ isLock }: UseBodyLockOverflowProps) => {
  useEffect(() => {
    if (isLock) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLock]);
};
