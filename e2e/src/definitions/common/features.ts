import { createBdd } from 'playwright-bdd';

const { Given, When } = createBdd();

Given('I open the editor page', async ({ page }) => {
  await page.goto('http://localhost:5173');
});

Given(
  'I set initial editor value to {string}',
  async ({ context }, value: string) => {
    await context.addInitScript(v => {
      window.localStorage.setItem('editor_state', v.replaceAll('\\n', '\n'));
      console.log('dipa!!');
      console.log(window.localStorage.getItem('editor_state'));
    }, value);
  }
);

When('I click {string} button', async ({ page }, text: string) => {
  await page.locator('button').getByText(text, { exact: true }).click();
});
