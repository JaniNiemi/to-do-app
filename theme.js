const toggle = document.querySelector("#toggle-mode");
const toggleIcon = document.querySelector("#toggle-icon");

// add data "theme" if checkbox is checked
function handleTheme(e) {
    if(e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleIcon.classList.replace("fa-sun", "fa-moon");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleIcon.classList.replace("fa-moon", "fa-sun");
    }
}

// event listeners
toggle.addEventListener("change", handleTheme);

// on page load
if(localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
    toggleIcon.classList.replace("fa-sun", "fa-moon");
    toggle.checked = true;
}