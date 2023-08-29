import { createBdd } from 'playwright-bdd';

import { AddDocumentModalElements } from './elements.ts';

const { When } = createBdd();

When(
  'I fill document url input with {string} text',
  async ({ page }, text: string) => {
    await page.getByTestId(AddDocumentModalElements.urlInput).type(text);
  }
);
