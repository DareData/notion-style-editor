import { useCallback, useState } from 'react';

export const useToggler = (initialState = false) => {
  const [state, setState] = useState(initialState);

  return {
    state,
    on: useCallback(() => setState(true), []),
    off: useCallback(() => setState(false), []),
    toggle: useCallback(() => setState(state => !state), []),
  };
};
