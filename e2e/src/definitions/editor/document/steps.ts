import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorDocumentElements } from './elements';

const { Then } = createBdd();

Then(
  'I check, if image node contains {string} source value',
  async ({ page }, source: string) => {
    await expect(
      page.getByTestId(EditorDocumentElements.image.container)
    ).toHaveAttribute('src', source);
  }
);

Then(
  'I check, if file node contains {string} text',
  async ({ page }, source: string) => {
    await expect(
      page.getByTestId(EditorDocumentElements.file.container)
    ).toHaveText(source);
  }
);
