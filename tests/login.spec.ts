import { test, expect } from '@playwright/test';

test('standard user can log in', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.waitForTimeout(2000);

  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('locked out user sees error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('locked_out_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const error = await page.locator('.error-message-container').textContent();
  expect(error).toContain('locked out');
});

test('invalid password shows error', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('wrong_password');
  await page.locator('#login-button').click();

  await expect(page.locator('h3[data-test="error"]')).toBeVisible();
});

test('empty fields block login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#login-button').click();

  await expect(page.locator('.error-message-container')).toBeVisible();
});
