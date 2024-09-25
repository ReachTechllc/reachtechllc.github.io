var head = document.getElementById("head"), 
headcon = document.getElementById("header-con"),
offhead = headcon.offsetHeight, cname = document.getElementById("c-name"), navul = document.getElementById("nav-ul");

window.addEventListener("scroll", (e) => {
    if(window.scrollY > offhead){
        head.classList.add("h-change");
        cname.classList.add("h-bchange1");
        navul.classList.add("h-bchange2");
        headcon.classList.add("h-pchange3");

    }
    if(window.scrollY < offhead){
        head.classList.remove("h-change")
        cname.classList.remove("h-bchange1");
        navul.classList.remove("h-bchange2");
        headcon.classList.remove("h-pchange3");
    }
})

var menub = document.getElementById("menu-b");
var hm = document.getElementById("hidden-nav");

menub.onclick = function (){
    if(hm.classList.contains("dropdown")){
        hm.classList.remove("dropdown");  
        hm.classList.add("dropdownc");  
    }else if(hm.classList.contains("dropdownc")){
        hm.classList.remove("dropdownc"); 
        hm.classList.add("dropdown");
    }else{
        hm.classList.add("dropdown");
    }
}


///process contact us

var bsubmit = document.getElementById("submitb");
var fullname = document.getElementById("fullname"),
   email = document.getElementById("email"), subject = document.getElementById("subject"),
   messages = document.getElementById("messages"); 

var ferror = document.getElementById("fullname-error");
var serror = document.getElementById("subject-error");
var eerror = document.getElementById("email-error");
var merror = document.getElementById("messages-error");

function initializeRequest(button){
    button.setAttribute("disabled", "");
    let spin = document.getElementById("spin");
    let scover = document.getElementById("s-cover");
    scover.classList.add("active");
    spin.classList.add("active");
}
function destroyRequest(button){
    button.removeAttribute("disabled");
    let spin = document.getElementById("spin");
    let scover = document.getElementById("s-cover");
    scover.classList.remove("active");
    spin.classList.remove("active");
}
bsubmit.onclick = function(){
    initializeRequest(bsubmit);


    //get all request
   
   var error = [];

    ///check for input
    if(fullname.value.length == 0){
        ferror.innerHTML = "Full name is required";
        error.push("Full name is required");
    }
    if(subject.value.length == 0){
        
        serror.innerHTML = "Subject is required";
        error.push("Subject is required");
    }
    if(email.value.length > 1){
        let re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if(!RegExp(re).test(email.value)){
            eerror.innerHTML = "Email is incorrect";
            error.push("Email is incorrect");
        }else{
            eerror.innerHTML = "";
        }

    }else{
        eerror.innerHTML = "Email is reqired";
        error.push("Email is reqired");
    }
    if(messages.value.length == 0){
        
        merror.innerHTML = "messages is reqired";
        error.push("messages is reqired");
    }

    if(error.length == 0){
        var xhr = new XMLHttpRequest();
   
        xhr.responseType = 'text';
        
        xhr.open("GET", `http://localhost/Reach-Tech/process_mail.php?f=${fullname.value}&e=${email.value}&s=${subject.value}&m=${messages.value}`, true);
        xhr.send(null);
        xhr.onload = function(){
            var textres = xhr.responseText;
            var arest = JSON.parse(textres);
            console.log(arest.error);
            destroyRequest(bsubmit);
            if(arest.status == "202"){
                let dm = document.getElementById("deliver-m");
                dm.innerHTML = `<div class="d-success">
                <p>&check;</p> 
                <p>Your request is successful</p>
            </div>`;
            }else{
                let dm = document.getElementById("deliver-m");
                dm.innerHTML = `<div class="d-nsuccess">
                <p>&#10006;</p> 
                <p>An error occur</p>
            </div>`;
            }
        }
    }else{
        destroyRequest(bsubmit);
    }
   
  
   
  

}

fullname.onkeyup =  function(){
    if(fullname.value.length > 0 ){
        ferror.innerHTML = "";
    }
}

email.onkeyup =  function(){
    if(email.value.length > 0 ){
        eerror.innerHTML = "";
    }
}

subject.onkeyup =  function(){
    if(subject.value.length > 0 ){
        serror.innerHTML = "";
    }
}

messages.onkeyup =  function(){
    if(fullname.value.length > 0 ){
        merror.innerHTML = "";
    }
}

