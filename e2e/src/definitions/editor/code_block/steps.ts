import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorCodeBlockElements } from './elements';
import { getEditor } from '../../common/utils';

const { Then } = createBdd();

Then('I check that editor contains code block', async ({ page }) => {
  await expect(
    getEditor(page).getByTestId(EditorCodeBlockElements.node)
  ).toHaveCount(1);
});

Then(
  'I check that code block contains {string} value',
  async ({ page }, value: string) => {
    await expect(
      getEditor(page).getByTestId(EditorCodeBlockElements.node)
    ).toHaveText(value);
  }
);
