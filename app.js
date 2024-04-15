var systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
var settingDark = systemSettingDark;
var adjectives = [
    "Developer",
    "Engineer",
    "Problem Solver",
    "Creative",
    "Passionate Learner"
];
var index = 0;
var isDeleting = false;
var text = "";
var speed = 100;


document.addEventListener("DOMContentLoaded", function(){
    // Select Light/Dark Mode Default Setting
    if (systemSettingDark == true){
        setDarkMode();
    } else{
        setLightMode();
    }

    // Change Title Property - On focus & blur tab
    const originalTitle = "Portfolio - Eshan Sud";
    window.addEventListener("blur", () => {document.title = "Come Back Soon...";});
    window.addEventListener("focus", () => {document.title = originalTitle;});

    // Sticky Menu Header
    let lastScrollTop = 0;
    let headerVisible = true;
    window.addEventListener("scroll", () => {
        var menuHeader = document.getElementById("menu-header");
        var menuIconPanel = document.getElementById("menu-icon-panel");
        var currentScroll = document.documentElement.scrollTop;
        if (currentScroll > lastScrollTop){
            if (iconPanelIsDisplayed) menuIconPanel.classList.add("hidden");
            menuHeader.classList.add("hidden");
            menuIconPanel.style.position = "fixed";
            menuHeader.style.position = "fixed";
            headerVisible = false;
        } else if (!headerVisible){
            if (iconPanelIsDisplayed) menuIconPanel.classList.remove("hidden");
            menuHeader.classList.remove("hidden");
            menuHeader.style.position = "fixed";
        }
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    });

    // Starting Hero Section Text Animation
    setTimeout(type, speed);

    // // Text Shuffling
    // const radius = 70;
    // const paragraph = document.getElementById('introduction-text');
    // const words = paragraph.textContent.split(' ');
    // paragraph.innerHTML = '';
    // words.forEach(word => {
    //     const span = document.createElement('span');
    //     span.textContent = word;
    //     span.classList.add('shuffle-word');
    //     paragraph.appendChild(span);
    //     paragraph.appendChild(document.createTextNode(' '));
    // });
    // paragraph.addEventListener('mousemove', function(event){
    //     const mouseX = event.clientX;
    //     const mouseY = event.clientY;
    //     const shuffleWords = paragraph.querySelectorAll('.shuffle-word');
    //     shuffleWords.forEach(wordElement => {
    //         const wordBounds = wordElement.getBoundingClientRect();
    //         const wordX = wordBounds.left + wordBounds.width / 2;
    //         const wordY = wordBounds.top + wordBounds.height / 2;
    //         const distance = Math.sqrt((wordX - mouseX) ** 2 + (wordY - mouseY) ** 2);
    //         if (distance < radius){
    //             if (!wordElement.originalWord){
    //                 wordElement.originalWord = wordElement.textContent.trim();
    //             }
    //             const word = wordElement.textContent.trim();
    //             wordElement.textContent = shuffleArray(word.split('')).join('');
    //         }
    //         else{
    //             if (wordElement.originalWord){
    //                 wordElement.textContent = wordElement.originalWord;
    //                 delete wordElement.originalWord;
    //             }
    //         }
    //     });
    // });
    // // Shuffles The Word
    // function shuffleArray(array){
    //     for (let i = array.length - 1; i > 0; i--){
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [array[i], array[j]] = [array[j], array[i]];
    //     }
    //     return array;
    // }

    // Background Dot Animation
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    class Dot{
        constructor(x, y, radius, color){
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity ={
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update(){
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) this.velocity.x *= -1;
            if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) this.velocity.y *= -1;
        }
    }
    const numDots = 100;
    const dots = [];
    for (let i = 0; i < numDots; i++){
        const radius = Math.random() * 5 + 2;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        dots.push(new Dot(x, y, radius, color));
    }
    function connectDots(){
        for (let i = 0; i < dots.length; i++){
            for (let j = i + 1; j < dots.length; j++){
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100){
                    ctx.beginPath();
                    if (settingDark == true) ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
                    else ctx.strokeStyle = 'rgba(256, 256, 256, 0.5)';
                    ctx.lineWidth = 1;
                    ctx.moveTo(dots[i].x, dots[i].y);
                    ctx.lineTo(dots[j].x, dots[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
    }
    // Animation loop
    function animate(){
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => dot.update());
        connectDots();
    }
    animate();
});

// Typing Animation
function type(){
    const currentWord = adjectives[index];
    if (isDeleting) {
        text = currentWord.substring(0, text.length - 1);
    } else {
        text = currentWord.substring(0, text.length + 1);
    }
    document.getElementById("text").textContent = text || '\u200B';
    if (!isDeleting && text === currentWord){
        isDeleting = true;
        speed = 200;
    } else if (isDeleting && text === ""){
        isDeleting = false;
        index = (index + 1) % adjectives.length;
        speed = 200;
    }
    setTimeout(type, speed);
}

// Scrolls To The About Container
function goToAboutContainer(id){
    var aboutContainer = document.getElementById(id);
    window.scrollTo(0, aboutContainer.offsetTop);
}

// Toggle Hamburger Menu Icon
var iconPanelIsDisplayed = false;
function showMenu(){
    var panel = document.getElementById("menu-icon-panel");
    var hamburgerMenuIcon = document.getElementById("hamburger-menu-icon");
    var crossMenuIcon = document.getElementById("cross-menu-icon");
    if (iconPanelIsDisplayed == false){
        hamburgerMenuIcon.style.display = "none";
        crossMenuIcon.style.display = "block";
        panel.style.display = "flex";
        iconPanelIsDisplayed = true;
    }
    else{
        hamburgerMenuIcon.style.display = "block";
        crossMenuIcon.style.display = "none";
        panel.style.display = "none";
        iconPanelIsDisplayed = false;
    }
}

// Change To Light Mode
function setLightMode(){
    if (settingDark == false){
        console.log("Setting Light");

        // Changing Icon
        var lightModeIcon = document.getElementById("light-mode-svg");
        var darkModeIcon = document.getElementById("dark-mode-svg");
        lightModeIcon.style.display = "flex";
        darkModeIcon.style.display = "none";

        // Changing Black cursor to White
        document.documentElement.style.setProperty('cursor', 'var(--cursor-black)');

        // Changing Black to white and vice-vera
        let blacks1 = document.querySelectorAll(".back-black");
        let blacks2 = document.querySelectorAll(".back-white");
        let blacks3 = document.querySelectorAll(".cross-black-pattern");
        let blacks4 = document.querySelectorAll(".dark-shadow");
        blacks1.forEach((element) => {
            element.classList.remove("back-black");
            element.classList.add("back-white");
        });
        blacks2.forEach((element) => {
            element.classList.remove("back-white");
            element.classList.add("back-black");
        });
        blacks3.forEach((element) => {
            element.classList.remove("cross-black-pattern");
            element.classList.add("cross-white-pattern");
        });
        blacks4.forEach((element) => {
            element.classList.remove("dark-shadow");
            element.classList.add("light-shadow");
        });
        
        let whites = document.querySelectorAll(".color-white");
        whites.forEach((element) => {
            element.classList.remove("color-white");
            element.classList.add("color-dark");
        });
        settingDark = true;
    }
    else{
        setDarkMode();
    }
}
// Change To Dark Mode
function setDarkMode(){
    if (settingDark == true){
        console.log("Setting Dark");

        // Changing Icon
        var lightModeIcon = document.getElementById("light-mode-svg");
        var darkModeIcon = document.getElementById("dark-mode-svg");
        lightModeIcon.style.display = "none";
        darkModeIcon.style.display = "flex";

        // Changing Black cursor to White
        document.documentElement.style.setProperty('cursor', 'var(--cursor-white)');

        // Changing Black to white and vice-vera
        let whites1 = document.querySelectorAll(".back-white");
        let whites2 = document.querySelectorAll(".back-black");
        let whites3 = document.querySelectorAll(".cross-white-pattern");
        let whites4 = document.querySelectorAll(".light-shadow");
        whites1.forEach((element) => {
            element.classList.remove("back-white");
            element.classList.add("back-black");
        });
        whites2.forEach((element) => {
            element.classList.remove("back-black");
            element.classList.add("back-white");
        });
        whites3.forEach((element) => {
            element.classList.remove("cross-white-pattern");
            element.classList.add("cross-black-pattern");
        });
        whites4.forEach((element) => {
            element.classList.remove("light-shadow");
            element.classList.add("dark-shadow");
        });

        let blacks = document.querySelectorAll(".color-dark");
        blacks.forEach((element) => {
            element.classList.remove("color-dark");
            element.classList.add("color-white");
        });
        settingDark = false;
    }
    else{
        setLightMode();
    }
}