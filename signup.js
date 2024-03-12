
const passwordInput = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');
const showPassIcon = document.getElementById('password-icon');
const showConfirmPassIcon = document.getElementById('confirm-password-icon');


showPassIcon.addEventListener('click', function () {

    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
});


showConfirmPassIcon.addEventListener('click', function () {

    const type = confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPassword.setAttribute('type', type);
    
    this.classList.toggle('active');

    if (this.classList.contains('active')) {
        this.classList.remove('fa-eye');
        this.classList.add('fa-eye-slash');
    } else {
        this.classList.remove('fa-eye-slash');
        this.classList.add('fa-eye');
    }
});





function createAccount() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const userPannel = document.getElementById( 'userPannel' ).value;
    const createBtn = document.getElementById("createBtn");
    

   
    if (username.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
        snackBar("Please Fill All Fields");
        return;
    }

   
    if (!password || password.length < 6) {
        snackBar("Password length should be more than 6");
        return;
    }

    if (confirmPassword !== password) {
        snackBar("Passwords do not match.");
        return;
    }

    const data = { username, password, confirmPassword, userPannel };

    fetch('http://localhost:3000/createAccount', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    let icon = document.createElement("i");
    icon.classList.add("fa","fa-spinner","fa-spin");
    createBtn.innerHTML = "";
    createBtn.appendChild(icon);
    snackBar(data.message);
    setTimeout(() => {
        createBtn.innerHTML = "Create Account";
        window.location.href = "index.html";
    }, 3000); 
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        snackBar('Username Already Exits');
    });

 
}


function snackBar(message) {
    var x = document.getElementById("snackbar");

    x.innerHTML = message; 

    x.className = "show";

    setTimeout(function () {
        x.className = x.className.replace("show", ""); 
    }, 3000);
}
