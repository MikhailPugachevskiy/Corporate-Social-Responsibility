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
});