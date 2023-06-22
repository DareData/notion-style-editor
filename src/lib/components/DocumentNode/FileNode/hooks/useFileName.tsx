import { useMemo } from 'react';

type UseFileNameProps = {
  src?: string;
};

export const useFileName = ({ src = '' }: UseFileNameProps) => {
  const name = useMemo(() => src.split('/').at(-1) || '', [src]);

  return { name };
};
