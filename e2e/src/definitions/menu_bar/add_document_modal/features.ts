import { createBdd } from 'playwright-bdd';

import { AddDocumentModalElements } from './elements';

const { When } = createBdd();

When(
  'I fill add document url input with {string} text',
  async ({ page }, text: string) => {
    await page.getByTestId(AddDocumentModalElements.urlInput).type(text);
  }
);
