export class helper {

    async itemsBought(itemToselect, itemlist) {

    for(let item of itemlist) {

        if(item.itemName===itemToselect) {
            return item;
        }
    } 
  }
}