import { AbstractModel } from "./abstract.js";

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

  credentials;
  password;
  username;
  firstName;
  lastName;
  email;
  phone;
}
