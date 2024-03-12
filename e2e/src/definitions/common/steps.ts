import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { CommonElements } from './elements';

const { Then } = createBdd();

Then(
  'I check that editor retrieved text contains {string} value',
  async ({ page }, value: string) => {
    await expect(
      page.getByTestId(CommonElements.editor_retrieved_value)
    ).toHaveText(value);
  }
);
