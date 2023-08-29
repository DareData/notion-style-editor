import { createBdd } from 'playwright-bdd';

const { Given, When } = createBdd();

Given('I open the editor page', async ({ page }) => {
  await page.goto('http://localhost:5173');
});

When('I click {string} button', async ({ page }, text: string) => {
  await page.locator('button').getByText(text, { exact: true }).click();
});
