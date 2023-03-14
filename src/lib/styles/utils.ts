import { theme } from './theme';

export const pxToRem = (val: number) => `${val / theme.sizes.baseSize}rem`;
