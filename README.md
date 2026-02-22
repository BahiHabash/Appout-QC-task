# Repository Overview

This repository contains the following components:

## [Research Document](research-document.md)

Includes research and analysis related to the project.

## [Manual Tests](manual-tests.md)

Contains documentation for manual testing procedures.

## Playwright Tests

Automated tests for the application using Playwright. This folder includes:

- [Configuration File](playwright-tests/playwright.config.js): Configuration settings for Playwright.
- [Package File](playwright-tests/package.json): Lists dependencies and scripts for the Playwright tests.
- [Pages](playwright-tests/pages): Contains page object models for the application.
  - [SwagLabs.js](playwright-tests/pages/SwagLabs.js): Page object for the Swag Labs application.
- [Tests](playwright-tests/tests): Contains test specifications.
  - [Cart Test](playwright-tests/tests/cart.spec.js): Tests related to the shopping cart functionality.
  - [Checkout Test](playwright-tests/tests/checkout.spec.js): Tests for the checkout process.
  - [Login Test](playwright-tests/tests/login.spec.js): Tests for the login functionality.

## [Playwright README](playwright-tests/README.md)

Additional documentation for the Playwright tests.
