// Prüft auf Kapitelseiten, ob der Nutzer freigeschaltet ist
document.addEventListener("DOMContentLoaded", () => {
    const isUnlocked = localStorage.getItem("csr_unlocked") === "true";

    if (!isUnlocked) {
        alert("Please complete the registration form on the landing page first to access the thesis chapters.");
        window.location.href = "landing.html";
    }
});