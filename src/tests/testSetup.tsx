import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import {
  render,
  renderHook,
  RenderHookOptions,
  RenderOptions,
} from '@testing-library/react';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from 'styled-components';

import { toasterStyles } from '../lib/styles/common/toaster.styles';
import { theme } from '../lib/styles/theme';

const wrapWithProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider {...{ theme }}>
      <MilkdownProvider>
        <ProsemirrorAdapterProvider>
          <Toaster toastOptions={toasterStyles} />
          {children}
        </ProsemirrorAdapterProvider>
      </MilkdownProvider>
    </ThemeProvider>
  );
};

const customComponentRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: wrapWithProviders, ...options });

const customHookRender = <P, V>(
  hook: (props: P) => V,
  options?: RenderHookOptions<P>
) =>
  renderHook(hook, {
    wrapper: ({ children }) => wrapWithProviders({ children }),
    ...options,
  });

export * from '@testing-library/react';
export { customHookRender, customComponentRender };
