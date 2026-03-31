export class CheckoutCompletePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
    this.backHomeBtn = page.locator('[data-test="back-to-products"]');
  }

  async getHeader() {
    return await this.completeHeader.innerText();
  }

  async getText() {
    return await this.completeText.innerText();
  }

  async clickBackHome() {
    await this.backHomeBtn.click();
  }
}
