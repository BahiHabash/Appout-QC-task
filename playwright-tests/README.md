# Phase 2: Playwright Automation Suite (POM)

This directory contains the robust Playwright-based automated testing engine for the SauceDemo ecosystem. The project follows a strict **Page Object Model (POM)** design pattern to ensure clean, readable, and highly maintainable tests.

---

## 🛠 Prerequisites

Ensure you have **Node.js** installed on your machine.

---

## 🏗 Installation

Open your terminal in the project root folder and run:

```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install
```

---

## 🧪 Execution Commands

| Command | Purpose |
| :--- | :--- |
| `npx playwright test` | Run the full test suite (headless). |
| `npx playwright test tests/login.spec.js` | Run a specific test file. |
| `npx playwright test --ui` | Open the interactive Playwright UI (**Recommended for debugging glitches**). |
| `npx playwright test --debug` | Step through the code with the Playwright inspector. |

---

## 📂 Folder Architecture

- **`pages/`**: Contains the Page Objects (`LoginPage.js`, `InventoryPage.js`, `CartPage.js`, `CheckoutStepOnePage.js`, `CheckoutStepTwoPage.js`, `CheckoutCompletePage.js`).
- **`tests/`**: Contains `.spec.js` test suites divided by functional logic and user profiles.
- **`playwright.config.js`**: Global settings for timeouts, viewports, and browsers.

---

## 📊 Automated Results Summary

The suite automatically checks for **intentional site flaws** in the `problem_user` and `error_user` profiles:
- **`problem_user_glitches.spec.js`**: Validates images, sorting logic, and checkout failures.
- **`performance_throttling.spec.js`**: Asserts the 5-second login latency for the performance glitch account.
- **`negative_validation.spec.js`**: Confirms proper error messages for invalid/empty inputs.

---

[← Back to Root](../README.md)
