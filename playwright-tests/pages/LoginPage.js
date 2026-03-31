export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginBtn = page.locator('[data-test="login-button"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username, password = 'secret_sauce') {
    if (username !== undefined) await this.usernameInput.fill(username);
    if (password !== undefined) await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.innerText();
  }
}
