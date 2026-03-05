// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

//test('get started link', async ({ page }) => {

  
//});

/**
 
 
//Esta seccion manipula lso label y textfield de la seccion de busqueda del user management

await page.getByRole('button', { name: 'Save' }).click();
await page.getByText('SuccessSuccessfully Saved×').click();
await page.getByText('Successfully Saved').click();


await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('textbox').nth(2).click();
await page.getByRole('textbox').nth(2).fill('dsasd');
await page.getByRole('button', { name: 'Save' }).click();


await page.getByRole('listitem').filter({ hasText: 'User Management' }).locator('i').click();
*/