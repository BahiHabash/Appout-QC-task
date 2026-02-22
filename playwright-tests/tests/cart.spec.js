import { test, expect } from '@playwright/test';
import { LoginPage, InventoryPage } from '../pages/SwagLabs.js';

test.describe('Cart State Mutations', () => {
  /** @type {LoginPage} */
  let loginPage;
  /** @type {InventoryPage} */
  let inventory;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventory = new InventoryPage(page);
  });

  test('TC-CART-001: Standard user can add and remove items', async ({
    page,
  }) => {
    await loginPage.navigate();
    await loginPage.login('standard_user');

    await test.step('Add item and verify badge', async () => {
      await inventory.getAddToCartBtn('sauce-labs-backpack').click();
      await expect(inventory.cartBadge).toHaveText('1');
    });

    await test.step('Remove item and verify state clears', async () => {
      await inventory.getRemoveBtn('sauce-labs-backpack').click();
      await expect(inventory.cartBadge).not.toBeVisible();
    });
  });

  test('BUG-002: problem_user fails to mutate cart state on specific items', async ({
    page,
  }) => {
    test.fail(
      true,
      'State mutation bug exists on fleece jacket for problem_user',
    );

    await loginPage.navigate();
    await loginPage.login('problem_user');

    const jacketBtn = inventory.getAddToCartBtn('sauce-labs-fleece-jacket');
    await jacketBtn.click();

    // Assertion fails because the bug prevents the button from turning into "Remove"
    await expect(
      inventory.getRemoveBtn('sauce-labs-fleece-jacket'),
    ).toBeVisible({ timeout: 2000 });
  });
});
