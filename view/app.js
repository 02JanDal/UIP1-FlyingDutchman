//const products = {
//get element by id from

//for products in 

//element. create child
//}

function clickHandler(element) {
  //element.properties/id
  for (let i = 0; i < element.parentElement.children.length; i++) {
    element.parentElement.children[i].classList.remove("selected")
  }

  if (!element.classList.contains("selected")) {
    element.classList.toggle("selected");
  }
}

function logoutHandler(element) {
  // for (let i = 0; i < element.children.length; i++) {
  //   element.children[i].classList.remove("selected")
  // }
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}