import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { getEditor } from '../../common/utils';

const { Then } = createBdd();

Then(
  'I check that editor contains {string} link with {string} href attribute',
  async ({ page }, text: string, href: string) => {
    const linkRef = getEditor(page).locator('a').getByText(text);
    await expect(linkRef).toHaveCount(1);
    await expect(linkRef).toHaveAttribute('href', href);
  }
);

Then(
  'I check that editor does not contain {string} link',
  async ({ page }, text: string) => {
    await expect(getEditor(page).locator('a').getByText(text)).toHaveCount(0);
  }
);
