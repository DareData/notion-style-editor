/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

import 'styled-components';
import { Theme } from './lib/styles/theme';

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
