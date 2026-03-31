import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';

test.describe('SauceDemo Intentional Bugs - Specialized User Matrix', () => {
    let loginPage, inventory, cart, info;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        info = new CheckoutStepOnePage(page);
        await loginPage.navigate();
    });

    test('BUG-PROBLEM-001: Problem user - Broken product images', async ({ page }) => {
        await loginPage.login('problem_user', 'secret_sauce');
        const backpackImg = await inventory.getProductImageSrc('sauce-labs-backpack');
        // Problem user sees static/404 image for all items
        expect(backpackImg).toContain('sl-404.168b1cce.jpg');
    });

    test('BUG-PROBLEM-002: Problem user - Checkout last name overwrite', async ({ page }) => {
        await loginPage.login('problem_user');
        await inventory.getAddToCartBtn('sauce-labs-backpack').click();
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.firstNameInput.fill('Mohamed');
        await info.lastNameInput.fill('Habash');
        
        const lastNameValue = await info.lastNameInput.inputValue();
        // In problem_user, clicking or filling often results in one field overwriting the other
        expect.soft(lastNameValue, 'Last name should not be empty or overwritten by first name content').toBe('Habash');
    });

    test('BUG-PROBLEM-003: Problem user - Sorting is non-functional', async ({ page }) => {
        await loginPage.login('problem_user');
        await inventory.sortBy('za');
        const items = await inventory.getProductNames();
        // Even after sorting za, backpack is still at top for problem_user
        expect.soft(items[0], 'Sorting Z to A failed for problem user').toBe('Test.allTheThings() T-Shirt (Red)');
    });

    test('BUG-ERROR-001: Error user - Cannot remove items from cart', async ({ page }) => {
        await loginPage.login('error_user');
        await inventory.getAddToCartBtn('sauce-labs-backpack').click();
        await inventory.navigateToCart();
        
        await cart.removeItem('sauce-labs-backpack');
        // Error user items often persist or buttons don't react
        await expect.soft(cart.itemNames, 'Item should have been removed from cart').toHaveCount(0);
    });

    test('BUG-ERROR-002: Error user - Checkout information error', async ({ page }) => {
        await loginPage.login('error_user');
        await inventory.getAddToCartBtn('sauce-labs-backpack').click();
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.fillInfo('Error', 'Tester', '12345');
        // Error user often gets blocked on the info submission page
        await expect.soft(page, 'Should have navigated to next step').toHaveURL(/.*checkout-step-two\.html/);
    });

    test('BUG-VISUAL-001: Visual user - Alignment inconsistencies', async ({ page }) => {
        await loginPage.login('visual_user');
        // This is a manual check but we can assert on styling if needed or rely on screenshot
        await expect(inventory.title).toBeVisible();
        await expect(inventory.cartLink).toBeVisible();
    });
});
