const logOut = document.getElementById("log-out");
const containor = document.querySelector(".containor");
logOut.addEventListener("click",function(){

   
    containor.style.opacity = '0.2';

    let messageBox = document.createElement("div");
     
    messageBox.innerHTML = "<h2 class ='message-title'> Are your sure want to log out?</h2> <div id ='yes-no'><div id='yes'>Yes</div><div id='no' >No</div></div>";

    messageBox.style.display= "block" ;
    messageBox.style.width = "400px";
    messageBox.style.backgroundColor = "white";
    messageBox.style.left = "50%";
    messageBox.style.top = "50%";
    messageBox.style.transform = "translate(-50%, -50%)"; 
    messageBox.style.position = "absolute";
    messageBox.style.borderRadius = "25px";
    messageBox.style.textAlign = "center";
    messageBox.style.padding = "16px";
    messageBox.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)";
    

    document.body.appendChild(messageBox);

    let yesNo = document.querySelector("#yes-no");
    yesNo.style.display = 'flex';
    yesNo.style.alignItems = 'center';
    yesNo.style.justifyContent = 'center';

   let yesBtn = document.querySelector("#yes");
   yesBtn.style.backgroundColor = '#AEF359';
   yesBtn.style.width = "100px";
   yesBtn.style.border = "none";
   yesBtn.style.padding = "8px";
   yesBtn.style.textAlign = "center";
   yesBtn.style.marginRight="8px";
   yesBtn.style.borderRadius = "10px";
   yesBtn.style.fontSize = "16px";
   yesBtn.style.cursor = "pointer";
   yesBtn.style.color = "black";
    let noBtn = document.querySelector("#no");
    noBtn.style.backgroundColor = '#AEF359';
    noBtn.style.width = "100px";
    noBtn.style.border = "none";
    noBtn.style.padding = "8px";
    noBtn.style.textAlign = "center";
    noBtn.style.marginRight="8px";
    noBtn.style.borderRadius = "10px";
    noBtn.style.fontSize = "16px";
    noBtn.style.cursor = "pointer";
    noBtn.style.color = "black";
    yesBtn.addEventListener("click",()=>{
        document.body.innerHTML = '<div class="loader"></div>';
        setTimeout(()=>{
        window.location.href = "../index.html";
        },2000)
    });
    
    noBtn.addEventListener("click", () => {
       document.body.removeChild(messageBox); 
       containor.style.opacity = "1"; 
    });

})