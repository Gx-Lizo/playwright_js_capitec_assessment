import { test, expect } from "@playwright/test";
import { login_page } from "../../pages/login_page";
import { inventory_page } from "../../pages/inventory_page";
import { cart_page } from "../../pages/cart_page";
import users from "../../data/users.json" with { type: "json" };
import inventory from "../../data/inventory.json" with { type: "json" };
import { helper } from "../../utils/helper";

test.describe("Cart page tests", async () => {
  let helperPage = new helper();
  let loginPage;
  let inventoryPage;
  let cartPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new login_page(page);
    inventoryPage = new inventory_page(page);
    cartPage = new cart_page(page);
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(users.ui.valid_username, users.ui.password);
    await expect(inventoryPage.inventory_header_title).toHaveText("Products");
  });

  test("Test the item added to cart is displaying correctly", async () => {
    const itemDetails = await helperPage.itemsBought(
      "Sauce Labs Fleece Jacket",
      inventory,
    );
    await inventoryPage.clickInventoryButton("Sauce Labs Fleece Jacket");
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await expect(cartPage.cart_item_name).toHaveText(itemDetails.itemName);
    await expect(cartPage.cart_item_description).toHaveText(
      itemDetails.ItemDescription,
    );
    await expect(cartPage.cart_item_price).toHaveText(itemDetails.itemPrice);
  });

  test("Test the items added to cart are displaying correctly", async () => {
    // add items to cart
    for (let item = 0; item < 6; item++) {
      await inventoryPage.inventory_item_button_list.nth(item).click();
    }
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");

    //check items on cart are correct
    for (let item = 0; item < 6; item++) {
      const itemDetails = await helperPage.itemsBought(
        await cartPage.cart_item_name.nth(item).textContent(),
        inventory,
      );
       await expect(cartPage.cart_item_name.nth(item)).toHaveText(itemDetails.itemName);
    await expect(cartPage.cart_item_description.nth(item)).toHaveText(
      itemDetails.ItemDescription,
    );
    await expect(cartPage.cart_item_price.nth(item)).toHaveText(itemDetails.itemPrice);


    }
  });

  test('Test the Remove button on cart', async () => {

    // add items to cart
    for (let item = 0; item < 6; item++) {
      await inventoryPage.inventory_item_button_list.nth(item).click();
    }
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.removeItemFromCart("Sauce Labs Fleece Jacket");
    await expect(cartPage.cart_item_removed).toBeAttached();
  })

  test("Test the continue shopping button", async () => {
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_continue_shopping_button.click();
    await expect(inventoryPage.inventory_header_title).toHaveText("Products");
  });

  test("Test the checkout button", async () => {
    await inventoryPage.inventory_cart_button.click();
    await expect(cartPage.cart_header_title).toHaveText("Your Cart");
    await cartPage.cart_checkout_button.click();
    await expect(cartPage.cart_header_title).toHaveText(
      "Checkout: Your Information",
    );
  });
});
