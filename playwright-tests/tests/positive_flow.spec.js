import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutCompletePage } from '../pages/CheckoutCompletePage.js';

test.describe('SauceDemo Positive Flow Tests', () => {
    let loginPage, inventory, cart, info, overview, complete;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        info = new CheckoutStepOnePage(page);
        overview = new CheckoutStepTwoPage(page);
        complete = new CheckoutCompletePage(page);
        
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('TC-LOGIN-001: Standard user login flow', async ({ page }) => {
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(inventory.title).toHaveText('Products');
    });

    test('TC-PROD-001/004: Inventory Sorting Tests', async ({ page }) => {
        await test.step('Sort Z to A', async () => {
            await inventory.sortBy('za');
            const items = await inventory.getProductNames();
            expect(items[0]).toBe('Test.allTheThings() T-Shirt (Red)');
        });

        await test.step('Sort Price Low to High', async () => {
            await inventory.sortBy('lohi');
            const prices = await inventory.getProductPrices();
            expect(prices[0]).toBe('$7.99');
        });
    });

    test('TC-E2E: Full purchase flow for single item', async ({ page }) => {
        await test.step('Add item and navigate to cart', async () => {
            await inventory.getAddToCartBtn('sauce-labs-backpack').click();
            await expect(inventory.cartBadge).toHaveText('1');
            await inventory.navigateToCart();
            await expect(page).toHaveURL(/.*cart\.html/);
        });

        await test.step('Proceed to checkout info', async () => {
            await cart.clickCheckout();
            await expect(page).toHaveURL(/.*checkout-step-one\.html/);
        });

        await test.step('Fill personal info', async () => {
            await info.fillInfo('Jane', 'Doe', '12345');
            await expect(page).toHaveURL(/.*checkout-step-two\.html/);
        });

        await test.step('Verify overview details and finish', async () => {
            const subtotal = await overview.getSubtotal();
            expect(subtotal).toBe(29.99);
            await overview.clickFinish();
            await expect(page).toHaveURL(/.*checkout-complete\.html/);
        });

        await test.step('Verify completion state', async () => {
            const header = await complete.getHeader();
            expect(header).toBe('Thank you for your order!');
            await complete.clickBackHome();
            await expect(page).toHaveURL(/.*inventory\.html/);
        });
    });

    test('TC-CART-002: Remove item from cart and verify empty state', async ({ page }) => {
        await inventory.getAddToCartBtn('sauce-labs-bike-light').click();
        await inventory.navigateToCart();
        await cart.removeItem('sauce-labs-bike-light');
        await expect(cart.itemNames).toHaveCount(0);
        await expect(inventory.cartBadge).toBeHidden();
    });
});
