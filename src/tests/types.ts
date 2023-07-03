import { Mock } from 'vitest';

// eslint-disable-next-line @typescript-eslint/ban-types
export type MockedModule<Module extends Record<string, Function>> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key in keyof Module]: Module[key] extends (...args: any) => any
    ? Mock<ReturnType<Module[key]>, Parameters<Module[key]>>
    : never;
};
