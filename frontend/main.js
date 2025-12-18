/* ============================================================
   SIDEBAR TOGGLE (common for all pages)
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
