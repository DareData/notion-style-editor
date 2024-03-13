import { createBdd } from 'playwright-bdd';

import { getEditor } from './utils';

const { Given, When } = createBdd();

Given('I open the editor page', async ({ page }) => {
  await page.goto('http://localhost:5173');
});

Given(
  'I set initial editor value to {string}',
  async ({ context }, value: string) => {
    await context.addInitScript(v => {
      window.localStorage.setItem('editor_state', v.replaceAll('\\n', '\n'));
    }, value);
  }
);

When('I click {string} button', async ({ page }, text: string) => {
  await page.locator('button').getByText(text, { exact: true }).click();
});

When('I type {string} value to the editor', async ({ page }, text: string) => {
  await getEditor(page).type(text);
});
