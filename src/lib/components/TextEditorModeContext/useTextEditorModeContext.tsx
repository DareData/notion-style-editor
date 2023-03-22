import { useContext } from 'react';

import { TextEditorModeContext } from './TextEditorModeContextProvider';

export const useTextEditorModeContext = () => useContext(TextEditorModeContext);
