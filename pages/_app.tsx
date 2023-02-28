import { ChakraProvider, extendTheme } from '@chakra-ui/react';

import type { AppProps } from 'next/app';

import theme from '@/styles/theme';
import '@/styles/globals.scss';

const customTheme = extendTheme(theme);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />;
    </ChakraProvider>
  );
}
