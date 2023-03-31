import { useContext } from 'react';

import { EditorContext } from './EditorContextProvider';

export const useEditorContext = () => useContext(EditorContext);
