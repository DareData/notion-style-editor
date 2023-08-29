import { createBdd } from 'playwright-bdd';

import { MenuBarElements } from './elements.ts';

const { When } = createBdd();

When(
  'I click on {string} icon in menu bar',
  async ({ page }, item: keyof (typeof MenuBarElements)['items']) => {
    await page.getByTestId(MenuBarElements.items[item]).click();
  }
);
