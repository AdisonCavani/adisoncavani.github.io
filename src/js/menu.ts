// Toggle menu visibility on click
export function toggleMenu() {
    var menuDiv = document.getElementById("menu")!;
    menuDiv.className = menuDiv.className === "res-menu"
        ? "res-menu-enabled"
        : "res-menu";

    document.getElementById("menu-btn")?.classList.add("btn-menu-enabled");
}

// Hide menu if it losed focus
window.onclick = function (e) {
    if (!document.getElementById("menu-div")!.contains(e.target as Element)) {
        document.getElementById("menu")!.className = "res-menu";
        document.getElementById("menu-btn")?.classList.remove("btn-menu-enabled");
    }
};