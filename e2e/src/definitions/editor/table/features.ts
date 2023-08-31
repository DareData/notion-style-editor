import { createBdd } from 'playwright-bdd';

import { EditorTableElements } from './elements';
import { getEditor } from '../../common/utils';

const { When } = createBdd();

When('I click on the table', async ({ page }) => {
  await getEditor(page).locator('table').click();
});

When('I click on table heading tooltip', async ({ page }) => {
  const tableRef = getEditor(page).locator('table');
  await tableRef.getByTestId(EditorTableElements.headingTooltipButton).click();
});

When(
  'I click on table row tooltip at {string}',
  async ({ page }, at: string) => {
    const tableRef = getEditor(page).locator('table');
    const rowTooltipRefs = tableRef.getByTestId(
      EditorTableElements.rowTooltipButton
    );
    await rowTooltipRefs.nth(parseInt(at)).click();
  }
);

When(
  'I click on table column tooltip at {string}',
  async ({ page }, at: string) => {
    const tableRef = getEditor(page).locator('table');
    const rowTooltipRefs = tableRef.getByTestId(
      EditorTableElements.columnTooltipButton
    );
    await rowTooltipRefs.nth(parseInt(at)).click();
  }
);

When('I click on remove table button', async ({ page }) => {
  await page.getByTestId(EditorTableElements.tooltip.removeButton).click();
});
