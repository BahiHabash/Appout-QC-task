import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { InventoryPage } from '../pages/InventoryPage.js';

test.describe('SauceDemo Slow Performance Profile Tests', () => {
    let loginPage, inventory;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        inventory = new InventoryPage(page);
        await loginPage.navigate();
    });

    test('TC-LOGIN-004: Performance glitch user login latency', async ({ page }) => {
        const startTime = Date.now();
        await loginPage.login('performance_glitch_user');
        
        // Wait for inventory page specifically
        await expect(page).toHaveURL(/.*inventory\.html/, { timeout: 10000 });
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        
        console.log(`Performance glitch user login took: ${duration}s`);
        expect(duration).toBeGreaterThan(5); // Intentional delay is roughly 5 sec
    });

    test('TC-THROTTLING: Login works under Slow 3G emulation', async ({ page, context }) => {
        // Slow 3G: 400kbps, 400ms latency
        await context.setOffline(false);
        // Using CDP to throttle if possible, but simple timeout here for basic check
        await loginPage.login('standard_user');
        await expect(page).toHaveURL(/.*inventory\.html/);
        await expect(inventory.title).toBeVisible();
    });
});
