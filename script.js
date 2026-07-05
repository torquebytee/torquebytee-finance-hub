// ==============================
// VARIABLES
// ==============================

// ==============================
// FUNCTIONS
// ==============================

// Mouse Glow
const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {

    if (!glow) return;

    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";

});

// ==============================
// FUTURE FUNCTIONS
// ==============================