import { test, expect } from '@playwright/test';

test('inventory lists 6 products', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.waitForTimeout(1500);

  const items = page.locator('.inventory_item');
  expect(await items.count()).toBe(6);
});

test('first product has name and price', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  const firstName = await page
    .locator('div.inventory_list > div:nth-child(1) .inventory_item_name')
    .textContent();
  const firstPrice = await page
    .locator('div.inventory_list > div:nth-child(1) .inventory_item_price')
    .textContent();

  expect(firstName).not.toBeNull();
  expect(firstPrice).toContain('$');
});

test('sort products by price low to high', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('#user-name').fill('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await page.locator('#login-button').click();

  await page.locator('.product_sort_container').selectOption('lohi');
  await page.waitForTimeout(1000);

  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numbers = prices.map((p) => Number(p.replace('$', '')));
  const sorted = [...numbers].sort((a, b) => a - b);
  expect(numbers).toEqual(sorted);
});
