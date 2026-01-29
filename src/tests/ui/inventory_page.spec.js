import { test, expect } from "@playwright/test";
import { login_page } from "../../pages/login_page";
import { inventory_page } from "../../pages/inventory_page";
import users from "../../data/users.json" with { type: "json" };
import inventory from "../../data/inventory.json" with { type: "json" };

test.describe("Inventory page tests", async () => {
  let loginPage;
  let inventoryPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new login_page(page);
    inventoryPage = new inventory_page(page);
    await page.goto("https://www.saucedemo.com/");
    await loginPage.login(users.ui.valid_username, users.ui.password);
    await expect(inventoryPage.inventory_header_title).toHaveText("Products");
  });

  test("Test the inventory items have the correct details", async () => {
    await expect(inventoryPage.inventory_list).toHaveCount(6);
    for (let item = 0; item < 6; item++) {
      await expect(
        inventoryPage.inventory_item_image_list.nth(item),
      ).toHaveAttribute("alt", inventory[item].itemName);
      await expect(inventoryPage.inventory_item_name_list.nth(item)).toHaveText(
        inventory[item].itemName,
      );
      await expect(
        inventoryPage.inventory_item_description_list.nth(item),
      ).toHaveText(inventory[item].ItemDescription);
      await expect(
        inventoryPage.inventory_item_price_list.nth(item),
      ).toHaveText(inventory[item].itemPrice);
      await expect(
        inventoryPage.inventory_item_button_list.nth(item),
      ).toHaveText("Add to cart");
    }
  });

  test("Test cart icon shows number of an item added", async () => {
    await inventoryPage.clickInventoryButton("Sauce Labs Backpack");
    await expect(inventoryPage.inventory_cart_button).toHaveText("1");
  });

  test("Test cart icon shows number of items added", async () => {
    for (let item of inventory) {
      await inventoryPage.clickInventoryButton(item.itemName);
    }
    await expect(inventoryPage.inventory_cart_button).toHaveText("6");
  });

  test("Test remove button of inventory item", async () => {
    await inventoryPage.clickInventoryButton("Sauce Labs Backpack");
    await inventoryPage.clickInventoryButton("Sauce Labs Backpack");
    await expect(inventoryPage.inventory_cart_button).toHaveText("");
  });
});
