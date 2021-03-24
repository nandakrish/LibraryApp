let bookname = document.getElementById("bookname");
let errorbookname = document.getElementById("errorbookname");
let authorname = document.getElementById("authorname");
let errorauthorname = document.getElementById("errorauthorname");
let genre = document.getElementById("genre");
let errorgenre = document.getElementById("errorgenre");
bookname.addEventListener("keyup", booknamevalidation);
authorname.addEventListener("keyup", authornamevalidation);
genre.addEventListener("keyup", genrevalidation);
bookname.addEventListener("focusout", booknamevalidation);
authorname.addEventListener("focusout", authornamevalidation);
genre.addEventListener("focusout", genrevalidation);
let frmaddbook=document.getElementById("frmaddbook");
frmaddbook.addEventListener("submit",validate);


function booknamevalidation() {
    if (bookname.value.trim() == "") {
        errorbookname.innerHTML = "Book Name cannot be Empty";
        errorbookname.classList.add("invalidmessage");
        errorbookname.classList.remove("validmessage");
        bookname.classList.add("invalidinput");
        return false;
    }
    else {
        errorbookname.innerHTML = "";
        errorbookname.classList.remove("invalidmessage");
        errorbookname.classList.add("validmessage");
        bookname.classList.remove("invalidinput");
        return true;
    }
}
function authornamevalidation() {
    if (authorname.value.trim() == "") {
        errorauthorname.innerHTML = "Author Name cannot be Empty";
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

function genrevalidation() {
    if (genre.value.trim() == "") {
        errorgenre.innerHTML = "Genre cannot be Empty";
        errorgenre.classList.add("invalidmessage");
        errorgenre.classList.remove("validmessage");
        genre.classList.add("invalidinput");   
        return false;
    }
    else {
        errorgenre.innerHTML = "";
        errorgenre.classList.remove("invalidmessage");
        errorgenre.classList.add("validmessage");
        genre.classList.remove("invalidinput");
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
    if (bookname.value.trim() == "") {
        errorbookname.innerHTML = "Book Name cannot be Empty";
        errorbookname.classList.add("invalidmessage");
        errorbookname.classList.remove("validmessage");
        bookname.classList.add("invalidinput");
        returnvalue = false;
        focuselement = bookname;
    }
    else {
        result = booknamevalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    if (authorname.value.trim() == "") {
        errorauthorname.innerHTML = "Author Name cannot be Empty";
        errorauthorname.classList.add("invalidmessage");
        errorauthorname.classList.remove("validmessage");
        authorname.classList.add("invalidinput");
        returnvalue = false;
        if (focuselement == null) { focuselement = authorname; }
    }
    else {
        result = authornamevalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    if (genre.value.trim() == "") {
        errorgenre.innerHTML = "Genre cannot be Empty";
        errorgenre.classList.add("invalidmessage");
        errorgenre.classList.remove("validmessage");
        genre.classList.add("invalidinput");
        returnvalue = false;
        if (focuselement == null) { focuselement = genre; }
    }
    else {
        result = genrevalidation();
        if (returnvalue == true) { returnvalue = result; }
    }
    //focuselement.focus();
    // return returnvalue;   
    if(returnvalue==true){
        //alert(returnvalue);
        frmaddbook.submit();
    } 
}
