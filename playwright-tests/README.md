### 1. Prerequisites

Ensure you have **Node.js** installed on your machine.

### 2. Installation

Open your terminal in the project root folder and run:

```bash
# Install dependencies
npm install

# Install Playwright browser binaries
npx playwright install

```

### 3. Running Tests

You can run your tests in different modes depending on whether you are debugging or running a full suite:

* **Run all tests (Headless):**
`npx playwright test`
* **Run a specific file (e.g., Login):**
`npx playwright test tests/login.spec.js`
* **Run in UI Mode (Interactive):**
`npx playwright test --ui`
*This is highly recommended for debugging the `problem_user` defects visually.*
* **Debug Mode:**
`npx playwright test --debug`

### 4. Viewing Results

After the tests complete, Playwright generates a detailed HTML report:

```bash
npx playwright show-report

```

---

### Folder Architecture Reminder

* **`pages/`**: Contains `SwagLabs.js` (Locators and UI actions).
* **`tests/`**: Contains `.spec.js` files (Test scenarios and assertions).
* **`playwright.config.js`**: Global settings (BaseURL, timeouts, and browser configurations).
