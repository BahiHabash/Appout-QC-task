export class CheckoutStepTwoPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.finishBtn = page.locator('[data-test="finish"]');
    this.cancelBtn = page.locator('[data-test="cancel"]');
    this.paymentInfo = page.locator('[data-test="payment-info-value"]');
    this.shippingInfo = page.locator('[data-test="shipping-info-value"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.inventoryItemNames = page.locator('[data-test="inventory-item-name"]');
  }

  async getItems() {
    return await this.inventoryItemNames.allInnerTexts();
  }

  async getSubtotal() {
    const text = await this.subtotalLabel.innerText();
    return parseFloat(text.replace('Item total: $', ''));
  }

  async getTax() {
    const text = await this.taxLabel.innerText();
    return parseFloat(text.replace('Tax: $', ''));
  }

  async getTotal() {
    const text = await this.totalLabel.innerText();
    return parseFloat(text.replace('Total: $', ''));
  }

  async clickFinish() {
    await this.finishBtn.click();
  }

  async clickCancel() {
    await this.cancelBtn.click();
  }
}
