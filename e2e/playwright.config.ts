import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.features-gen',
  projects: [{ name: 'e2e' }],
  use: {
    baseURL: process.env.TEST_URL,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  expect: {
    timeout: 20000,
  },
  timeout: 60000,
  globalTimeout: 1200000,
  workers: 1,
});
