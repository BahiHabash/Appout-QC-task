export class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cartList = page.locator('[data-test="cart-list"]');
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    this.itemNames = page.locator('[data-test="inventory-item-name"]');
    this.itemQuantities = page.locator('[data-test="item-quantity"]');
    this.itemPrices = page.locator('[data-test="inventory-item-price"]');
  }

  async getItemsInCart() {
    return await this.itemNames.allInnerTexts();
  }

  getRemoveBtn(itemName) {
    return this.page.locator(`[data-test="remove-${itemName}"]`);
  }

  async clickCheckout() {
    await this.checkoutBtn.click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  async removeItem(itemName) {
    await this.getRemoveBtn(itemName).click();
  }
}
