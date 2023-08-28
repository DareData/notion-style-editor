import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  paths: ['src/features/**/*.feature'],
  require: ['src/definitions/**/*.ts'],
});

export default defineConfig({
  testDir,
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
