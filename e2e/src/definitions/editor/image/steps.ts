import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorImageElements } from './elements.ts';

const { Then } = createBdd();

Then(
  'I check, if image node contains {string} source value',
  async ({ page }, source: string) => {
    await expect(
      page.getByTestId(EditorImageElements.container)
    ).toHaveAttribute('src', source);
  }
);
