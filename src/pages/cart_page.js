export class cart_page {
  constructor(page) {
    this.cart_header_title = page.locator(".title");
    this.cart_continue_shopping_button = page.locator("#continue-shopping");
    this.cart_checkout_button = page.locator("#checkout");
    this.cart_item_name = page.locator(".inventory_item_name");
    this.cart_item_description = page.locator(".inventory_item_desc");
    this.cart_item_price = page.locator(".item_pricebar div");
    this.cart_item_button = page.locator(".item_pricebar button");
    this.cart_item_removed = page.locator(".removed_cart_item");
  }

  async removeItemFromCart(item) {
    const item_text_list = await this.cart_item_name.allTextContents();
    const item_index = await item_text_list.indexOf(item);
    await this.cart_item_button.nth(item_index).click();
  }

}
