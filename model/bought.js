import { AbstractModel } from "./abstract.js";

export default class Bought extends AbstractModel {
    static type = "bought";
    static fields = [
        "transaction_id",
        "admin_id",
        "beer_id",
        "amount",
        "price",
        "timestamp",
    ]

    transaction_id;
    admin_id;
    beer_id;
    amount;
    price;
    timestamp;
}