import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage, CheckoutPage } from '../pages/SwagLabs.js';

test.describe('Checkout Data Boundaries', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await loginPage.navigate();
    await loginPage.login('standard_user');
    await inventory.getAddToCartBtn('sauce-labs-backpack').click();
    await inventory.cartLink.click();
    await page.locator('[data-test="checkout"]').click();
  });

  test('TC-CHECKOUT-001: End-to-end checkout with valid inputs', async ({
    page,
  }) => {
    const checkout = new CheckoutPage(page);

    await checkout.fillShippingInfo('Mohamed', 'Habash', '31511');
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    await checkout.finishBtn.click();
    await expect(checkout.completeHeader).toHaveText(
      'Thank you for your order!',
    );
  });

  test('BUG-003: problem_user input overwrite defect', async ({ page }) => {
    test.fail(
      true,
      'problem_user overwrites last name with first name data automatically',
    );

    // Clear context to ensure a fresh session for the problem user
    await page.context().clearCookies();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('problem_user');
    await page.goto('/checkout-step-one.html');

    const checkout = new CheckoutPage(page);
    await checkout.firstNameInput.fill('Mohamed');
    await checkout.lastNameInput.fill('Habash');

    // Soft assertion: check if the UI erroneously overwrote the data
    expect.soft(await checkout.lastNameInput.inputValue()).toBe('Habash');
  });
});
