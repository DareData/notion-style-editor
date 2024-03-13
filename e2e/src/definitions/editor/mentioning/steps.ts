import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorMentioningElements } from './elements';

const { Then } = createBdd();

Then(
  'I check that mentioning list dropdown contains {string} options',
  async ({ page }, options: string) => {
    const listOptions = options.split(',');
    const list = page.getByTestId(EditorMentioningElements.list);
    const items = list.getByTestId(EditorMentioningElements.item);

    expect(items).toHaveCount(listOptions.length);
    expect(items).toHaveText(listOptions);
  }
);
