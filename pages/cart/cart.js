
const cartContent = document.getElementById('cart-content');
const totalAmount = document.getElementById('total-amount');

function fetchCartItems() {
    fetch('http://localhost:3000/api/getCart', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(cartItems => {
     
        console.log(cartItems);
   
        cartContent.innerHTML = '';

            let totalPrice = 0;
            cartItems.forEach(item => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product-container';
            
            productDiv.setAttribute('data-item-id', item.itemId);
     
            productDiv.style.backgroundColor = "beige";
            productDiv.style.width = "100%";
            productDiv.style.height = "100px";
            productDiv.style.display = "flex";
            productDiv.style.justifyContent = "space-around";
            productDiv.style.alignItems = "center";
            productDiv.style.marginBottom = "30px";
            productDiv.style.borderRadius = "25px";
            productDiv.style.boxShadow = "0 0 7px rgba(0, 0, 0, 0.3)";

            productDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <div class="unit-prize">$${item.price}</div>
            <div class="item-count">
              <div class="item-count-containor">
                <div class="count-containor minus">-</div>
                <div class="count-title">${item.itemCount}</div>
                <div class="count-containor plus">+</div>
              </div>
            </div>
            <p>$${item.totalPrice}</p>
            <i class="fa fa-trash"></i>
          `;
          
          let count = item.itemCount;
          
          let minusCount = productDiv.querySelector('.count-containor.minus');
          let plusCount = productDiv.querySelector('.count-containor.plus');
          let countTitle = productDiv.querySelector('.count-title');
          let priceDisplay = productDiv.querySelector('p');
          
          
          minusCount.addEventListener("click", () => {
            count--;
            if (count >= 0) {
              countTitle.textContent = count;
              item.itemCount = count;
              item.totalPrice = item.totalPrice - item.price;
              priceDisplay.textContent = `$${item.totalPrice}`;
              updateTotalAmount();
            }
          });
          
          plusCount.addEventListener("click", () => {
            count++;
            countTitle.textContent = count;
            item.itemCount = count;
            item.totalPrice = item.totalPrice + item.price;
            priceDisplay.textContent = `$${item.totalPrice}`;
            updateTotalAmount();
          });
          
          

            let trashIcon = productDiv.querySelector('.fa-trash');
            trashIcon.addEventListener("click", () => {
                removeFromCart(productDiv);
                updateTotalAmount();
            });


            totalPrice += item.totalPrice;
            
            cartContent.appendChild(productDiv);
        });

        const totalAmount = document.getElementById('total-amount');
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
    })
    .catch(error => {
        console.error('Error fetching cart items:', error);
    });

    function updateTotalAmount() {
       
        const cartItems = document.querySelectorAll('.product-container');
        let newTotalPrice = 0;
    
        cartItems.forEach(item => {
          const itemTotal = parseFloat(item.querySelector('p').textContent.slice(1));
          newTotalPrice += itemTotal;
        });
    
        totalAmount.textContent = `$${newTotalPrice.toFixed(2)}`;
      }    
}


document.addEventListener('DOMContentLoaded', fetchCartItems);


const checkbtn = document.querySelector('.check-out');

checkbtn.addEventListener("click", (item) => {

  document.body.innerHTML = '<div class="loader"></div>';
  

  setTimeout(() => {

    window.location.href = "payment.html";
  }, 4000);

  const cartContent = document.getElementById("cart-content");
  if (cartContent) {
    cartContent.innerHTML = "";
  }
  

});


const cardNumber = document.getElementById("card-number");
const date = document.getElementById("date");
const cvc = document.getElementById("cvc");


function validate(){


  document.body.innerHTML = '<div class="loader"></div>';
  

  setTimeout(() => {

    window.location.href = "success.html";
  }, 4000);
}

function cancel(){

  
  document.body.innerHTML = '<div class="loader"></div>';
  

  setTimeout(() => {

    window.location.href = "cancel.html";
  }, 4000);

}




 function removeFromCart(productDiv) {

    const itemId = productDiv.getAttribute('data-item-id');

    fetch(`http://localhost:3000/api/removeFromCart/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        productDiv.parentNode.removeChild(productDiv);
        snackBar("Item removed from the cart");
        setTimeout(() => {
          location.reload();
        }, 1000);
        
    })
    .catch(error => {
        console.error('Error removing item from cart:', error);
    });
}





function snackBar(message) {
    var x = document.getElementById("snackbar");
  
    x.innerHTML = message; 
  
    x.className = "show";
  
    setTimeout(function () {
        x.className = x.className.replace("show", ""); 
    }, 2000);
  }




