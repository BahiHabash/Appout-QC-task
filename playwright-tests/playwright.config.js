// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory containing test files
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: false,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: [['html', { open: 'never' }], ['list']],

  use: {
    // Base URL for all tests
    baseURL: 'https://www.saucedemo.com',

    // Collect trace when retrying a failed test
    trace: 'on-first-retry',

    // Take a screenshot on failure
    screenshot: 'only-on-failure',

    // Slow down actions for visual debugging (set to 0 in CI)
    // actionDelay: 500,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
