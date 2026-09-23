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

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();
            event.stopPropagation();

            var text = priorKnowledgeInput ? priorKnowledgeInput.value.trim() : "";
            var wordCount = text ? text.split(/\s+/).length : 0;

            if (wordCount > 100) {
                alert("Please limit your prior knowledge text to a maximum of 100 words.");
                return;
            }

            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                return;
            }

            var firstName = document.getElementById("firstName").value;
            var lastName = document.getElementById("lastName").value;
            var email = document.getElementById("emailAddress").value;
            var education = document.getElementById("educationLevel").value;
            var selectedRank = document.querySelector('input[name="csrRank"]:checked');
            var csrRank = selectedRank ? selectedRank.value : "0";

            var userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                education: education,
                csrRank: csrRank,
                priorKnowledge: text,
                unlockedAt: new Date().toISOString()
            };

            localStorage.setItem("csr_user_data", JSON.stringify(userData));
            localStorage.setItem("csr_unlocked", "true");

            unlockNavigation();
            downloadPDF();

            alert("Thank you, " + firstName + "! Access to all chapters is now unlocked. Your PDF download will start automatically.");
            window.location.href = "introduction.html";
        });
    }

    function unlockNavigation() {
        navLinks.forEach(function (link) {
            link.classList.remove("locked-nav", "disabled");
            link.classList.add("unlocked");
        });
    }

    function downloadPDF() {
        var link = document.createElement("a");
        link.href = "../assets/pdf/Studienarbeit_CSR.pdf";
        link.download = "Studienarbeit_CSR.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});