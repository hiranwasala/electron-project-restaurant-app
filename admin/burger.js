


function display() {
    fetch(`http://localhost:3000/api/getItems/Burgers`, {
      method: 'GET',
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        showItems(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  
  function showItems(items){
    
    items.forEach((item) => {
  
    let div = document.createElement('div');
    div.className = 'column';
    div.setAttribute('data-item-id', item.id);
    
    let h2 = document.createElement('h2');
    let p = document.createElement('p');
    let img = document.createElement('img');
    let dotContainer = document.createElement('div');
    let pDiv = document.createElement('div');
    let dropdownContent = document.createElement('div');


 
  

  

  

    
    dropdownContent.className = 'dropdown-content';
    dropdownContent.style.width = '100px';
    dropdownContent.style.height = '100px';
    dropdownContent.style.borderRadius = '15px';
    dropdownContent.style.paddingTop = '15px';
    
  
    dotContainer.addEventListener('mouseenter', function () {
      dotContainer.style.backgroundColor = 'orange';
      dotContainer.style.borderRadius = '20px';
      dotContainer.style.padding = '10px';
    });
  
    dotContainer.addEventListener('mouseleave', function () {
      dotContainer.style.backgroundColor = 'transparent';
    });
  
    dotContainer.addEventListener('click', function () {
      myFunction(dotContainer);
    });
  
    pDiv.style.display = 'flex';
    pDiv.style.justifyContent = 'space-between';
    pDiv.style.alignItems = 'center';
    pDiv.style.marginRight = '10px';
  
    for (let i = 0; i < 3; i++) {
      let dot = document.createElement('div');
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.backgroundColor = 'black';
      dot.style.marginBottom = '3px';
      dot.style.borderRadius = '3px';
      dot.style.cursor = 'pointer';
      dotContainer.appendChild(dot);
    }
  
    pDiv.appendChild(p);

    pDiv.appendChild(dotContainer);
    
  
    h2.textContent = item.title; 
    p.textContent = '$' + item.prize; 
    img.src = item.image; 
    img.style.width = '250px';
    img.style.height = '200px';
    img.style.borderRadius = '25px';
  
    div.appendChild(img);
    div.appendChild(h2);
    div.appendChild(pDiv); 
    div.appendChild(dropdownContent);
  
    gridRow.appendChild(div);
  
    
    
  function myFunction(dotContainer) {
   
  let dropdownContent = dotContainer.parentElement.nextElementSibling;
  
  
  let deleteLink = document.createElement("a");
  deleteLink.href = "#";
  deleteLink.textContent = "Delete";
  deleteLink.addEventListener("click", function() {
  
   Delete(div);
   itemSub.textContent--;
  
  });
  
  
  let editLink = document.createElement("a");
  editLink.href = "#";
  editLink.textContent = "Edit";
  
  editLink.addEventListener("click", function() {
    
    title.value = h2.textContent;
    prize.value = p.textContent.slice(1);
    image.value = img.getAttribute('src');
  
    addButton.innerHTML = "Update";
  
    addButton.onclick = function() {
  
     const itemId = div.getAttribute('data-item-id');
  
     const updatedData = {
         title: title.value,
         prize: prize.value,
         image: image.value
     };
   
     fetch(`http://localhost:3000/api/updateItem/${itemId}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify(updatedData),
     })
     .then((response) => response.json())
     .then((data) => {
       
         console.log(data);
         h2.textContent = title.value;
         p.textContent = "$" + prize.value;
         img.src = image.value;
       
         addButton.innerHTML = "Add Item";
         addButton.onclick = addItem;
       
         prize.value = "";
         title.value = "";
         image.value = "";
  
       
         snackBar("Item Updated");
       
         dropdownContent.classList.remove("show");
         
     })
     .catch((error) => {
         console.error('Error:', error);
     });
  
  
    };
    
  
  });
  
      
    
  
  dropdownContent.innerHTML = "";
  dropdownContent.appendChild(deleteLink);
  dropdownContent.appendChild(editLink);
  dropdownContent.classList.toggle("show");
  }
    prize.value = '';
    title.value = '';
    img.value = '';
  
    itemCount++;
    itemSub.textContent = itemCount;
   
      
    });
  
    
    
  }
  


  function Delete(column){
    const itemId = column.getAttribute('data-item-id');
  
    fetch(`http://localhost:3000/api/deleteItem/${itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      column.parentNode.removeChild(column);
      snackBar('Item Deleted successfully');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }
  
  document.addEventListener('DOMContentLoaded', display);


  function snackBar(message) {
    var x = document.getElementById("snackbar");
  
    x.innerHTML = message; 
  
    x.className = "show";
  
    setTimeout(function () {
        x.className = x.className.replace("show", ""); 
    }, 2000);
  }