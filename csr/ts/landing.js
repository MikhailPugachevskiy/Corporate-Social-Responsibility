document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("csrWelcomeForm");
    var priorKnowledgeInput = document.getElementById("priorKnowledge");
    var wordCountDisplay = document.getElementById("wordCountDisplay");
    var navLinks = document.querySelectorAll(".locked-nav");

    if (localStorage.getItem("csr_unlocked") === "true") {
        unlockNavigation();
    }

    if (priorKnowledgeInput && wordCountDisplay) {
        priorKnowledgeInput.addEventListener("input", function () {
            var text = priorKnowledgeInput.value.trim();
            var words = text ? text.split(/\s+/).length : 0;
            wordCountDisplay.textContent = words.toString();

            if (words > 100) {
                wordCountDisplay.classList.add("text-danger");
                wordCountDisplay.classList.remove("text-muted");
            } else {
                wordCountDisplay.classList.remove("text-danger");
                wordCountDisplay.classList.add("text-muted");
            }
        });
    }