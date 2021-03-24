let email = document.getElementById("email");
let erroremail = document.getElementById("erroremail");
let password = document.getElementById("password");
let errorpassword = document.getElementById("errorpassword");
email.addEventListener("keyup", emailvalidation);
password.addEventListener("keyup", passwordvalidation);
email.addEventListener("focusout", emailvalidation);
password.addEventListener("focusout", passwordvalidation);
let emailExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
let passwordExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
let frmlogin=document.getElementById("frmlogin");
frmlogin.addEventListener("submit",validate);
function emailvalidation() {
    
    if (!(emailExp.test(email.value))) {
        erroremail.innerHTML = "Please Enter a <strong>Valid</strong> Email Id";
        erroremail.classList.add("invalidmessage");
        erroremail.classList.remove("validmessage");
        email.classList.add("invalidinput");
        return false;        
    }
    else {
        erroremail.innerHTML = "";
        erroremail.classList.remove("invalidmessage");
        erroremail.classList.add("validmessage");
        email.classList.remove("invalidinput");
        return true;
    }
}

function passwordvalidation() {
    if (!(passwordExp.test(password.value))) {
        errorpassword.innerHTML = "Make sure your Password match criteria given below";
        errorpassword.classList.add("invalidmessage");
        errorpassword.classList.remove("validmessage");
        password.classList.add("invalidinput");
        errorpassword.style.bottom = "78%";
      
        return false;        
    }
    else {
        errorpassword.innerHTML = "";
        errorpassword.classList.remove("invalidmessage");
        errorpassword.classList.add("validmessage");
        password.classList.remove("invalidinput");
        return true;
    }
}
function validate(e) {
    // Basic Validation
    e.preventDefault();    
    let returnvalue = true;
    let focuselement = null;
    let result = false;
    if (email.value.trim() == "") {
        erroremail.innerHTML = "E-mail cannot be Empty";
        erroremail.classList.add("invalidmessage");
        erroremail.classList.remove("validmessage");
        email.classList.add("invalidinput");
        
        returnvalue = false;
        if (focuselement == null) { focuselement = email; }
    }
    else {
        result = emailvalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    if (password.value.trim() == "") {
        errorpassword.innerHTML = "Password cannot be Empty";
        errorpassword.classList.add("invalidmessage");
        errorpassword.classList.remove("validmessage");
        password.classList.add("invalidinput");
        errorpassword.style.bottom = "78%";
        
        returnvalue = false;
        if (focuselement == null) { focuselement = password; }
    }
    else {
        result = passwordvalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    
    if(returnvalue==true){
        
        frmlogin.submit();
    }
    
}