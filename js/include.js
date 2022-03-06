"use strict";
function includeHTML() {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("include");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("src");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                var _a, _b;
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        var div = document.createElement('div');
                        div.innerHTML = this.responseText;
                        (_a = elmnt.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(div.firstChild, elmnt);
                        (_b = elmnt.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(elmnt);
                    }
                    elmnt.removeAttribute("src");
                    includeHTML();
                }
            };
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}
