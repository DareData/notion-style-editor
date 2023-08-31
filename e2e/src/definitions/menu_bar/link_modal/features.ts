import { createBdd } from 'playwright-bdd';

import { LinkModalElements } from './elements.ts';

const { When } = createBdd();

When(
  'I fill link text input with {string} text',
  async ({ page }, text: string) => {
    await page.getByTestId(LinkModalElements.textInput).clear();
    await page.getByTestId(LinkModalElements.textInput).type(text);
  }
);

When(
  'I fill link href input with {string} text',
  async ({ page }, text: string) => {
    await page.getByTestId(LinkModalElements.hrefInput).clear();
    await page.getByTestId(LinkModalElements.hrefInput).type(text);
  }
);
