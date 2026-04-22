import { test, expect } from '@playwright/test';

test('full checkout flow succeeds', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();
  await page.waitForTimeout(1000);

  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('#add-to-cart-sauce-labs-bike-light').click();

  await page.locator('.shopping_cart_link').click();
  await expect(page).toHaveURL(/cart\.html/);

  await page.locator('#checkout').click();
  await page.locator('#first-name').fill('John');
  await page.locator('#last-name').fill('Doe');
  await page.locator('#postal-code').fill('01001000');
  await page.locator('#continue').click();

  const subtotal = await page.locator('.summary_subtotal_label').textContent();
  console.log('subtotal:', subtotal);
  expect(subtotal).toContain('$');

  await page.locator('#finish').click();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});

test('checkout fails without first name', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.locator('#add-to-cart-sauce-labs-backpack').click();
  await page.locator('.shopping_cart_link').click();
  await page.locator('#checkout').click();

  await page.locator('#continue').click();

  await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
});
