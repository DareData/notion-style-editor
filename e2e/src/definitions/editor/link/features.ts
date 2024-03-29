import { createBdd } from 'playwright-bdd';

import { EditorLinkElements } from './elements';
import { getEditor } from '../../common/utils';

const { When } = createBdd();

When('I open edit link modal', async ({ page }) => {
  await page.getByTestId(EditorLinkElements.tooltip.editButton).click();
});

When('I click on {string} link', async ({ page }, text: string) => {
  await getEditor(page).locator('a').getByText(text).click();
});
