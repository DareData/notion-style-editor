import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorMermaidElements } from './elements';
import { getEditor } from '../../common/utils';

const { Then } = createBdd();

Then('I check that editor contains mermaid', async ({ page }) => {
  await expect(
    getEditor(page).getByTestId(EditorMermaidElements.node)
  ).toHaveCount(1);
});
