let authorname = document.getElementById("authorname");
let errorauthorname = document.getElementById("errorauthorname");
let bestbookname = document.getElementById("bestbookname");
let errorbestbookname = document.getElementById("errorbestbookname");
let award = document.getElementById("award");
let erroraward = document.getElementById("erroraward");
authorname.addEventListener("keyup", authornamevalidation);
bestbookname.addEventListener("keyup", bestbooknamevalidation);
award.addEventListener("keyup", awardvalidation);
authorname.addEventListener("focusout", authornamevalidation);
bestbookname.addEventListener("focusout", bestbooknamevalidation);
award.addEventListener("focusout", awardvalidation);
let frmaddauthor=document.getElementById("frmaddauthor");
frmaddauthor.addEventListener("submit",validate);


function authornamevalidation() {
    if (authorname.value.trim() == "") {
        errorauthorname.innerHTML = "Book Name cannot be Empty";
        errorauthorname.classList.add("invalidmessage");
        errorauthorname.classList.remove("validmessage");
        authorname.classList.add("invalidinput");
        return false;
    }
    else {
        errorauthorname.innerHTML = "";
        errorauthorname.classList.remove("invalidmessage");
        errorauthorname.classList.add("validmessage");
        authorname.classList.remove("invalidinput");
        return true;
    }
}
function bestbooknamevalidation() {
    if (bestbookname.value.trim() == "") {
        errorbestbookname.innerHTML = "Author Name cannot be Empty";
        errorbestbookname.classList.add("invalidmessage");
        errorbestbookname.classList.remove("validmessage");
        bestbookname.classList.add("invalidinput");
        return false;
    }
    else {
        errorbestbookname.innerHTML = "";
        errorbestbookname.classList.remove("invalidmessage");
        errorbestbookname.classList.add("validmessage");
        bestbookname.classList.remove("invalidinput");
        return true;
    }
}

function awardvalidation() {
    if (award.value.trim() == "") {
        erroraward.innerHTML = "Genre cannot be Empty";
        erroraward.classList.add("invalidmessage");
        erroraward.classList.remove("validmessage");
        award.classList.add("invalidinput");   
        return false;
    }
    else {
        erroraward.innerHTML = "";
        erroraward.classList.remove("invalidmessage");
        erroraward.classList.add("validmessage");
        award.classList.remove("invalidinput");
        return true;
    }
}
//image upload
let fileTag = document.getElementById("filetag");
let preview = document.getElementById("preview");
    
fileTag.addEventListener("change", function() {
  changeImage(this);
});

function changeImage(input) {
  var reader;

  if (input.files && input.files[0]) {
    reader = new FileReader();

    reader.onload = function(e) {
      preview.setAttribute('src', e.target.result);
      let formData = new FormData();
        formData.append("photo",input.files[0]);
        fetch('../public/images',{method:"POST",body:formData})
        .catch(er=>{
            console.error(er)
        });
    }
    reader.readAsDataURL(input.files[0]);
  }
}

function validate(e) {
    // Basic Validation 
    e.preventDefault();    
    let returnvalue = true;
    let focuselement = null;
    let result = false;
    if (authorname.value.trim() == "") {
        errorauthorname.innerHTML = "Book Name cannot be Empty";
        errorauthorname.classList.add("invalidmessage");
        errorauthorname.classList.remove("validmessage");
        authorname.classList.add("invalidinput");
        returnvalue = false;
        focuselement = authorname;
    }
    else {
        result = authornamevalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    if (bestbookname.value.trim() == "") {
        errorbestbookname.innerHTML = "Author Name cannot be Empty";
        errorbestbookname.classList.add("invalidmessage");
        errorbestbookname.classList.remove("validmessage");
        bestbookname.classList.add("invalidinput");
        returnvalue = false;
        if (focuselement == null) { focuselement = bestbookname; }
    }
    else {
        result = bestbooknamevalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    if (award.value.trim() == "") {
        erroraward.innerHTML = "Genre cannot be Empty";
        erroraward.classList.add("invalidmessage");
        erroraward.classList.remove("validmessage");
        award.classList.add("invalidinput");
        returnvalue = false;
        if (focuselement == null) { focuselement = award; }
    }
    else {
        result = awardvalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    //focuselement.focus();
    // return returnvalue;   
    if(returnvalue==true){
        //alert(returnvalue);
        frmaddauthor.submit();
    } 
}
