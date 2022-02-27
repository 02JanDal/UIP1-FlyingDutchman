//const products = {
//get element by id from

//for products in

//element. create child
//}

function clickHandler(element) {
  //element.properties/id
  for (let i = 0; i < element.parentElement.children.length; i++) {
    element.parentElement.children[i].classList.remove("selected");
  }

  if (!element.classList.contains("selected")) {
    element.classList.toggle("selected");
  }
}
window.clickHandler = clickHandler;

function logoutHandler(element) {
  // for (let i = 0; i < element.children.length; i++) {
  //   element.children[i].classList.remove("selected")
  // }
}
window.logoutHandler = logoutHandler;

function allowDrop(ev) {
  ev.preventDefault();
}
window.allowDrop = allowDrop;

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}
window.drag = drag;

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}
window.drop = drop;

export {}; // needed so that we can import as a module
