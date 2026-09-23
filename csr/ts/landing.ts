// Interface für die Formulardaten
interface CSRUserData {
    firstName: string;
    lastName: string;
    email: string;
    education: string;
    csrRank: string;
    priorKnowledge: string;
    unlockedAt: string;
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("csrWelcomeForm") as HTMLFormElement | null;
    const priorKnowledgeInput = document.getElementById("priorKnowledge") as HTMLTextAreaElement | null;
    const wordCountDisplay = document.getElementById("wordCountDisplay") as HTMLElement | null;
    const navLinks = document.querySelectorAll(".locked-nav");

    // 1. Prüfen, ob der Nutzer die Seite bereits freigeschaltet hat
    const isUnlocked = localStorage.getItem("csr_unlocked") === "true";
    if (isUnlocked) {
        unlockNavigation();
    }

    // 2. Wortzähler für das Textfeld (Maximal 100 Wörter)
    if (priorKnowledgeInput && wordCountDisplay) {
        priorKnowledgeInput.addEventListener("input", () => {
            const text = priorKnowledgeInput.value.trim();
            const words = text ? text.split(/\s+/).length : 0;

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

    // 3. Formular-Absendelogik
    if (form) {
        form.addEventListener("submit", (event: Event) => {
            event.preventDefault();
            event.stopPropagation();

            // Wortanzahl vor dem Absenden prüfen
            const text = priorKnowledgeInput ? priorKnowledgeInput.value.trim() : "";
            const wordCount = text ? text.split(/\s+/).length : 0;

            if (wordCount > 100) {
                alert("Please limit your prior knowledge text to a maximum of 100 words.");
                return;
            }

            // HTML5-Validierung prüfen
            if (!form.checkValidity()) {
                form.classList.add("was-validated");
                return;
            }

            // Formulardaten auslesen
            const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
            const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
            const email = (document.getElementById("emailAddress") as HTMLInputElement).value;
            const education = (document.getElementById("educationLevel") as HTMLSelectElement).value;

            const selectedRank = document.querySelector('input[name="csrRank"]:checked') as HTMLInputElement | null;
            const csrRank = selectedRank ? selectedRank.value : "0";

            const userData: CSRUserData = {
                firstName,
                lastName,
                email,
                education,
                csrRank,
                priorKnowledge: text,
                unlockedAt: new Date().toISOString()
            };

            // Daten lokal speichern & Status freischalten
            localStorage.setItem("csr_user_data", JSON.stringify(userData));
            localStorage.setItem("csr_unlocked", "true");

            // Navigation freischalten
            unlockNavigation();

            // Automatischer PDF-Download aus dem assets/pdf Ordner
            downloadPDF();

            // Erfolgsmeldung und Weiterleitung zu Kapitel 1
            alert(`Thank you, ${firstName}! Access to all chapters is now unlocked. Your PDF download will start automatically.`);
            window.location.href = "introduction.html";
        });
    }

    // Funktion zum Freischalten der Navigations-Links
    function unlockNavigation(): void {
        navLinks.forEach((link) => {
            link.classList.remove("locked-nav", "disabled");
            link.classList.add("unlocked");
        });
    }

    // Funktion zum Auslösen des PDF-Downloads
    function downloadPDF(): void {
        const link = document.createElement("a");
        link.href = "../assets/pdf/Studienarbeit_CSR.pdf";
        link.download = "Studienarbeit_CSR.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
});