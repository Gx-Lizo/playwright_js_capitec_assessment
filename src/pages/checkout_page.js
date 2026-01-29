export class checkout_page {
  constructor(page) {
    this.checkout_header_title = page.locator(".title");
    this.checkout_name_field = page.locator("#first-name");
    this.checkout_surname_field = page.locator("#last-name");
    this.checkout_postal_code_field = page.locator("#postal-code");
    this.checkout_continue_button = page.locator("#continue");
    this.checkout_cancel_button = page.locator("#cancel");
    this.checkout_item_name = page.locator(".inventory_item_name");
    this.checkout_item_description = page.locator(".inventory_item_desc");
    this.checkout_item_price = page.locator(".item_pricebar div");
    this.checkout_sub_total = page.locator(".summary_subtotal_label");
    this.checkout_vat = page.locator(".summary_tax_label");
    this.checkout_total = page.locator(".summary_total_label");
    this.checkout_finish_button = page.locator("#finish");
    this.checkout_header_text = page.locator(".complete-header");

  }

  async customerDetails(details) {

    await this.checkout_name_field.fill(details.name);
    await this.checkout_surname_field.fill(details.surname);
    await this.checkout_postal_code_field.fill(details.postal_code);
  }

  async getTotalPrice() {

    const element_count = await this.checkout_item_price.count();
    let price=0;

    if(element_count === 1) {

      price = await this.checkout_item_price.textContent();
      await price.replace("$", '').trim();

    }
    else if(element_count > 1) {

      const price_list = await this.checkout_item_price.allTextContents();

      for(let item_price of price_list) {

          price += Number(await item_price.replace("$", '').trim());
      }
    }
    return price
  }

  async getAmout(text) {

    let amount = await text.split("$");
    return Number(await amount[1]);
  }
}
