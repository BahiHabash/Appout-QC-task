# Part 1: Research & Theoretical Knowledge

---

## 1. Core Testing Concepts

### 1.1 Test Case vs. Test Scenario

| Aspect | Test Scenario | Test Case |
| --- | --- | --- |
| **Definition** | A high-level description of *what* to test. It captures a user's goal or a feature to be validated. | A detailed, step-by-step document that describes *how* to test. It includes specific inputs, actions, and expected results. |
| **Example** | "Verify the user can complete a purchase." | Step 1: Login with `standard_user`.<br>

**Why do we need scenarios before detailed steps?**

Writing test scenarios first forces us to think about the _purpose_ of testing before we get lost in the details. Scenarios answer the question "What should the system do?" from the user's perspective. Once we have a clear list of scenarios, we can systematically expand each one into multiple test cases that cover positive paths, negative paths, edge cases, and boundary conditions. Without scenarios, testers risk writing hundreds of disconnected test cases that have gaps in coverage they test individual fields but miss entire features. Scenarios act as a map; test cases are the individual directions on that map.

---

### 1.2 Testing Levels

Testing is organized into four progressive levels, each testing the system at a different scope:

| Level                        | What is Tested                                                                                                        | Who Typically Runs It              | Example (Swag Labs)                                                                                                                          |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unit Testing**             | Individual functions or methods in isolation. Dependencies are mocked.                                                | Developers                         | Testing that the `calculateTotal()` function correctly sums item prices and adds tax.                                                        |
| **Integration Testing**      | The interaction between two or more modules/components that have been unit-tested.                                    | Developers / QA                    | Testing that when a user adds an item to the cart (UI module), the cart service correctly updates the item count and price (backend module). |
| **System Testing**           | The complete, integrated application is tested as a whole against the requirements.                                   | QA Team                            | Testing the end-to-end buying flow: Login → Browse → Add to Cart → Checkout → Order Confirmation all running on a deployed environment.      |
| **Acceptance Testing (UAT)** | Validates that the system meets business requirements and is ready for release. Done from the end-user's perspective. | Client / Product Owner / End Users | The product owner walks through the checkout and confirms: "Yes, this is the experience we specified. Ship it."                              |

**The logic:** Each level builds confidence. Unit tests catch code-level bugs cheaply. Integration tests catch communication errors between modules. System tests catch workflow-level issues. Acceptance tests confirm business goals are met. Skipping a level creates blind spots.

---

### 1.3 Testing Types

#### Functional vs. Non-Functional Testing

| Type               | Focus                                                                        | Examples                                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Functional**     | _What_ the system does does it produce the correct output for a given input? | Login validation, cart calculation, checkout form submission.                                                                                    |
| **Non-Functional** | _How well_ the system performs quality attributes beyond correctness.        | Page load time (Performance), handling 10,000 simultaneous users (Load/Stress), HTTPS enforcement (Security), mobile responsiveness (Usability). |

#### Smoke vs. Sanity vs. Regression

| Type                   | When                                         | Purpose                                                                                                      | Scope                                                                                         |
| ---------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| **Smoke Testing**      | After a new build/deployment.                | A quick, shallow check to see if the most critical functions work at all. "Does the build even run?"         | Very broad, very shallow e.g., Can we open the site? Can we login? Does the main page load?   |
| **Sanity Testing**     | After a specific bug fix or minor change.    | A narrow, focused check to confirm that the specific fix works and hasn't broken its immediate surroundings. | Narrow and deep e.g., The login bug was fixed, so we test login and the page it redirects to. |
| **Regression Testing** | Before every release, after any code change. | Re-running existing test cases to ensure that new changes haven't broken previously working functionality.   | Broad and deep the full test suite (or a prioritized subset) is re-executed.                  |

**Analogy:** Smoke testing is turning the key in a car to see if the engine starts. Sanity testing is checking the brakes after a brake repair. Regression testing is the full vehicle inspection before a road trip.

---

### 1.4 Testing Techniques

#### Equivalence Partitioning (EP)

The idea: Instead of testing every possible input (which is impossible), we divide inputs into groups (_partitions_) where all values in the group are expected to behave the same way. We then test just **one representative value** from each partition.

**Example Checkout Zip Code field (accepts 5-digit US zip codes):**

| Partition             | Sample Value           | Expected Behavior                             |
| --------------------- | ---------------------- | --------------------------------------------- |
| Valid 5-digit number  | `12345`                | Accepted                                      |
| Empty string          | ` `                    | Error: "Postal Code is required"              |
| Alphabetic characters | `abcde`                | Accepted (SauceDemo does not validate format) |
| Special characters    | `!@#$%`                | Accepted (SauceDemo does not validate format) |
| Very long input       | `12345678901234567890` | Accepted (no max-length validation)           |

#### Boundary Value Analysis (BVA)

The idea: Bugs tend to cluster at the _edges_ (boundaries) of valid ranges. So we specifically test the values at, just below, and just above the boundary.

**Example A "Quantity" field that accepts 1–10 items:**

| Test Value | Position                  | Expected Behavior   |
| ---------- | ------------------------- | ------------------- |
| `0`        | Just below lower boundary | Error / not allowed |
| `1`        | Lower boundary (valid)    | Accepted            |
| `2`        | Just above lower boundary | Accepted            |
| `9`        | Just below upper boundary | Accepted            |
| `10`       | Upper boundary (valid)    | Accepted            |
| `11`       | Just above upper boundary | Error / not allowed |

---

## 2. Defect Management

### 2.1 The Bug Life Cycle

| State        | What Happens                                                                                                                                                                              | Responsible        |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| **New**      | A tester discovers a defect and logs it with steps to reproduce, expected vs. actual result, severity, and priority. The bug exists in the tracking system but has not been reviewed yet. | Tester             |
| **Open**     | The QA lead or project manager reviews the bug, confirms it is valid (not a duplicate, not working-as-intended), and assigns it to a developer.                                           | QA Lead / PM       |
| **Fixed**    | The developer investigates, identifies the root cause, writes a fix, and marks the bug as fixed. The fix is deployed to a test environment.                                               | Developer          |
| **Retest**   | The tester re-executes the exact same steps that originally reproduced the bug, now on the build that includes the fix. The goal is to verify that the fix actually works.                | Tester             |
| **Closed**   | The tester confirms the bug is fixed. The defect is marked as closed. It is **not** deleted it remains in the system for traceability and metrics.                                        | Tester             |
| **Reopened** | During retesting, the tester finds that the bug still occurs (or a partial fix introduced a related issue). The bug is sent back to the developer with updated notes.                     | Tester → Developer |

---

### 2.2 Severity vs. Priority

These are the two most confused concepts in QA. They measure different things:

| Dimension    | Severity                                                               | Priority                                                 |
| ------------ | ---------------------------------------------------------------------- | -------------------------------------------------------- |
| **Measures** | **Technical impact** How much damage does the bug cause to the system? | **Business urgency** How quickly must this bug be fixed? |
| **Set by**   | QA / Tester (based on technical analysis)                              | Product Manager / Business (based on business impact)    |
| **Scale**    | Critical → High → Medium → Low                                         | Urgent (P1) → High (P2) → Medium (P3) → Low (P4)         |

**Why they are different:** A bug can be technically devastating but affect almost no users (High Severity, Low Priority). Conversely, a bug can be cosmetically minor but damage the brand on a high-traffic page (Low Severity, High Priority).

#### Real-World Examples

##### Example 1: High Severity / Low Priority

> **Bug:** Clicking the "Export to PDF" button on the Admin Dashboard's "Archived Reports" page (accessed by ~2 admins per month) causes the entire application to crash with an unhandled exception.
>
> - **Severity: Critical** The app crashes. Data could be lost. This is a severe technical failure.
> - **Priority: Low (P4)** The page is used by almost nobody. There is a workaround (export to CSV). This can wait for the next sprint.

**Another example:** A complete crash on the "About Us" page of an e-commerce site. The crash is severe, but the page has near-zero traffic and no revenue impact.

##### Example 2: Low Severity / High Priority

> **Bug:** The company name on the homepage hero banner is misspelled "Amazn" instead of "Amazon."
>
> - **Severity: Low** It's a cosmetic text error. No functionality is broken. No data is affected.
> - **Priority: Urgent (P1)** The homepage is seen by millions of users daily. A misspelled brand name damages credibility and trust. This must be fixed immediately, even at midnight.

**Another example:** The company logo on the login page uses the wrong color. Functionally irrelevant, but the CEO and every single customer sees it.

---

## 3. Automation Strategy (Playwright)

### 3.1 Locators Strategy DOM & Selectors

Choosing the right element selector is the **single most important skill** in UI test automation. A poor selector causes "brittle tests" tests that break not because the application has a bug, but because the UI changed in a way the selector couldn't handle.

#### What Are Brittle Tests?

A **brittle test** is a test that fails due to irrelevant changes in the application, rather than actual defects. Common causes:

- Using selectors that depend on the element's position in the DOM tree (e.g., full XPath).
- Using auto-generated class names (e.g., `css-1a2b3c` from CSS-in-JS frameworks).
- Relying on text content that changes with localization or A/B testing.
- Not waiting for elements to load (race conditions).

**The cost of brittle tests:** Each false failure requires a human to investigate, determine it's not a real bug, and update the test. This erodes trust in the test suite and wastes time. A team with 500 brittle tests effectively has 0 tests, because nobody trusts the results.

#### How to Avoid Brittle Tests

1. **Use stable, semantic selectors** `data-test`, `data-testid`, `id`, `aria-label` attributes.
2. **Avoid structural selectors** Don't rely on DOM position (`nth-child`, parent-child chains).
3. **Use Playwright's built-in locators** `getByRole()`, `getByText()`, `getByTestId()` are resilient by design.
4. **Add explicit waits** Use `await expect(element).toBeVisible()` instead of arbitrary `sleep()`.
5. **Isolate test data** Each test should set up its own state, not depend on another test's side effects.

---

### 3.2 Selector Comparison: ID vs. CSS Selectors vs. XPath

| Selector Type             | Syntax Example                            | Stability    | Performance | When to Use                                                                                                                                                  |
| ------------------------- | ----------------------------------------- | ------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **ID**                    | `#login-button`                           | Very Stable  | Fastest     | When the element has a unique, meaningful ID. IDs are guaranteed unique per HTML spec. **This is the gold standard.**                                        |
| **data-test attribute**   | `[data-test="login-button"]`              | Very Stable  | Fast        | When IDs are not available. `data-test` attributes are specifically added _for_ testing and won't be changed by designers or developers working on features. |
| **CSS Selector**          | `.btn.btn-primary`                        | Moderate     | Fast        | When no ID or data-test exists. CSS selectors are good if they target stable class names, but risky if classes are auto-generated or change frequently.      |
| **XPath (relative)**      | `//button[@type='submit']`                | Moderate     | Slower      | When you need to traverse the DOM or find elements by text content. Relative XPath is acceptable.                                                            |
| **XPath (absolute/full)** | `/html/body/div[1]/div/div/form/input[3]` | Very Brittle | Slowest     | **NEVER.** This breaks if any parent element is added, removed, or reordered.                                                                                |

#### When Is It Safe to Use an ID?

An ID is safe when:

- It is **meaningful and descriptive** (e.g., `id="login-button"`, `id="checkout-form"`).
- It is **not auto-generated** (e.g., `id="ember1234"` or `id="react-select-3-input"` these change on every render).
- It is **stable across releases** confirmed with the development team or documented as a testing contract.

In SauceDemo, IDs like `#user-name`, `#password`, `#login-button`, `#checkout` are safe because they are short, descriptive, and part of the app's design.

#### Why You Should Never Copy Full XPaths from the Browser

When you right-click an element in Chrome DevTools and select "Copy > Copy full XPath," you get something like:

```
/html/body/div[1]/div/div[2]/div[2]/div/div/div/div[3]/button
```

This is a **positional path** from the root of the document to the element. It is:

1. **Unreadable** No human can tell what element this targets.
2. **Fragile** Adding a `<div>` wrapper anywhere in the hierarchy shifts every index.
3. **Non-portable** Different pages or even different user roles may render slightly different DOM structures.

**Instead, write a short, targeted selector:**

```javascript
// BAD copied from browser
page.locator('/html/body/div[1]/div/div[2]/div[2]/div/div/div/div[3]/button');

// GOOD uses stable data-test attribute
page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');

// GOOD uses Playwright's semantic locator
page.getByRole('button', { name: 'Add to cart' });
```

### 3.3 Playwright's Recommended Locator Priority

Playwright's documentation recommends this order of preference:

1. `page.getByRole()` Matches ARIA roles (most resilient, accessibility-friendly)
2. `page.getByTestId()` Matches `data-testid` attributes (requires dev team cooperation)
3. `page.getByText()` Matches visible text content
4. `page.getByLabel()` Matches form labels
5. `page.locator('#id')` Falls back to CSS/ID selectors
6. `page.locator('xpath=...')` Last resort, and only relative XPath

The best automation strategy combines stable selectors with proper assertions and isolation. In the SauceDemo project, we use `data-test` attributes as our primary strategy because the application provides them consistently across all interactive elements.
