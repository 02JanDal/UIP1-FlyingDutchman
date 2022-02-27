import undo, { UndoCommand } from "../util/undo_manager";

export default class PaymentController {
    /**
     * Customer payment -- once paid, cant be undo
     * @param {OrderBill} order
     */
    customerPay(order){
        if (order.status == "placed"){
            undo.push(
                new UndoCommand (() => {
                    order.status = "payed";
                    order.save();
                }, undefined)
            )
        }
    }

    /**
     * Customer top up payment -- once paid, cant be undo
     * @param {account} account
     */
    customerTopUpPay(account){
        undo.push(
            new UndoCommand(()=> {
                account.topUpStatus = "paid";
                account.save();
            }, undefined)
        )
    }
}