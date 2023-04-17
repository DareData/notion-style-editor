import { debounce } from 'lodash';
import { useEffect, useMemo } from 'react';

type UseDebounceProps<T> = {
  callback: T;
  wait?: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyFunction = (...args: any) => any;

export const useDebounce = <T extends AnyFunction>({
  callback,
  wait = 300,
}: UseDebounceProps<T>) => {
  const handler = useMemo(() => {
    return debounce(callback, wait);
  }, [callback, wait]);

  useEffect(() => {
    return () => handler.cancel();
  }, [handler]);

  return {
    debounce: handler,
  };
};
