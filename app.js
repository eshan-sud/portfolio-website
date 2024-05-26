var settingDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
var adjectives = [
    "",
    "Developer ",
    "Engineer ",
    "Problem Solver ",
    "Efficient "
];
var index = 0;
var isDeleting = false;
var text = "";
var speed = 100;

document.addEventListener("DOMContentLoaded", function () {
    // Select Light/Dark Mode Default Setting
    systemSettingDark == true ? setDarkMode() : setLightMode();

    // Change Title Property - On focus & blur tab
    const originalTitle = "Portfolio - Eshan Sud";
    window.addEventListener("blur", () => { document.title = "Come Back Soon..."; });
    window.addEventListener("focus", () => { document.title = originalTitle; });

    // Sticky Menu Header
    let lastScrollTop = 0;
    let headerVisible = true;
    window.addEventListener("scroll", () => {
        var menuHeader = document.getElementById("menu-header");
        var menuIconPanel = document.getElementById("sidebar");
        var currentScroll = document.documentElement.scrollTop;
        if (!iconPanelIsDisplayed) {
            if (currentScroll > lastScrollTop) {
                menuHeader.classList.add("hidden");
                menuIconPanel.style.position = "fixed";
                menuHeader.style.position = "fixed";
                headerVisible = false;
            } else if (!headerVisible) {
                menuHeader.classList.remove("hidden");
                menuHeader.style.position = "fixed";
            }
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
    });

    // Background Dot Animation
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    class Dot {
        constructor(x, y, radius, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
            this.velocity = {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            };
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            this.draw();
            this.x += this.velocity.x;
            this.y += this.velocity.y;
            if (this.x - this.radius <= 0 || this.x + this.radius >= canvas.width) this.velocity.x *= -1;
            if (this.y - this.radius <= 0 || this.y + this.radius >= canvas.height) this.velocity.y *= -1;
        }
    }
    const numDots = this.documentElement.offsetWidth / 10;
    const dots = [];
    for (let i = 0; i < numDots; i++) {
        const radius = Math.random() * 5 + 2;
        const x = Math.random() * (canvas.width - radius * 2) + radius;
        const y = Math.random() * (canvas.height - radius * 2) + radius;
        const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        dots.push(new Dot(x, y, radius, color));
    }
    function connectDots() {
        for (let i = 0; i < dots.length; i++) {
            for (let j = i + 1; j < dots.length; j++) {
                const dx = dots[i].x - dots[j].x;
                const dy = dots[i].y - dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
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
    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dots.forEach(dot => dot.update());
        connectDots();
    }
    animate();

    // Starting Hero Section Typing Text Animation
    setTimeout(type, speed);
});

// Typing Animation
function type() {
    const currentWord = adjectives[index];
    if (isDeleting) { text = currentWord.substring(0, text.length - 1); }
    else { text = currentWord.substring(0, text.length + 1); }
    document.getElementById("text").textContent = text || '\u200B';
    if (!isDeleting && text === currentWord) {
        isDeleting = true;
        speed = 100;
    } else if (isDeleting && text === "") {
        isDeleting = false;
        index = (index + 1) % adjectives.length;
        speed = 100;
    }
    setTimeout(type, speed);
}

// Scrolls To The About Container
function goToAboutContainer(id) {
    var aboutContainer = document.getElementById(id);
    window.scrollTo(0, aboutContainer.offsetTop);
}

// Toggle Hamburger Menu Icon
var iconPanelIsDisplayed = false;
function showMenu() {
    var sidebar = document.getElementById("sidebar");
    var header = document.getElementById("menu-header");
    sidebar.style.top = (header.offsetHeight) + "px";
    var hamburgerMenuIcon = document.getElementById("hamburger-menu-icon");
    var crossMenuIcon = document.getElementById("cross-menu-icon");
    if (iconPanelIsDisplayed == false) {
        hamburgerMenuIcon.style.display = "none";
        crossMenuIcon.style.display = "block";
        sidebar.style.width = "300px";
        iconPanelIsDisplayed = true;
    }
    else {
        hamburgerMenuIcon.style.display = "block";
        crossMenuIcon.style.display = "none";
        sidebar.style.width = "0";
        iconPanelIsDisplayed = false;
    }
}

// Change To Light Mode
function setLightMode() {
    if (settingDark == true) {
        setDarkMode();
        return;
    }
    // Changing Icon
    var lightModeIcon = document.getElementById("light-mode-svg");
    var darkModeIcon = document.getElementById("dark-mode-svg");
    lightModeIcon.style.display = "flex";
    darkModeIcon.style.display = "none";

    // Changing Light Back to Dark
    document.documentElement.style.setProperty('--rainbow-back', 'linear-gradient(124deg, #dedcdc, #e81d1d, #d6b64f, #e3e81d, #1dbfe8, #1ddde8, #a49efc, #e03636, #9c2929)');
    document.getElementById("introduction-greeting-text").style.color = "black";
    document.getElementById("introduction-text").style.color = "black";

    // Changing White cursor to Black
    document.documentElement.style.setProperty('cursor', 'var(--cursor-black)');
    document.documentElement.style.setProperty('--cursor-pointer', 'url("./resources/images/hand-cursor-black.png"), pointer');

    // Changing Black to white and vice-vera
    let blacks1 = document.querySelectorAll(".back-black-white");
    let blacks2 = document.querySelectorAll(".back-white-black");
    let blacks3 = document.querySelectorAll(".back-dark-white");
    let blacks4 = document.querySelectorAll(".dark-shadow");
    let blacks5 = document.querySelectorAll(".white-border-color");
    blacks1.forEach((element) => {
        element.classList.remove("back-black-white");
        element.classList.add("back-white-black");
    });
    blacks2.forEach((element) => {
        element.classList.remove("back-white-black");
        element.classList.add("back-black-white");
    });
    blacks3.forEach((element) => {
        element.classList.remove("back-dark-white");
        element.classList.add("back-white-dark");
    });
    blacks4.forEach((element) => {
        element.classList.remove("dark-shadow");
        element.classList.add("light-shadow");
    });
    blacks5.forEach((element) => {
        element.classList.remove("white-border-color");
        element.classList.add("black-border-color");
    });

    let whites = document.querySelectorAll(".color-white-dark");
    whites.forEach((element) => {
        element.classList.remove("color-white-dark");
        element.classList.add("color-dark-white");
    });

    document.querySelectorAll(".svg-item-links").forEach((element) => { element.style.fill = "black"; });

    let polkaDot = document.querySelectorAll(".white-polka-dot");
    polkaDot.forEach((element) => {
        element.classList.remove("white-polka-dot");
        element.classList.add("dark-polka-dot");
    });

    settingDark = true;
}
// Change To Dark Mode
function setDarkMode() {
    if (settingDark == false) {
        setLightMode();
        return;
    }

    // Changing Icon
    var lightModeIcon = document.getElementById("light-mode-svg");
    var darkModeIcon = document.getElementById("dark-mode-svg");
    lightModeIcon.style.display = "none";
    darkModeIcon.style.display = "flex";

    // Changing Dark Back to Light
    document.documentElement.style.setProperty('--rainbow-back', 'linear-gradient(124deg, #5b5656, #5f0a0a, #5f4e16, #5d5f0a, #0a4e5f, #0a5a5f, #0f059f, #600f0f, #3e1010)');
    document.getElementById("introduction-greeting-text").style.color = "white";
    document.getElementById("introduction-text").style.color = "white";

    // Changing Black cursor to White
    document.documentElement.style.setProperty("cursor", "var(--cursor-white)");
    document.documentElement.style.setProperty("--cursor-pointer", "url('./resources/images/hand-cursor-white.png'), pointer");

    // Changing Black to white and vice-vera
    let whites1 = document.querySelectorAll(".back-white-black");
    let whites2 = document.querySelectorAll(".back-black-white");
    let whites3 = document.querySelectorAll(".back-white-dark");
    let whites4 = document.querySelectorAll(".light-shadow");
    let whites5 = document.querySelectorAll(".black-border-color");
    whites1.forEach((element) => {
        element.classList.remove("back-white-black");
        element.classList.add("back-black-white");
    });
    whites2.forEach((element) => {
        element.classList.remove("back-black-white");
        element.classList.add("back-white-black");
    });
    whites3.forEach((element) => {
        element.classList.remove("back-white-dark");
        element.classList.add("back-dark-white");
    });
    whites4.forEach((element) => {
        element.classList.remove("light-shadow");
        element.classList.add("dark-shadow");
    });
    whites5.forEach((element) => {
        element.classList.remove("black-border-color");
        element.classList.add("white-border-color");
    });

    let blacks = document.querySelectorAll(".color-dark-white");
    blacks.forEach((element) => {
        element.classList.remove("color-dark-white");
        element.classList.add("color-white-dark");
    });

    document.querySelectorAll(".svg-item-links").forEach((element) => { element.style.fill = "white"; });

    let polkaDot = document.querySelectorAll(".dark-polka-dot");
    polkaDot.forEach((element) => {
        element.classList.remove("dark-polka-dot");
        element.classList.add("white-polka-dot");
    });

    settingDark = false;
}