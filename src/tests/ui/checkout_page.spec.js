import { test, expect } from "@playwright/test";
import { login_page } from "../../pages/login_page";
import { inventory_page } from "../../pages/inventory_page";
import { cart_page } from "../../pages/cart_page";
import { checkout_page } from "../../pages/checkout_page";
import users from "../../data/users.json" with { type: "json" };
import inventory from "../../data/inventory.json" with { type: "json" };
import customer_info from "../../data/customer_info.json" with { type: "json" };
import { helper } from "../../utils/helper";

test.describe("Checkout page test", async () => {
  let helperPage = new helper();
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new login_page(page);
    inventoryPage = new inventory_page(page);
    cartPage = new cart_page(page);
    checkoutPage = new checkout_page(page);
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(users.ui.valid_username, users.ui.password);
    await expect(inventoryPage.inventory_header_title).toHaveText("Products");
  });

  test("Test the cancel button", async () => {
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await expect(checkoutPage.checkout_header_title).toHaveText(
      "Checkout: Your Information",
    );
    await checkoutPage.checkout_cancel_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
  });

  test("Test the continue button", async () => {
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await checkoutPage.customerDetails(customer_info);
    await checkoutPage.checkout_continue_button.click();
    await expect(checkoutPage.checkout_header_title).toHaveText(
      "Checkout: Overview",
    );
  });

  test("Test item bought details on checkout overview", async () => {
    const itemDetails = await helperPage.itemsBought(
      "Sauce Labs Onesie",
      inventory,
    );
    await inventoryPage.clickInventoryButton("Sauce Labs Onesie");
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await checkoutPage.customerDetails(customer_info);
    await checkoutPage.checkout_continue_button.click();
    await expect(checkoutPage.checkout_header_title).toHaveText(
      "Checkout: Overview",
    );
    await expect(checkoutPage.checkout_item_name).toHaveText(
      itemDetails.itemName,
    );
    await expect(checkoutPage.checkout_item_description).toHaveText(
      itemDetails.ItemDescription,
    );
    await expect(checkoutPage.checkout_item_price).toHaveText(
      itemDetails.itemPrice,
    );
  });

  test("Test price breakdown on checkout overview", async () => {
    for (let item = 0; item < 6; item++) {
      await inventoryPage.inventory_item_button_list.nth(item).click();
    }
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await checkoutPage.customerDetails(customer_info);
    await checkoutPage.checkout_continue_button.click();
    await expect(checkoutPage.checkout_header_title).toHaveText(
      "Checkout: Overview",
    );

    let subTotalPrice = await checkoutPage.getAmout(
      await checkoutPage.checkout_sub_total.textContent(),
    );
    expect(await checkoutPage.getTotalPrice()).toBe(await subTotalPrice);
    let vat = await checkoutPage.getAmout(
      await checkoutPage.checkout_vat.textContent(),
    );
    let totalPrice = subTotalPrice + vat;
    expect(
      await checkoutPage.getAmout(
        await checkoutPage.checkout_total.textContent(),
      ),
    ).toBe(await totalPrice);
  });

  test("Test the checkout complete", async () => {
    await inventoryPage.clickInventoryButton("Sauce Labs Onesie");
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await checkoutPage.customerDetails(customer_info);
    await checkoutPage.checkout_continue_button.click();
    await checkoutPage.checkout_finish_button.click();
    await expect(checkoutPage.checkout_header_text).toHaveText(
      "Thank you for your order!"
    );
  });
});
