
const passwordInput = document.querySelector('.password-input');
const showPassIcon = document.querySelector('.show-pass');


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


//Login 

function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!username || !password) {
        snackBar("Please enter both username and password.");
        return;
    } else {
        const data = { username, password };

        fetch('http://localhost:3000/login', {
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
            if (data.success) {


                let icon = document.createElement("i");
                icon.classList.add("fa", "fa-spinner", "fa-spin");
                login.innerHTML = "";
                login.appendChild(icon);

                snackBar("Login successful!");

                if (data.isAdmin) {
                    
                    setTimeout(() => {
                        login.innerHTML = "Login";
                        window.location.href = "../Electron_1/admin/admin.html";
                    }, 3000);

                } else {
                    
                    setTimeout(() => {
                        login.innerHTML = "Login";
                        window.location.href = "../Electron_1/pages/home/home.html";
                    }, 3000);
                }

            } else {
                snackBar("Invalid username or password. Please try again.");
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            snackBar('Failed to log in. Check the console for more details.');
        });
    }
}

// function handleLogin() {
//     const username = document.getElementById("username").value;
//     const password = document.getElementById("password").value;

//     if (!username || !password) {
//         snackBar("Please enter both username and password.");
//         return;
//     } else {
//         const data = { username, password };

//         fetch('http://localhost:3000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             if (data.success) {
//                 let icon = document.createElement("i");
//                 icon.classList.add("fa", "fa-spinner", "fa-spin");
//                 login.innerHTML = "";
//                 login.appendChild(icon);

//                 snackBar("Login successful!");

                
//                 if (data.isAdmin) {
//                     window.location.href = "admin.html";
//                 } else {
                    
//                     setTimeout(() => {
//                         login.innerHTML = "Login";
//                         window.location.href = "../Electron_1/pages/home/home.html";
//                     }, 3000);
//                 }
//             } else {
//                 snackBar("Invalid username or password. Please try again.");
//             }
//         })
//         .catch(error => {
//             console.error('Fetch Error:', error);
//             snackBar('Failed to log in. Check the console for more details.');
//         });
//     }
// }


function snackBar(message) {
    var x = document.getElementById("snackbar");

    x.innerHTML = message; 

    x.className = "show";

    setTimeout(function () {
        x.className = x.className.replace("show", ""); 
    }, 3000);
}
