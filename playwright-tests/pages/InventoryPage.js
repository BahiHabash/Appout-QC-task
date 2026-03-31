export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  getAddToCartBtn(itemName) {
    return this.page.locator(`[data-test="add-to-cart-${itemName}"]`);
  }

  getRemoveBtn(itemName) {
    return this.page.locator(`[data-test="remove-${itemName}"]`);
  }

  async sortBy(option) {
    // az, za, lohi, hilo
    await this.sortDropdown.selectOption(option);
  }

  async getCartBadgeCount() {
    if (await this.cartBadge.isVisible()) {
      return parseInt(await this.cartBadge.innerText());
    }
    return 0;
  }

  async navigateToCart() {
    await this.cartLink.click();
  }

  async getProductNames() {
    return await this.page.locator('[data-test="inventory-item-name"]').allInnerTexts();
  }

  async getProductPrices() {
    return await this.page.locator('[data-test="inventory-item-price"]').allInnerTexts();
  }

  async getProductImageSrc(itemName) {
    return await this.page.locator(`[data-test="inventory-item-${itemName}-img"]`).getAttribute('src');
  }
}
