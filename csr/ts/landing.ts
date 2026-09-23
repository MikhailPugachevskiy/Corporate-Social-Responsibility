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




});