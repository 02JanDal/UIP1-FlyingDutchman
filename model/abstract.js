import { db } from "./database.js";

/** @package */
export class AbstractModel {
  /**
   * @private
   * @param {RawModelInstance} data
   */
  constructor(data = undefined) {
    if (data) {
      for (const field of this.constructor.fields) {
        this[field] = data[field];
      }
      this.#id = data.id;
    } else {
      for (const field of this.constructor.fields) {
        this[field] = null;
      }
    }
  }

  /** @type string */
  static type;
  /** @type string[] */
  static fields;

  /** @type number|null */
  #id;
  /**
   * @returns {number|null} - The ID of this instance
   */
  get id() {
    return this.#id;
  }

  /**
   * @protected
   * @param {number|null} id
   */
  set id(id) {
    this.#id = id;
  }

  /**
   * Retrieves a single instance
   *
   * @param {number} id - The ID of the model instance to get
   * @returns {*|null} - The instance or null if no instance exists for the given ID
   */
  static get(id) {
    const raw = db.get(this.type, id);
    return raw ? new this(raw) : null;
  }

  /**
   * Check if an instance with the given ID exists
   *
   * @param {number} id
   * @return {boolean}
   */
  static exists(id) {
    return db.get(this.type, id) !== null;
  }

  /**
   * Find all instances that match the given filter
   *
   * Values in the filter that are RegExp instances are matched as regular
   * expressions, all other values are matched by equality
   *
   * @param {{[p: string]: RegExp | string | number | boolean }} filters
   */
  static find(filters) {
    return db
      .list(this.type)
      .filter((item) => {
        for (const [k, v] of Object.entries(filters)) {
          if (v instanceof RegExp) {
            // special handling for regexp
            if (!v.test(item[k])) {
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
   * expressions, all other values are matched by equality
   *
   * @param {{[p: string]: RegExp | string | number | boolean }} filters
   */
  static findFirst(filters) {
    const items = this.find(filters);
    return items.length > 0 ? items[0] : undefined;
  }

  /**
   * Saves this instance to the database
   */
  save() {
    const raw = Object.fromEntries(
      this.constructor.fields.map((field) => [field, this[field]])
    );
    const result = db.upsert(this.constructor.type, { id: this.id, ...raw });
    this.id = result.id;
  }

  /**
   * Deletes this instance from the database
   */
  delete() {
    db.delete(this.constructor.type, this.id);
    this.id = null;
  }
}
