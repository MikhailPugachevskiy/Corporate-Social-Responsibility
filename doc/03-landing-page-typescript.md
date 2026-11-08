# 3. Landing Page (TypeScript): Wortzähler, Formular und Freischaltung

Die Datei `ts/landing.ts` bringt die Landing Page zum Leben. Sie macht vier Dinge:

1. prüft beim Laden, ob der Nutzer schon **freigeschaltet** ist,
2. zählt beim Tippen die **Wörter** im Textfeld (maximal 100),
3. **prüft und verarbeitet** das Formular beim Absenden,
4. **schaltet die Navigation frei** und löst den **PDF-Download** aus.

Dieses Kapitel ist das wichtigste für das Verständnis von **TypeScript, DOM und Ereignissen**. Der Code ist unten in vier Teilen mit den **originalen Zeilennummern** gezeigt.

---

## Die Idee: Das DOM

Der Browser baut aus dem HTML einen Baum aus Objekten, das **DOM** (Document Object Model). JavaScript kann diese Objekte finden, lesen und ändern. Die wichtigsten Werkzeuge:

| Werkzeug | Bedeutung |
| --- | --- |
| `document.getElementById("x")` | findet das Element mit `id="x"` |
| `document.querySelectorAll(".x")` | findet alle Elemente mit der Klasse `x` |
| `element.addEventListener("click", funktion)` | ruft die Funktion auf, wenn das Ereignis eintritt |
| `element.classList.add/remove("x")` | fügt eine CSS-Klasse hinzu oder entfernt sie |
| `element.textContent = "…"` | ändert den Text eines Elements |

---

## Datei: `ts/landing.ts`

### Teil 1: Interface, Start und Prüfung des Status (Z. 1–22)

```ts
  1 | // Interface für die Formulardaten
  2 | interface CSRUserData {
  3 |     firstName: string;
  4 |     lastName: string;
  5 |     email: string;
  6 |     education: string;
  7 |     csrRank: string;
  8 |     priorKnowledge: string;
  9 |     unlockedAt: string;
 10 | }
 11 |
 12 | document.addEventListener("DOMContentLoaded", () => {
 13 |     const form = document.getElementById("csrWelcomeForm") as HTMLFormElement | null;
 14 |     const priorKnowledgeInput = document.getElementById("priorKnowledge") as HTMLTextAreaElement | null;
 15 |     const wordCountDisplay = document.getElementById("wordCountDisplay") as HTMLElement | null;
 16 |     const navLinks = document.querySelectorAll(".locked-nav");
 17 |
 18 |     // 1. Prüfen, ob der Nutzer die Seite bereits freigeschaltet hat
 19 |     const isUnlocked = localStorage.getItem("csr_unlocked") === "true";
 20 |     if (isUnlocked) {
 21 |         unlockNavigation();
 22 |     }
```

- **Z. 2–10** Ein **Interface** beschreibt die **Form** eines Objekts: Welche Felder hat es und welchen Typ? `CSRUserData` sagt: „Ein Datensatz hat Vorname, Nachname, E-Mail, Bildung, Skalenwert, Vorwissen und einen Zeitstempel, alles als Text (`string`).“ Interfaces gibt es nur in TypeScript. Im übersetzten JavaScript sind sie verschwunden.
- **Z. 12** `DOMContentLoaded` ist ein Ereignis des Browsers: „Das HTML ist vollständig geladen und als DOM verfügbar.“ Erst jetzt dürfen die Elemente gesucht werden. Die Funktion ist eine **Pfeilfunktion** (`() => { … }`).
- **Z. 13** `document.getElementById(...)` liefert ein Element **oder `null`**, wenn es keines mit dieser ID gibt. Für TypeScript ist der Rückgabetyp deshalb nur `HTMLElement | null`. Mit `as HTMLFormElement | null` sagt man TypeScript: „Ich weiß mehr als du, das ist ein Formular (oder nicht vorhanden).“ Das nennt man eine **Typ-Zusicherung** (*type assertion*). Erst dadurch kennt TypeScript Eigenschaften wie `checkValidity()`.
- **Z. 14** Dasselbe für das Textfeld: `HTMLTextAreaElement` hat die Eigenschaft `value`.
- **Z. 15** Der Zähler ist nur ein `<span>`, daher reicht der allgemeine Typ `HTMLElement`.
- **Z. 16** `querySelectorAll(".locked-nav")` findet **alle** Navigationslinks mit dieser Klasse (eine `NodeList`, eine Art Liste).
- **Z. 19** Liest den gespeicherten Status. `localStorage` speichert **nur Text**, deshalb steht dort der String `"true"`, kein Wahrheitswert. Der Vergleich `=== "true"` macht daraus ein echtes `true` oder `false`.
- **Z. 20–22** Wenn der Nutzer schon freigeschaltet ist, werden die Links sofort entsperrt. Die Funktion `unlockNavigation` steht weiter unten (Z. 99). Das funktioniert, weil Funktionsdeklarationen in JavaScript **gehoistet** werden: Sie sind im gesamten umgebenden Block schon vor ihrer Zeile verfügbar.

### Teil 2: Der Wortzähler (Z. 24–40)

```ts
 24 |     // 2. Wortzähler für das Textfeld (Maximal 100 Wörter)
 25 |     if (priorKnowledgeInput && wordCountDisplay) {
 26 |         priorKnowledgeInput.addEventListener("input", () => {
 27 |             const text = priorKnowledgeInput.value.trim();
 28 |             const words = text ? text.split(/\s+/).length : 0;
 29 |
 30 |             wordCountDisplay.textContent = words.toString();
 31 |
 32 |             if (words > 100) {
 33 |                 wordCountDisplay.classList.add("text-danger");
 34 |                 wordCountDisplay.classList.remove("text-muted");
 35 |             } else {
 36 |                 wordCountDisplay.classList.remove("text-danger");
 37 |                 wordCountDisplay.classList.add("text-muted");
 38 |             }
 39 |         });
 40 |     }
```

- **Z. 25** Die Prüfung `if (a && b)` ist wichtig: Beide Elemente können `null` sein. Erst innerhalb des `if` weiß TypeScript, dass sie vorhanden sind (**Type Narrowing**), und erlaubt den Zugriff auf `.value` und `.textContent`.
- **Z. 26** Das Ereignis `input` wird bei **jeder Änderung** im Feld ausgelöst, also nach jedem Tastendruck, auch beim Einfügen per Maus.
- **Z. 27** `.value` ist der aktuelle Text, `.trim()` entfernt Leerzeichen am Anfang und Ende.
- **Z. 28** Die Wortanzahl: Der Text wird mit `split(/\s+/)` an jeder Folge von Leerzeichen, Tabs oder Zeilenumbrüchen getrennt (`/\s+/` ist ein regulärer Ausdruck), und `.length` zählt die Teile. Bei einem leeren Text würde `"".split(...)` ein Array mit **einem** leeren Eintrag liefern, deshalb gibt es die Abfrage `text ? … : 0`.
- **Z. 30** Schreibt die Zahl in das `<span>`. `textContent` erwartet Text, daher `.toString()`.
- **Z. 32–38** Über 100 Wörter wird die Zahl rot (`text-danger`, Bootstrap-Klasse), sonst grau (`text-muted`). `classList.add` und `.remove` tauschen die Farbklasse aus.

### Teil 3: Das Formular absenden (Z. 42–96)

```ts
 42 |     // 3. Formular-Absendelogik
 43 |     if (form) {
 44 |         form.addEventListener("submit", (event: Event) => {
 45 |             event.preventDefault();
 46 |             event.stopPropagation();
 47 |
 48 |             // Wortanzahl vor dem Absenden prüfen
 49 |             const text = priorKnowledgeInput ? priorKnowledgeInput.value.trim() : "";
 50 |             const wordCount = text ? text.split(/\s+/).length : 0;
 51 |
 52 |             if (wordCount > 100) {
 53 |                 alert("Please limit your prior knowledge text to a maximum of 100 words.");
 54 |                 return;
 55 |             }
 56 |
 57 |             // HTML5-Validierung prüfen
 58 |             if (!form.checkValidity()) {
 59 |                 form.classList.add("was-validated");
 60 |                 return;
 61 |             }
 62 |
 63 |             // Formulardaten auslesen
 64 |             const firstName = (document.getElementById("firstName") as HTMLInputElement).value;
 65 |             const lastName = (document.getElementById("lastName") as HTMLInputElement).value;
 66 |             const email = (document.getElementById("emailAddress") as HTMLInputElement).value;
 67 |             const education = (document.getElementById("educationLevel") as HTMLSelectElement).value;
 68 |
 69 |             const selectedRank = document.querySelector('input[name="csrRank"]:checked') as HTMLInputElement | null;
 70 |             const csrRank = selectedRank ? selectedRank.value : "0";
 71 |
 72 |             const userData: CSRUserData = {
 73 |                 firstName,
 74 |                 lastName,
 75 |                 email,
 76 |                 education,
 77 |                 csrRank,
 78 |                 priorKnowledge: text,
 79 |                 unlockedAt: new Date().toISOString()
 80 |             };
 81 |
 82 |             // Daten lokal speichern & Status freischalten
 83 |             localStorage.setItem("csr_user_data", JSON.stringify(userData));
 84 |             localStorage.setItem("csr_unlocked", "true");
 85 |
 86 |             // Navigation freischalten
 87 |             unlockNavigation();
 88 |
 89 |             // Automatischer PDF-Download aus dem assets/pdf Ordner
 90 |             downloadPDF();
 91 |
 92 |             // Erfolgsmeldung und Weiterleitung zu Kapitel 1
 93 |             alert(`Thank you, ${firstName}! Access to all chapters is now unlocked. Your PDF download will start automatically.`);
 94 |             window.location.href = "introduction.html";
 95 |         });
 96 |     }
```

- **Z. 44** Das Ereignis `submit` tritt auf, wenn der Absende-Button geklickt oder im Formular Enter gedrückt wird. `event: Event` gibt dem Parameter einen Typ.
- **Z. 45** `event.preventDefault()` verhindert das **Standardverhalten** des Browsers. Normalerweise würde ein Formular beim Absenden die Seite neu laden. Hier soll das Skript alles selbst steuern.
- **Z. 46** `stopPropagation()` verhindert, dass das Ereignis an übergeordnete Elemente weitergereicht wird. Hier hat das keine praktische Wirkung (es gibt keine anderen Zuhörer), schadet aber nicht.
- **Z. 49–50** Die Wortanzahl wird beim Absenden **noch einmal** geprüft. Auf den Wortzähler allein darf man sich nicht verlassen, weil er nur eine Anzeige ist.
- **Z. 52–55** Bei mehr als 100 Wörtern erscheint eine Meldung (`alert`), und `return` bricht die Funktion ab: Es wird nichts gespeichert.
- **Z. 58–61** `form.checkValidity()` prüft alle HTML-Regeln (`required`, `type="email"`). Ist etwas ungültig, wird die Bootstrap-Klasse `was-validated` gesetzt: Bootstrap färbt dann gültige Felder grün und ungültige rot. Danach wird abgebrochen.
- **Z. 64–67** Liest die Werte aus den Feldern. Die Klammern `(document.getElementById(…) as HTMLInputElement).value` sind nötig, damit die Zusicherung **vor** dem Zugriff auf `.value` gilt. Das Dropdown ist ein `HTMLSelectElement`.
- **Z. 69** `querySelector('input[name="csrRank"]:checked')` sucht den **ausgewählten** Knopf der Radio-Gruppe (die Pseudoklasse `:checked`). Wurde keiner gewählt, ist das Ergebnis `null`.
- **Z. 70** Ist nichts gewählt, wird `"0"` angenommen (in der Praxis nicht möglich, weil `required` das verhindert; es ist eine zusätzliche Absicherung).
- **Z. 72–80** Das Objekt wird mit dem Interface `CSRUserData` **typisiert**. TypeScript prüft jetzt, dass alle Felder vorhanden sind und den richtigen Typ haben. `firstName,` ist die Kurzschreibweise für `firstName: firstName` (*Property Shorthand*). `new Date().toISOString()` erzeugt einen Zeitstempel im Format `2026-11-04T10:15:00.000Z`.
- **Z. 83** `JSON.stringify` wandelt das Objekt in Text um, denn `localStorage` speichert nur Text.
- **Z. 84** Der Freischalt-Status: der Text `"true"`. Diesen Wert prüfen die Kapitelseiten (Kapitel 4).
- **Z. 87–90** Entsperrt die Navigation und löst den Download aus.
- **Z. 93** Ein **Template Literal** (Backticks) setzt den Namen in den Text ein: `${firstName}`.
- **Z. 94** `window.location.href = …` lädt eine andere Seite, hier das erste Kapitel.

> **Hinweis zum Datenschutz:** Name, E-Mail-Adresse und die übrigen Angaben werden nur im `localStorage` des eigenen Browsers gespeichert und **nirgendwohin gesendet**. Die Website hat keinen Server. Die E-Mail-Adresse wird derzeit also nicht verwendet. Das sollte man in einem Gespräch ehrlich so beschreiben: Das Formular simuliert eine Registrierung.

### Teil 4: Die Hilfsfunktionen (Z. 98–115)

```ts
 98 |     // Funktion zum Freischalten der Navigations-Links
 99 |     function unlockNavigation(): void {
100 |         navLinks.forEach((link) => {
101 |             link.classList.remove("locked-nav", "disabled");
102 |             link.classList.add("unlocked");
103 |         });
104 |     }
105 |
106 |     // Funktion zum Auslösen des PDF-Downloads
107 |     function downloadPDF(): void {
108 |         const link = document.createElement("a");
109 |         link.href = "../assets/pdf/Studienarbeit.pdf";
110 |         link.download = "Studienarbeit_CSR.pdf";
111 |         document.body.appendChild(link);
112 |         link.click();
113 |         document.body.removeChild(link);
114 |     }
115 | });
```

- **Z. 99** `: void` sagt: Die Funktion gibt nichts zurück. Der Rückgabetyp wird hier ausdrücklich angegeben.
- **Z. 100** `navLinks.forEach(...)` geht jeden gefundenen Link durch.
- **Z. 101–102** Entfernt die Klassen `locked-nav` und `disabled` (der Link wird klickbar) und fügt `unlocked` hinzu. `landing.css` gibt dieser Klasse die weiße Farbe und den Hover-Effekt (Kapitel 6).
- **Z. 108** `document.createElement("a")` erzeugt einen **neuen Link im Speicher**, der noch nicht auf der Seite steht.
- **Z. 109** Das Ziel: das PDF im Ordner `assets/pdf/`. Der Dateiname muss **genau** dem Namen im Projekt entsprechen (siehe Kapitel 7).
- **Z. 110** Das Attribut `download` sagt dem Browser: „Datei speichern, nicht im Browser öffnen“, und legt den Namen der heruntergeladenen Datei fest.
- **Z. 111–113** Der Link wird kurz auf die Seite gesetzt, **per Code angeklickt** (`link.click()`) und wieder entfernt. Manche Browser reagieren nur auf Links, die Teil der Seite sind.
- **Z. 115** Schließt die Funktion aus Z. 12.

---

## Von TypeScript zu JavaScript

Die HTML-Seite lädt nicht `landing.ts`, sondern die übersetzte Datei `landing.js`. Hier der Vergleich:

```js
  1 | document.addEventListener("DOMContentLoaded", function () {
  2 |     var form = document.getElementById("csrWelcomeForm");
  3 |     var priorKnowledgeInput = document.getElementById("priorKnowledge");
  4 |     var wordCountDisplay = document.getElementById("wordCountDisplay");
  5 |     var navLinks = document.querySelectorAll(".locked-nav");
```

| TypeScript (`landing.ts`) | JavaScript (`landing.js`) |
| --- | --- |
| `interface CSRUserData { … }` | entfällt (Typen existieren zur Laufzeit nicht) |
| `() => { … }` (Pfeilfunktion) | `function () { … }` |
| `const form = … as HTMLFormElement \| null` | `var form = …` (Typ-Zusicherung entfällt) |
| Template Literal `` `Thank you, ${firstName}!` `` | `"Thank you, " + firstName + "!"` |

Die `.js`-Datei ist im älteren Stil (ES5) geschrieben, damit sie in möglichst allen Browsern läuft. Die Logik ist gleich. Zusätzlich fehlen in `landing.js` die Kommentare.

---

## Typische Fragen

**Wozu ein Interface (`CSRUserData`)?**
Es dokumentiert die Struktur der gespeicherten Daten und lässt den Compiler Tippfehler und fehlende Felder finden, etwa wenn man `emial` statt `email` schreibt. Zur Laufzeit gibt es keine Prüfung, das Interface hilft nur beim Entwickeln.

**Was bedeutet `as HTMLFormElement | null`?**
`as` ist eine Typ-Zusicherung: Der Entwickler sagt dem Compiler, welchen genaueren Typ ein Wert hat. `| null` heißt „oder nichts“, weil das Element fehlen könnte. Danach muss man auf `null` prüfen (`if (form)`), sonst verweigert TypeScript den Zugriff.

**Was ist der Unterschied zwischen `const` und `var`?**
`const` ist eine Variable, die man nicht neu zuweisen kann, und sie gilt nur im Block. `var` ist die ältere Variante mit Gültigkeit in der ganzen Funktion. Moderner Code nutzt `const` und `let`.

**Warum prüft man die Wortanzahl zweimal (Zähler und beim Absenden)?**
Der Zähler ist nur eine Anzeige für den Nutzer. Eine Prüfung muss dort stattfinden, wo die Daten verarbeitet werden. Außerdem kann man Texte per Einfügen verändern, ohne dass der Nutzer den Zähler beachtet.

**Warum `localStorage` und kein Server?**
Es gibt kein Backend. Für eine Präsentation der Studienarbeit reicht eine rein clientseitige Lösung. Der Nachteil: Die Daten liegen nur im Browser und können dort jederzeit verändert oder gelöscht werden (Kapitel 4).

**Warum werden Funktionen wie `unlockNavigation` erst unten definiert, aber oben schon aufgerufen?**
Hoisting: Funktionsdeklarationen werden beim Ausführen des Blocks „nach oben gezogen“. Ein Aufruf vor der Deklaration ist deshalb erlaubt. (Bei `const`-Pfeilfunktionen wäre das nicht möglich.)

---

## Mach es selbst

1. Ändere das Limit von `100` auf `20` (Z. 32 und Z. 52). Kompiliere die Datei neu (`npx tsc ts/landing.ts`). Was passiert beim Tippen? Und was passiert, wenn du die `.js`-Datei **nicht** neu erzeugst?
2. Öffne nach dem Absenden die Entwicklerwerkzeuge → **Application** → **Local Storage**. Welche beiden Einträge findest du, und wie sieht `csr_user_data` aus?
3. Lösche `csr_unlocked` im Local Storage und lade die Landing Page neu. Welcher Zustand zeigt sich in der Navigation?
4. Setze in Z. 59 statt `was-validated` einen `alert("Please fill in all required fields.")`. Wie fühlt sich das für Nutzer an im Vergleich zu den farbigen Feldern?
5. Füge dem Interface ein Feld `newsletter: boolean` hinzu, ohne es in `userData` zu setzen. Was meldet der Compiler?
