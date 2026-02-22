import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/SwagLabs.js';

const USERS = [
  { username: 'standard_user', shouldPass: true },
  { username: 'locked_out_user', shouldPass: false, errorText: 'locked out' },
  { username: 'performance_glitch_user', shouldPass: true },
  { username: '', shouldPass: false, errorText: 'Username is required' },
];

test.describe('Authentication Matrix', () => {
  for (const { username, shouldPass, errorText } of USERS) {
    test(`Login attempt for: ${username || 'EMPTY_USER'}`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await test.step('Submit credentials', async () => {
        await loginPage.navigate();
        await loginPage.login(username);
      });

      await test.step('Verify deterministic system state', async () => {
        if (shouldPass) {
          await expect(page).toHaveURL(/.*inventory\.html/);
        } else {
          await expect(loginPage.errorMessage).toBeVisible();
          await expect(loginPage.errorMessage).toContainText(errorText);
        }
      });
    });
  }
});
