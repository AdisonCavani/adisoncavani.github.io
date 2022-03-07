window.onload = init;

function init() {
    const menu = document.getElementById("nav-menu");

    for (var i = 0; i < menu!.children.length; i++) {
        // console.log(menu!.children[i]);

        if (menu!.children[i].getAttribute("href") == window.location.pathname)
            console.log(`Hit: ${menu!.children[i]}`);

        console.log(menu!.children[i].getAttribute("href"));
    }
    console.log(window.location.pathname);
}