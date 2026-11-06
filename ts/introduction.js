document.addEventListener("DOMContentLoaded", function () {
    var isUnlocked = localStorage.getItem("csr_unlocked") === "true";

    if (!isUnlocked) {
        alert("Please complete the registration form on the landing page first to access the thesis chapters.");
        window.location.href = "landing.html";
    }
});