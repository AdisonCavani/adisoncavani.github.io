"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMenu = void 0;
function toggleMenu() {
    var _a;
    const menuDiv = document.getElementById("menu");
    menuDiv.className = menuDiv.className === "res-menu"
        ? "res-menu-enabled"
        : "res-menu";
    (_a = document.getElementById("menu-btn")) === null || _a === void 0 ? void 0 : _a.classList.add("btn-menu-enabled");
}
exports.toggleMenu = toggleMenu;
window.onclick = function (e) {
    var _a;
    if (!document.getElementById("menu-div").contains(e.target)) {
        document.getElementById("menu").className = "res-menu";
        (_a = document.getElementById("menu-btn")) === null || _a === void 0 ? void 0 : _a.classList.remove("btn-menu-enabled");
    }
};
