import { useContext } from 'react';

import { TextEditorContext } from './TextEditorContextProvider';

export const useTextEditorContext = () => useContext(TextEditorContext);
