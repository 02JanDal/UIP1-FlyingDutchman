import { AbstractModel } from "./abstract.js";

export default class Sold extends AbstractModel {
    static type = "sold";
    static fields = [
        "transaction_id",
        "user_id",
        "beer_id",
        "timestamp",
    ]

    transaction_id;
    user_id;
    beer_id;
    timestamp;
}