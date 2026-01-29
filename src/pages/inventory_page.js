export class inventory_page {
  constructor(page) {
    this.inventory_header_title = page.locator(".title");
    this.inventory_list = page.locator(".inventory_item");
    this.inventory_cart_button = page.locator("#shopping_cart_container");
    this.inventory_item_image_list = page.locator(".inventory_item_img a img");
    this.inventory_item_name_list = page.locator(".inventory_item_name");
    this.inventory_item_description_list = page.locator(".inventory_item_desc");
    this.inventory_item_price_list = page.locator(".pricebar div");
    this.inventory_item_button_list = page.locator(".pricebar button");
  }

  async clickInventoryButton(item) {

    const item_text_list = await this.inventory_item_name_list.allTextContents(); 
    const item_index = await item_text_list.indexOf(item);
    await this.inventory_item_button_list.nth(item_index).click();
  }

}
