let btnmore = document.getElementById("btnmore");
let homecontent = document.getElementById("homecontent");
btnmore.addEventListener("click", resizecontent);
// console.log("hi" + homecontent.classList.contains);
function resizecontent() {
    // if (hasClass(homecontent,"fixedheight")) {
    if (homecontent.classList.contains("fixedheight")) {
        // alert("hi");
        homecontent.classList.add("expandedheight");
        homecontent.classList.remove("fixedheight");
        btnmore.innerHTML="Less &#9633"
    }
    else{
        homecontent.classList.remove("expandedheight");
        homecontent.classList.add("fixedheight");
        btnmore.innerHTML="More &#9633"
    }
}