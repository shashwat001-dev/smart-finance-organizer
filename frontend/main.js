/* ============================================================
   AUTH GUARD (RUNS ON EVERY PAGE THAT LOADS main.js)
   ============================================================ */
(function () {
    const token = localStorage.getItem("token");

    const publicPages = ["login.html", "register.html"];
    const currentPage = window.location.pathname.split("/").pop();

    // If user is NOT logged in and tries to open protected page
    if (!token && !publicPages.includes(currentPage)) {
        window.location.replace("login.html");
    }

    // If user IS logged in and opens login/register
    if (token && publicPages.includes(currentPage)) {
        window.location.replace("dashboard.html");
    }
})();

/* ============================================================
   SIDEBAR TOGGLE (your existing code)
   ============================================================ */
const toggleBtn = document.getElementById("toggleSidebarBtn");
const sidebarEl = document.querySelector(".sidebar");
const contentEl = document.querySelector(".content");
const navbarEl = document.querySelector(".navbar");

if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        sidebarEl.classList.toggle("collapsed");
        contentEl.classList.toggle("shifted");
        navbarEl.classList.toggle("shifted");
    });
}
