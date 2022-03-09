import { AbstractModel } from "./abstract.js";
import Account from "./account.js";

export default class User extends AbstractModel {
  static type = "user";
  static fields = [
    "credentials",
    "password",
    "username",
    "firstName",
    "lastName",
    "email",
    "phone",
  ];

  /**
   * @property {string} credentials - 0 for manager, 1 for bartender, 2 for waiter, 3 for VIP customers, 4 for other customers
   * @property {string} password
   * @property {string} username
   * @property {string} firstName
   * @property {string} lastName
   * @property {string} email
   * @property {string} phone
   */

  get isManager() {
    return this.credentials === "0";
  }
  get isBartender() {
    return this.credentials === "1";
  }
  get isWaiter() {
    return this.credentials === "2";
  }
  get isVIP() {
    return this.credentials === "3";
  }
  get isCustomer() {
    return this.credentials === "4";
  }

  /** @returns {Account} */
  get account() {
    return Account.findFirst({ user_id: this.id });
  }
}
