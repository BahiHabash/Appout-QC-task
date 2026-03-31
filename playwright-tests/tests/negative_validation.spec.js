import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';

test.describe('SauceDemo Negative Path Validation Tests', () => {
    let loginPage, inventory, cart, info;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventory = new InventoryPage(page);
        cart = new CartPage(page);
        info = new CheckoutStepOnePage(page);
        await loginPage.navigate();
    });

    test('TC-LOGIN-002: Locked out user login refusal', async ({ page }) => {
        await loginPage.login('locked_out_user');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Epic sadface: Sorry, this user has been locked out.');
    });

    test('TC-LOGIN-007: Login with empty username', async ({ page }) => {
        await loginPage.login('', 'secret_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username is required');
    });

    test('TC-LOGIN-008: Login with empty password', async ({ page }) => {
        await loginPage.login('standard_user', '');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Password is required');
    });

    test('TC-LOGIN-010: Login with invalid password', async ({ page }) => {
        await loginPage.login('standard_user', 'wrong_sauce');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Username and password do not match');
    });

    test('TC-CHECKOUT-002: Form validation - Empty First Name', async ({ page }) => {
        await loginPage.login('standard_user');
        await inventory.getAddToCartBtn('sauce-labs-backpack').click();
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.fillInfo('', 'Doe', '12345');
        const error = await info.getErrorMessage();
        expect(error).toContain('First Name is required');
    });

    test('TC-CHECKOUT-003: Form validation - Empty Last Name', async ({ page }) => {
        await loginPage.login('standard_user');
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.fillInfo('Jane', '', '12345');
        const error = await info.getErrorMessage();
        expect(error).toContain('Last Name is required');
    });

    test('TC-CHECKOUT-004: Form validation - Empty Zip Code', async ({ page }) => {
        await loginPage.login('standard_user');
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.fillInfo('Jane', 'Doe', '');
        const error = await info.getErrorMessage();
        expect(error).toContain('Postal Code is required');
    });

    test('TC-CHECKOUT-006: Boundary Check - 100 char first name', async ({ page }) => {
        await loginPage.login('standard_user');
        await inventory.navigateToCart();
        await cart.clickCheckout();

        const longName = 'A'.repeat(100);
        await info.fillInfo(longName, 'Doe', '12345');
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });

    test('TC-SQLI: System stability check with special character parameters', async ({ page }) => {
        await loginPage.login('standard_user');
        await inventory.navigateToCart();
        await cart.clickCheckout();

        await info.fillInfo("' OR '1'='1", "DROP TABLE users;--", "';--");
        await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    });
});
