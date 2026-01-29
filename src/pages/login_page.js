export class login_page {
  constructor(page) {
    
    this.username = page.locator("#user-name");
    this.password = page.locator("#password");
    this.login_button = page.locator("#login-button");
    this.errorContainer = page.locator("[class = 'error-message-container error']");
    this.invCont = page.locator('.inventory_container');
    this.invP = page.locator('.title');
  }

  async login(username, password) {

    await this.username.fill(username);
    await this.password.fill(password);
    await this.login_button.click();
  }
}