



var elements = document.getElementsByClassName("column");


var i;

function gridView() {
  for (i = 0; i < elements.length; i++) {
    elements[i].style.width = "50%";
  }
}


//const category = document.getElementById("categoryFilter");
const prize = document.getElementById("input-box-1");
const title = document.getElementById("input-box-2");
const image = document.getElementById("input-box-3");
const column = document.getElementById("grid-column");
const imageContent = document.getElementById("image-content");
const gridRow = document.getElementById("grid-row");
const addButton = document.getElementById("addButton");
const itemSub = document.getElementById("item-sub");
var itemCount = 0;






const categoryFilter = document.getElementById("categoryFilter");



function addItem() {

  fetch('http://localhost:3000/api/addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: title.value, prize: prize.value, image: image.value, category: categoryFilter.value }),
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data);
    console.log(categoryFilter.value);
    snackBar("Item added successfully");
    setTimeout(() => {
      window.location.reload();
    }, 2000);

  });
}


//Snack bar

function snackBar(message) {
  var x = document.getElementById("snackbar");

  x.innerHTML = message; 

  x.className = "show";

  setTimeout(function () {
      x.className = x.className.replace("show", ""); 
  }, 2000);
}













 

  









































  







