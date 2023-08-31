import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

import { EditorMathElements } from './elements';
import { getEditor } from '../../common/utils';

const { Then } = createBdd();

Then('I check that editor contains math', async ({ page }) => {
  await expect(
    getEditor(page).getByTestId(EditorMathElements.node)
  ).toHaveCount(1);
});
