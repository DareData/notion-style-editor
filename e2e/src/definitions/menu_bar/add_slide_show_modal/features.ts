import { createBdd } from 'playwright-bdd';

import { AddSlideShowModalElements } from './elements';

const { When } = createBdd();

When(
  'I fill add slide show url input with {string} text',
  async ({ page }, text: string) => {
    await page.getByTestId(AddSlideShowModalElements.urlInput).type(text);
  }
);
