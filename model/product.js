import { AbstractModel } from "./abstract.js";

export default class Product extends AbstractModel {
  static type = "product";
  static fields = [
    "nr",
    "artikelid",
    "varnummer",
    "namn",
    "namn2",
    "prisinklmoms",
    "volymiml",
    "prisperliter",
    "saljstart",
    "slutlev",
    "varugrupp",
    "forpackning",
    "forslutning",
    "ursprung",
    "urspunglandnamn",
    "producent",
    "leverantor",
    "argang",
    "provadargang",
    "alkoholhalt",
    "modul",
    "sortiment",
    "ekologisk",
    "koscher",
  ];

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
   * @property {string} alkoholhalt   - Alcohol percentage
   * @property {string} modul         - Module
   * @property {string} sortiment     - Assortment
   * @property {boolean} ekologisk    - Organic
   * @property {boolean} koscher      - Kosher
   */
}
