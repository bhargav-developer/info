var tablinks = document.getElementsByClassName('tab-links');
var tabcontants = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");

    }
    for (tabcontant of tabcontants) {
        tabcontant.classList.remove("active-tab");

    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");  
}

let side = document.getElementById("sidemenu");

function openmenu(){
    side.style.right = "0px";

}
function closemenu(){
    side.style.right = "-200px";
    
}
