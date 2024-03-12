import { createBdd } from 'playwright-bdd';

import { EditorMentioningElements } from './elements';

const { When } = createBdd();

When(
  'I select {string} value from mentioning list dropdown',
  async ({ page }, option: string) => {
    const list = page.getByTestId(EditorMentioningElements.list);
    const item = list.filter({ hasText: option });
    await item.click();
  }
);
