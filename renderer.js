const { ipcRenderer } = require('electron');

const login = document.getElementById("login");

login.addEventListener("click", function () {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    ipcRenderer.send('loginClicked', { username, password, navigateTo:"home.html" });
});
