import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { getEditor } from '../../common/utils';

const { Then } = createBdd();

Then('I check that editor contains table', async ({ page }) => {
  await expect(getEditor(page).locator('table')).toHaveCount(1);
});

Then('I check that editor does not contain table', async ({ page }) => {
  await expect(getEditor(page).locator('table')).toHaveCount(0);
});

Then(
  'I check that table contains {string} rows',
  async ({ page }, count: string) => {
    const tableRef = getEditor(page).locator('table');
    await expect(tableRef.locator('tr')).toHaveCount(parseInt(count));
  }
);

Then(
  'I check that table contains {string} columns',
  async ({ page }, count: string) => {
    const tableRef = getEditor(page).locator('table');
    const rowsRef = tableRef.locator('tr');
    await expect(rowsRef.locator('th')).toHaveCount(parseInt(count));
  }
);
