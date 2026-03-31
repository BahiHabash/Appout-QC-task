export class CheckoutStepOnePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueBtn = page.locator('[data-test="continue"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInfo(first = '', last = '', zip = '') {
    if (first !== undefined) await this.firstNameInput.fill(first);
    if (last !== undefined) await this.lastNameInput.fill(last);
    if (zip !== undefined) await this.postalCodeInput.fill(zip);
    await this.continueBtn.click();
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }
}
