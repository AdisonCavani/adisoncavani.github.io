"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMenu = void 0;
function toggleMenu() {
    var menuDiv = document.getElementById("menu");
    menuDiv.className = menuDiv.className === "res-menu"
        ? "res-menu-enabled"
        : "res-menu";
}
exports.toggleMenu = toggleMenu;
window.onclick = function (e) {
    if (!document.getElementById("menu-div").contains(e.target)) {
        document.getElementById("menu").className = "res-menu";
    }
};
