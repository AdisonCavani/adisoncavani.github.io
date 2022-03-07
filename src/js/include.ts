function includeHTML() {
    var z, i, elmnt: Element, file, xhttp;
    // Loop through a collection of all HTML elements
    z = document.getElementsByTagName("include");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        // Search for elements with a certain atrribute
        file = elmnt.getAttribute("src");
        if (file) {
            // Make an HTTP request using the attribute value as the file name
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var div = document.createElement('div');
                        div.innerHTML = this.responseText;
                        elmnt.parentNode?.insertBefore(div.firstChild!, elmnt);
                        elmnt.parentNode?.removeChild(elmnt);
                    }
                    // Remove the attribute, and call this function once more
                    elmnt.removeAttribute("src");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            init();
            // Exit the function
            return;
        }
        init();
    }
}