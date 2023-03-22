import { createContext, useMemo } from 'react';

import { TextEditorMode } from '../../packages/TextEditor';

type TextEditorModeContextData = {
  mode: TextEditorMode;
};

export const TextEditorModeContext = createContext<TextEditorModeContextData>({
  mode: 'preview',
});

type TextEditorModeContextProviderProps = {
  mode: TextEditorMode;
  children: React.ReactNode;
};

export const TextEditorModeContextProvider = ({
  mode,
  children,
}: TextEditorModeContextProviderProps) => {
  const context = useMemo(() => ({ mode }), [mode]);

  return (
    <TextEditorModeContext.Provider value={context}>
      {children}
    </TextEditorModeContext.Provider>
  );
};
