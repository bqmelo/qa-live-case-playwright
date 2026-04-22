import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let sharedPage: any;

test.beforeAll(async ({ browser }) => {
  sharedPage = await browser.newPage();
  await sharedPage.goto('https://www.saucedemo.com/');
  await sharedPage.locator('#user-name').fill('standard_user');
  await sharedPage.locator('#password').fill('secret_sauce');
  await sharedPage.locator('#login-button').click();
});

test('add backpack to cart', async () => {
  await sharedPage.locator('#add-to-cart-sauce-labs-backpack').click();

  const badge = await sharedPage.locator('.shopping_cart_badge').textContent();
  console.log('badge after first add:', badge);
  expect(badge).toBe('1');
});

test('add t-shirt to cart', async () => {
  await sharedPage.locator('#add-to-cart-sauce-labs-bolt-t-shirt').click();

  const badge = await sharedPage.locator('.shopping_cart_badge').textContent();
  console.log('badge after second add:', badge);
  expect(badge).toBe('2');
});

test('cart shows both added items', async () => {
  await sharedPage.locator('.shopping_cart_link').click();

  const names = await sharedPage.locator('.inventory_item_name').allTextContents();
  expect(names).toContain('Sauce Labs Backpack');
  expect(names).toContain('Sauce Labs Bolt T-Shirt');
});

test('remove item from cart', async () => {
  await sharedPage.locator('#remove-sauce-labs-backpack').click();
  await sharedPage.waitForTimeout(500);

  const badge = await sharedPage.locator('.shopping_cart_badge').textContent();
  expect(badge).toBe('1');
});
