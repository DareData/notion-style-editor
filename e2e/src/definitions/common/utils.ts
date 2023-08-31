import { Page } from '@playwright/test';

export const getEditor = (page: Page) => page.locator('.editor');
