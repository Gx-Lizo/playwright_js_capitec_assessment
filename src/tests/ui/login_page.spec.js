import { test, expect } from "@playwright/test";
import { login_page } from "../../pages/login_page";
import { inventory_page } from "../../pages/inventory_page";
import users from "../../data/users.json" with {type:'json'};

test.describe("Login page tests", async () => {
  let loginPage;
  let inventoryPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new login_page(page);
    inventoryPage = new inventory_page(page);
    await page.goto("https://www.saucedemo.com/");
  });

  test("Valid login details", async () => {
    await loginPage.login(users.ui.valid_username, users.ui.password);
    await expect(inventoryPage.inventory_header_title).toHaveText("Products");
  });

  test("Login without username and password", async () => {
    await loginPage.login("", "");
    await expect(loginPage.errorContainer).toBeVisible();
    expect(loginPage.errorContainer).toHaveText(
      "Epic sadface: Username is required",
    );
  });

  test("Login without username", async () => {
    await loginPage.login("", "secret_sauce");
    await expect(loginPage.errorContainer).toBeVisible();
    expect(loginPage.errorContainer).toHaveText(
      "Epic sadface: Username is required",
    );
  });

  test("Login without password", async () => {
    await loginPage.login("locked_out_user", "");
    await expect(loginPage.errorContainer).toBeVisible();
    expect(loginPage.errorContainer).toHaveText(
      "Epic sadface: Password is required",
    );
  });

  test("Invalid login details", async () => {
    await loginPage.login("invalid", "secret_sau");
    await expect(loginPage.errorContainer).toBeVisible();
    expect(loginPage.errorContainer).toHaveText(
      "Epic sadface: Username and password do not match any user in this service",
    );
  });

  test("locked out user", async () => {
    await loginPage.login(users.ui.locked_username, users.ui.password);
    await expect(loginPage.errorContainer).toBeVisible();
    expect(loginPage.errorContainer).toHaveText(
      "Epic sadface: Sorry, this user has been locked out.",
    );
  });
});
