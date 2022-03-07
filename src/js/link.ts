window.onload = init;

function init() {
    const menu = document.getElementById("nav-menu");

    for (var i = 0; i < menu!.children.length; i++) {
        if (menu!.children[i].getAttribute("href") == window.location.pathname)
            console.log(`Hit: ${menu!.children[i]}`);
    }
}