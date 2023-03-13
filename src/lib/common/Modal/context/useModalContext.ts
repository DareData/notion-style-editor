import { useContext } from 'react';

import { ModalContext } from './ModalContextProvider';

export const useModalContext = () => useContext(ModalContext);
