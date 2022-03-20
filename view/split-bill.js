import {dontShow, removeChild, show} from "./menu.js";
import orderBillController from "../controller/order_bill_controller.js";
import splitBillController from "../controller/split_bill_controller.js";


window.toSplitBillPage1 = () => {
    dontShow("footer-split-bill-2");
    dontShow("split-bill-2");
    show("split-bill-1", "block");
    show("footer-split-bill-1", "block");
}

window.toSplitBillPage2 = () => {
    dontShow("footer-split-bill-1");
    dontShow("split-bill-1");
    show("split-bill-2", "block");
    show("footer-split-bill-2", "block");
    const totalSplitBills = document.getElementById("number-splitbill").value;
    const parentPerson = document.getElementById("filter-splitbill");
    removeChild(parentPerson);
    for (let i = 0; i < totalSplitBills; i++) {
        const newPerson = `<option value="person-${i}">Person ${i}</option>`;
        parentPerson.insertAdjacentHTML("beforeend", newPerson);
    }
    const products = orderBillController.getOrCreateOrder().products;
    const menuList = document.getElementById("split-bill-products");
    for (const product of products) {
        const name = product.namn;
        const price = product.prisinklmoms;
        const html = `
    <div class="card" onclick="itemSelected()">
    <a href="#" id="to-product-page" data-product-id="${product.id}">
    <div class="card-container">
      <h4 class="item-title">${name}</h4>
      <p class="item-price">
        ${price}0 SEK
      </p>
    </div>      
    </a>
    </div>`;
        menuList.insertAdjacentHTML("beforeend", html);
    }
    // Working
    const order = orderBillController.getOrCreateOrder();
    const party = orderBillController.getOrCreateParty();
    splitBillController.splitBill(totalSplitBills, order, party);
    console.log(order);
}


window.tester = () => {
    const party = orderBillController.getOrCreateParty();
    splitBillController.cancelSplitBill(party);
    console.log(party);
    console.log(party.orders);
}
