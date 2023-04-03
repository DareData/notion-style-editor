export enum KeyboardCodes {
  'ArrowUp' = 'ArrowUp',
  'ArrowDown' = 'ArrowDown',
  'Escape' = 'Escape',
}

export type KeyboardCodesTypes = KeyboardCodes;

export const KeyboardMatcher = (e: KeyboardEvent) => ({
  [KeyboardCodes.Escape]: (fn: () => void) => {
    if (KeyboardCodes.Escape === e.code) {
      fn();
    }
    return KeyboardMatcher(e);
  },
  [KeyboardCodes.ArrowUp]: (fn: () => void) => {
    if (KeyboardCodes.ArrowUp === e.code) {
      fn();
    }
    return KeyboardMatcher(e);
  },
  [KeyboardCodes.ArrowDown]: (fn: () => void) => {
    if (KeyboardCodes.ArrowDown === e.code) {
      fn();
    }
    return KeyboardMatcher(e);
  },
});
