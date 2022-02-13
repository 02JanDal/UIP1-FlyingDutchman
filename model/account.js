import { AbstractModel } from "./abstract.js";

export default class Account extends AbstractModel {
    static type = "account";
    static fields = [
        "user_id",
        "creditSEK",
    ];

    user_id;
    creditSEK;
}