import { beverages } from "./data/beverages.js";

/**
 * Classify from the detailed Swedish "varugrupp" to a more generic category
 *
 * @param {string} category
 * @returns {"non-alcoholic"|"cider"|"beer"|"wine"|"spirit"}
 */
function classify(category) {
  if (category.startsWith("Alkoholfritt")) {
    return "non-alcoholic";
  } else if (category.startsWith("Cider")) {
    return "cider";
  } else if (category.startsWith("\u00c3\u2013l")) {
    return "beer";
  } else if (category.toLowerCase().includes("vin")) {
    return "wine";
  } else {
    return "spirit";
  }
}

export default class Product {
  /**
   * @property {string} nr            - Number
   * @property {string} artikelid     - Article ID
   * @property {string} varnummer     - Article type
   * @property {string} namn          - Name
   * @property {string} namn2         - Name2
   * @property {number} prisinklmoms  - Price incl. VAT
   * @property {string|null} volymiml - Volume in milliliters
   * @property {string|null} prisperliter - Price per litre
   * @property {string} saljstart     - Introduced
   * @property {string} slutlev       - Final delivery
   * @property {string} varugrupp     - Category
   * @property {string} forpackning   - Packaging
   * @property {string} forslutning   - Cap type
   * @property {string} ursprung      - Origin
   * @property {string} ursprunglandnamn - Country of origin
   * @property {string} producent     - Producer
   * @property {string} leverantor    - Provider
   * @property {string} argang        - Production year
   * @property {string} provadargang  - Tested production year
   * @property {number} alkoholhalt   - Alcohol percentage
   * @property {string} modul         - Module
   * @property {string} sortiment     - Assortment
   * @property {boolean} ekologisk    - Organic
   * @property {boolean} koscher      - Kosher
   */

  constructor(data) {
    Object.assign(this, data);
    this.#id = data.nr;
  }

  /** @type number|null */
  #id;
  /**
   * @returns {number|null} - The ID of this instance
   */
  get id() {
    return this.#id;
  }

  /**
   * Retrieves a single instance
   *
   * @param {number} id - The ID of the model instance to get
   * @returns {Product|null} - The instance or null if no instance exists for the given ID
   */
  static get(id) {
    const raw = beverages.find((item) => item.id === id);
    return raw ? new this(raw) : null;
  }

  /**
   * Find all instances that match the given filter
   *
   * Values in the filter that are RegExp instances are matched as regular
   * expressions, pairs of numbers are matched as inclusive ranges,
   * all other values are matched by equality
   *
   * @param {{
   *  [p: string]: RegExp | string | number | boolean | [number, number],
   *  category: "beer" | "wine" | "cider" | "spirit" | "non-alcoholic"
   * }} filters
   * @returns {Product[]}
   */
  static find(filters) {
    return beverages
      .filter((item) => {
        for (const [k, v] of Object.entries(filters)) {
          if (k === "category") {
            if (classify(item.varugrupp) !== v) {
              return false;
            }
          } else if (v instanceof RegExp) {
            // special handling for regexp
            if (!v.test(item[k])) {
              return false;
            }
          } else if (v instanceof Array && v.length === 2) {
            // special handling for pairs of numbers
            if (v[0] > item[k] || v[1] < item[k]) {
              return false;
            }
          } else {
            // all other values are matched by equality
            if (v !== item[k]) {
              return false;
            }
          }
        }
        return true;
      })
      .map((item) => new this(item));
  }

  /**
   * Find the first instance that matches the given filter
   *
   * Values in the filter that are RegExp instances are matched as regular
   * expressions, pairs of numbers are matched as inclusive ranges,
   * all other values are matched by equality
   *
   * @param {{
   *  [p: string]: RegExp | string | number | boolean | [number, number],
   *  category: "beer" | "wine" | "cider" | "spirit" | "non-alcoholic"
   * }} filters
   * @returns {Product|null}
   */
  static findFirst(filters) {
    return this.find(filters)[0];
  }
}
