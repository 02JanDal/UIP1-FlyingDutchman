import { baseData } from "./data/baseData.js";

/**
 * This class should never be used directly. Instead, use
 * the methods of {@link AbstractModel}.
 *
 * @package
 */
class _Database {
  static #LOCALSTORAGE_KEY = "flyingdutchman_database";

  /**
   * @typedef {{ id: number, [key: string]: string | number | boolean | any }} RawModelInstance
   */
  /**
   * @type {{[type: string]: { [id: number]: RawModelInstance }}}
   */
  #items;

  constructor() {
    const raw = localStorage.getItem(_Database.#LOCALSTORAGE_KEY);
    if (raw) {
      this.#items = JSON.parse(raw);
    } else {
      this.#items = baseData;
    }
  }

  #save() {
    localStorage.setItem(
      _Database.#LOCALSTORAGE_KEY,
      JSON.stringify(this.#items)
    );
  }

  /**
   * @see AbstractModel.get
   * @param {string} type
   * @param {number} id
   */
  get(type, id) {
    return type in this.#items && id in this.#items[type]
      ? this.#items[type][id]
      : null;
  }

  /**
   * @see AbstractModel.list
   * @param {string} type
   * @returns {RawModelInstance[]}
   */
  list(type) {
    return type in this.#items ? Object.values(this.#items[type]) : [];
  }

  /**
   * @see AbstractModel.save
   * @param {string} type
   * @param {RawModelInstance} data
   * @returns {RawModelInstance}
   */
  upsert(type, data) {
    if (!data.id) {
      const existing = this.list(type);
      if (existing.length > 0) {
        // assign the next largest number
        data.id = Math.max(...existing.map((item) => item.id)) + 1;
      } else {
        data.id = 1;
      }
    }
    if (!this.#items[type]) {
      this.#items[type] = {};
    }
    this.#items[type][data.id] = data;
    this.#save();
    return data;
  }

  /**
   * @see AbstractModel.delete
   * @param {string} type
   * @param {number} id
   */
  delete(type, id) {
    delete this.#items[type][id];
    this.#save();
  }
}

/**
 * @package
 * @type {_Database}
 */
export const db = new _Database();
