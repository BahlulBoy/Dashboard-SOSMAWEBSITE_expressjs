function Alert(params) {
    alert("hello");
}

var navbar = document.querySelector(".sidebar-drawer").querySelectorAll("a");

navbar.forEach(
    element => {
        element.addEventListener("click", function () {
            navbar.forEach(nav => nav.classList.remove("item-selected"))

            this.classList.add("item-selected");
        })
    }
)
console.log(window.location.href);