import { AbstractModel } from "./abstract.js";
import Product from "./product";


export default class ProductStock extends AbstractModel {
    static type = "product_stock";
    static fields = ["product_id", "stock", "visible"];

    /**
     * @property {number} product_id
     * @property {number} stock
     * @property {"yes"|"no"} visible
     */

    /** @returns {Product} */
    get product() {
        return Product.get(this.id);
    }
    /** @param {Product} product */
    set product(product) {
        this.product_id = product.id;
    }
}
