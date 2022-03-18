import Product from "../model/product.js";

class MenuController {
  /** @type string|undefined */
  name;
  /** @type ProductCategory|undefined */
  category;
  /** @type [number, number]|undefined */
  alcoholRange;

  /**
   * @typedef {"name"|"alcohol"|"price"} Sorting
   * @type {Sorting|undefined}
   */
  sorting;

  /**
   * Sets the string used to filter product names
   * @param {string|undefined} filter
   */
  setFilterName(filter) {
    this.filter = filter;
  }

  /**
   * Sets which category of products should be displayed
   * @param {ProductCategory|undefined} category
   */
  setFilterCategory(category) {
    this.category = category;
  }

  /**
   * Sets the range of alcohol content that should be displayed
   * @param {[number, number]|undefined} range
   */
  setFilterAlcoholRange(range) {
    this.alcoholRange = range;
  }

  /**
   * @param {Sorting|undefined} sorting
   */
  setSorting(sorting) {
    this.sorting = sorting;
  }

  /**
   * Retrieve the current list of products, based on the filters selected
   *
   * @returns {Product[]}
   */
  get products() {
    const filters = {};
    if (this.name) {
      filters.namn = new RegExp(this.name, "i");
    }
    if (this.category) {
      filters.category = this.category;
    }
    if (this.alcoholRange) {
      filters.alkoholhalt = this.alcoholRange;
    }

    let products = Product.find(filters);
    if (this.sorting === "name") {
      products = products.sort((a, b) => {
        if (a.namn < b.namn) {
          return -1;
        } else if (a.namn > b.namn) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (this.sorting === "alcohol") {
      products = products.sort((a, b) => a - b);
    } else if (this.sorting === "price") {
      products = products.sort((a, b) => a - b);
    }
    return products.slice(0, 500); // return at most 500 products
  }
}

const menuController = new MenuController();
export default menuController;
