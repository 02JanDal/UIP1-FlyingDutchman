import undo, { UndoCommand } from "../util/undo_manager";

export default class ManageProductController{

    /***
     * Decrease stock when user places order on certain products
     * This action can't be undo
     *
     * @param order
     */
    decreaseStockOrdered(order){
        if (order.status === "placed")
            undo.push(
                new UndoCommand(
                    () => {
                        for (let i = 0; i < order.products; i++){
                            /** The "order.products[i]" is to get the product id. Then, the .stock is to update the stock.
                             * But i am a bit confused here hmmm... **/
                            order.products[i].stock -= 1;
                            order.products[i].save();
                        }
                    }, undefined
                )
            );
    }


    /***
     * Decrease stock when user adds the item to the cart
     * This action can be undo
     *
     * @param order
     */
    decreaseStockCart(product){
        undo.push(
            new UndoCommand(
                () => {
                    product.stock -= 1;
                    product.save();
                },
                () => {
                    product.stock += 1;
                    product.save();
                }
            )
        )
    }

    /***
     * Set the stock number from the bartender view
     * It cant be undo because if the bartender wants to "undo", they can just
     * input a new number and click "Save changes"
     *
     * @param number
     * @param product
     */
    updateStocks(product, number){
        undo.push(
            new UndoCommand(
                () => {
                    product.stock = number;
                    product.save();
                }, undefined
            )
        )
    }

    /***
     * To update whether the product is visible or not in the customer's menu view
     * @param product
     */

    updateVisibility(product){
        if (product.visible === "yes")
            undo.push(
                new UndoCommand(
                    () => {
                        product.visible = "no";
                        product.save();
                    },
                    () => {
                        product.visible = "yes";
                        product.save();
                    }
                )
            )
    }
}