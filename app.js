
// Change Title Property - On focus & blur tab
const originalTitle = "Portfolio - Eshan Sud";
window.addEventListener("blur", () => {document.title = "Come Back Soon...";});
window.addEventListener("focus", () => {document.title = originalTitle;});

// Toggle the hamburger menu icon
var isDisplayed = false;
function showHamburgerMenu(){
    var panel = document.getElementById("menu-icon-panel");
    if (isDisplayed == false){
        panel.style.display = "flex";
        isDisplayed = true;
    }
    else{
        panel.style.display = "none";
        isDisplayed = false;
    }
}

// Sticky Menu Header
let lastScrollTop = 0;
let headerVisible = true;
window.addEventListener("scroll", () => {
    var menuHeader = document.getElementById("menu-header");
    var menuIconPanel = document.getElementById("menu-icon-panel");
    var iconPanelIsVisible = menuIconPanel.style.position;
    console.log(iconPanelIsVisible);
    var currentScroll = document.documentElement.scrollTop;
    if (currentScroll > lastScrollTop) {
        menuIconPanel.classList.add("hidden");
        menuHeader.classList.add("hidden");
        menuIconPanel.style.position = "fixed";
        menuHeader.style.position = "fixed";
        headerVisible = false;
    } else if (currentScroll <= 0){
        menuHeader.classList.remove("hidden");
        menuHeader.style.position = "static";
        headerVisible = true;
    } else if (!headerVisible) {
        menuHeader.classList.remove("hidden");
        menuHeader.style.position = "fixed";
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Revealing Elements on scroll
// window.addEventListener("scroll", reveal);
// function reveal(){
//     var reveals = document.querySelectorAll(".reveal");
//     var revealPoint = 200;
//     for(var i=0; i<reveals.length; i++){
//         var windowHeight = window.innerHeight;
//         var revealTop = reveals[i].getBoundingClientRect().top;
//         if (revealTop < windowHeight - revealPoint){reveals[i].classList.add("active");}
//         else{reveals[i].classList.remove("active");}
//     }
// }

// Sending The Message
function sendMessage(){
    // var name = document.getElementById();
    // var email = document.getElementById();
    showPopup();
}
function showPopup(){
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "block";
}
function hidePopup(){
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "none";
}