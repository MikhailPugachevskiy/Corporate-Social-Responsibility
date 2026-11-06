# 2. Landing Page (HTML): Hero und Registrierungsformular

Die Landing Page ist die wichtigste Seite des Projekts: Hier beginnt die Reise der Besucher. Sie besteht aus zwei Teilen:

1. dem **Hero-Bereich** (große Überschrift mit Button),
2. dem **Registrierungsformular** in einer Karte.

In diesem Kapitel geht es um den **HTML-Aufbau** und die **Bootstrap-Klassen**. Die Programmlogik (Wortzähler, Absenden, Freischalten) folgt in Kapitel 3.

> **Hinweis:** `landing.html` hat 192 Zeilen. Der Kopf (Z. 1–15) und die Navigation (Z. 18–50) sind in den Kapiteln 0 und 1 erklärt. Hier steht der Inhalt im `<main>` (Z. 52–183) mit den **originalen Zeilennummern**. Die drei weiteren Auswahlfelder der Skala (Z. 130–158) sind zusammengefasst.

---

## Datei: `csr/html/landing.html`

### Teil 1: Der Hero-Bereich (Z. 52–61)

```html
 52 |     <main role="main">
 53 |         <!-- Hero Section with Paper Title -->
 54 |         <div class="container-fluid hero d-flex align-items-center justify-content-center">
 55 |             <div class="text-center text-white px-3">
 56 |                 <h1 class="display-3 font-weight-bold mb-2">Fundamentals of Corporate Social Responsibility</h1>
 57 |                 <p class="lead mb-4">An interactive web presentation based on the academic research paper by Mikhail
 58 |                     Pugachevskiy</p>
 59 |                 <a href="#registration-section" class="btn btn-lg btn-light font-weight-bold shadow-sm">Get Started</a>
 60 |             </div>
 61 |         </div>
```

- **Z. 52** `<main>` ist das semantische Element für den Hauptinhalt. `role="main"` ist hier redundant (das Element hat diese Rolle schon von sich aus), schadet aber nicht.
- **Z. 54** Der Hero-Bereich:
  - `container-fluid` ist ein Container über die **volle Breite** des Fensters.
  - `hero` ist eine **eigene Klasse** aus `landing.css` (Farbverlauf, Mindesthöhe).
  - `d-flex align-items-center justify-content-center` zentriert den Inhalt waagerecht und senkrecht (Flexbox).
- **Z. 55** `text-center text-white px-3`: zentrierter, weißer Text mit seitlichem Abstand, damit er auf dem Handy nicht am Rand klebt.
- **Z. 56** Die Hauptüberschrift. `display-3` ist eine Bootstrap-Klasse für sehr große, „plakative“ Überschriften. Jede Seite hat genau eine `<h1>`.
- **Z. 57** `lead` ist ein Einleitungstext (größer und heller als normaler Text).
- **Z. 59** Ein Link, der wie ein Button aussieht (`btn btn-lg btn-light`). `href="#registration-section"` ist ein **Anker-Link**: Er scrollt zu dem Element mit der ID `registration-section` auf derselben Seite (siehe Z. 64).

### Teil 2: Die Karte und der Formularbeginn (Z. 63–95)

```html
 63 |         <!-- Visitor Registration & Survey Form -->
 64 |         <div class="container my-5" id="registration-section">
 65 |             <div class="row justify-content-center">
 66 |                 <div class="col-lg-8">
 67 |                     <div class="card shadow-lg border-0 rounded-lg">
 68 |                         <div class="card-body p-4 p-md-5">
 69 |                             <h2 class="card-title text-center font-weight-bold mb-3">Welcome Reader!</h2>
 70 |                             <p class="text-muted text-center mb-4">
 71 |                                 Please fill out the form below to unlock access to all thesis chapters and automatically
 72 |                                 receive/download the full PDF paper.
 73 |                             </p>
 74 |
 75 |                             <form id="csrWelcomeForm" novalidate>
 76 |                                 <!-- First and Last Name Inputs -->
 77 |                                 <div class="form-row">
 78 |                                     <div class="form-group col-md-6">
 79 |                                         <label for="firstName" class="font-weight-bold">First Name *</label>
 80 |                                         <input type="text" class="form-control" id="firstName" required
 81 |                                             placeholder="e.g. John">
 82 |                                     </div>
 83 |                                     <div class="form-group col-md-6">
 84 |                                         <label for="lastName" class="font-weight-bold">Last Name *</label>
 85 |                                         <input type="text" class="form-control" id="lastName" required
 86 |                                             placeholder="e.g. Doe">
 87 |                                     </div>
 88 |                                 </div>
 89 |
 90 |                                 <!-- Email Input -->
 91 |                                 <div class="form-group">
 92 |                                     <label for="emailAddress" class="font-weight-bold">Email Address *</label>
 93 |                                     <input type="email" class="form-control" id="emailAddress" required
 94 |                                         placeholder="e.g. john.doe@example.com">
 95 |                                 </div>
```

- **Z. 64** Der Container hat die ID `registration-section`. Das ist das Ziel des Buttons aus Z. 59. `my-5` gibt vertikalen Abstand.
- **Z. 65–66** **Das Bootstrap-Raster:** Eine `row` enthält Spalten. `col-lg-8` bedeutet: Auf großen Bildschirmen nimmt die Karte 8 von 12 Spalten ein, auf kleineren die volle Breite. `justify-content-center` zentriert sie.
- **Z. 67** Eine Bootstrap-**Karte** (`card`) mit großem Schatten (`shadow-lg`), ohne Rahmen (`border-0`) und mit abgerundeten Ecken.
- **Z. 68** `card-body` ist der Innenbereich. `p-4 p-md-5` heißt: Innenabstand 4, ab mittlerer Breite 5.
- **Z. 75** Das Formular. `id="csrWelcomeForm"` ist der Name, unter dem TypeScript es findet. `novalidate` schaltet die **automatischen Fehlermeldungen des Browsers aus**, weil die Prüfung selbst gesteuert wird (siehe Typische Fragen).
- **Z. 77–88** `form-row` legt zwei Felder nebeneinander. `col-md-6` heißt: ab mittlerer Breite je die Hälfte, auf dem Handy untereinander.
- **Z. 79–80** `<label for="firstName">` gehört zu `<input id="firstName">`. Der Zusammenhang entsteht über `for` und `id`. Ein Klick auf das Label fokussiert das Feld, und Screenreader lesen das Label vor.
- **Z. 80** `required` macht das Feld zum Pflichtfeld. `form-control` ist die Bootstrap-Klasse für ein gestaltetes Eingabefeld. `placeholder` zeigt einen Beispieltext, der verschwindet, sobald man tippt.
- **Z. 93** `type="email"` sorgt dafür, dass der Browser prüft, ob die Eingabe wie eine E-Mail-Adresse aussieht (`…@…`).

### Teil 3: Das Auswahlfeld (Z. 97–114)

```html
 97 |                                 <!-- Highest Educational Level Dropdown -->
 98 |                                 <div class="form-group">
 99 |                                     <label for="educationLevel" class="font-weight-bold">Highest Level of Education
100 |                                         *</label>
101 |                                     <select class="form-control" id="educationLevel" required>
102 |                                         <option value="" disabled selected>Please select your qualification...</option>
103 |                                         <option value="Hauptschulabschluss">Secondary School Certificate
104 |                                             (Hauptschulabschluss)</option>
105 |                                         <option value="Realschulabschluss">Intermediate School Certificate
106 |                                             (Realschulabschluss)</option>
107 |                                         <option value="Abitur">High School Diploma (Abitur)</option>
108 |                                         <option value="Berufsausbildung">Vocational Training (Berufsausbildung)</option>
109 |                                         <option value="Bachelor">Bachelor's Degree</option>
110 |                                         <option value="Diplom">Diploma Degree (Diplom)</option>
111 |                                         <option value="Master">Master's Degree</option>
112 |                                         <option value="PhD">Doctorate / PhD</option>
113 |                                     </select>
114 |                                 </div>
```

- **Z. 101** `<select>` ist das Dropdown. `required` verlangt eine Auswahl.
- **Z. 102** Der **Platzhalter-Trick**: Die erste Option hat einen leeren Wert (`value=""`), ist `disabled` (nicht wählbar) und `selected` (vorausgewählt). Dadurch zeigt das Dropdown zuerst den Hinweistext. Weil der Wert leer ist, gilt das Pflichtfeld als **nicht ausgefüllt**, bis der Nutzer eine echte Option wählt.
- **Z. 103–112** Jede Option hat einen `value` (was gespeichert wird, z. B. `Abitur`) und einen sichtbaren Text (was der Nutzer liest). Die deutschen Abschlüsse stehen mit englischer Erklärung da, weil die Besucher aus dem deutschen Bildungssystem kommen können.

### Teil 4: Die Skala mit Auswahlknöpfen (Z. 116–128)

```html
116 |                                 <!-- CSR Familiarity Ranking Scale (0 to 3) -->
117 |                                 <div class="form-group my-4">
118 |                                     <label class="font-weight-bold d-block mb-2">How familiar are you with Corporate
119 |                                         Social Responsibility? *</label>
120 |                                     <div class="row text-center">
121 |                                         <div class="col-3">
122 |                                             <div class="custom-control custom-radio">
123 |                                                 <input type="radio" id="rank0" name="csrRank" value="0"
124 |                                                     class="custom-control-input" required>
125 |                                                 <label class="custom-control-label d-block text-small" for="rank0">
126 |                                                     <strong>0</strong><br><span class="text-muted">No knowledge</span>
127 |                                                 </label>
128 |                                             </div>
```

- **Z. 120–121** Vier Spalten mit `col-3` (je 3 von 12) ergeben eine gleichmäßige Skala von 0 bis 3.
- **Z. 122** `custom-control custom-radio` ist Bootstrap-Stil für gestaltete Auswahlknöpfe (Radio Buttons).
- **Z. 123** **Wichtig:** Alle vier Knöpfe haben denselben `name="csrRank"`. Das macht sie zu einer **Gruppe**, aus der man genau einen wählen kann. Die `id`s (`rank0` bis `rank3`) sind dagegen verschieden, weil jedes Label zu genau einem Knopf gehört.
- **Z. 124** `required` steht **nur beim ersten** Knopf. Bei Radio-Gruppen reicht das: Die Pflicht gilt für die ganze Gruppe.
- **Z. 125** `text-small` ist keine Bootstrap-Klasse, sondern eine **eigene Klasse** aus `landing.css` (kleinere Schrift, Kapitel 6).
- **Z. 130–158** Die Auswahlknöpfe 1 („Slightly familiar“), 2 („Sufficient knowledge“) und 3 („Specialist“) sind genauso aufgebaut.

### Teil 5: Textfeld und Absenden (Z. 162–177)

```html
162 |                                 <!-- CSR Prior Knowledge Text Area with Word Limit -->
163 |                                 <div class="form-group">
164 |                                     <label for="priorKnowledge" class="font-weight-bold">Describe your prior knowledge
165 |                                         about CSR:</label>
166 |                                     <textarea class="form-control" id="priorKnowledge" rows="4"
167 |                                         placeholder="Briefly state what you know or expect regarding CSR..."></textarea>
168 |                                     <small class="form-text text-muted text-right">
169 |                                         Word count: <span id="wordCountDisplay">0</span> / 100 words max
170 |                                     </small>
171 |                                 </div>
172 |
173 |                                 <!-- Submit Button -->
174 |                                 <button type="submit" class="btn btn-primary btn-block btn-lg font-weight-bold mt-4">
175 |                                     Submit & Access Full Thesis
176 |                                 </button>
177 |                             </form>
```

- **Z. 166** `<textarea>` ist ein mehrzeiliges Textfeld (`rows="4"` = vier Zeilen hoch). Es ist **kein** Pflichtfeld.
- **Z. 169** `<span id="wordCountDisplay">0</span>`: Hier zeigt TypeScript die aktuelle Wortanzahl an. Die ID ist die Verbindung zwischen HTML und Skript.
- **Z. 174** `type="submit"` löst das `submit`-Ereignis des Formulars aus. `btn-block` macht den Button so breit wie die Karte.

---

## Typische Fragen

**Warum steht `novalidate` am Formular?**
Der Browser würde sonst beim Absenden selbst Fehlermeldungen in seinem eigenen Stil anzeigen. Mit `novalidate` übernimmt das Skript die Kontrolle: Es prüft mit `checkValidity()` und schaltet bei einem Fehler Bootstraps Klasse `was-validated` ein, die die Felder rot oder grün markiert (Kapitel 3).

**Warum haben die Felder eine `id`, aber kein `name`-Attribut?**
Die Daten werden nicht vom Browser an einen Server geschickt (kein `action`), sondern vom Skript per `document.getElementById(...)` ausgelesen. Dafür genügt die `id`. Nur die Radio-Gruppe braucht einen `name`, weil der Browser darüber erkennt, dass die Knöpfe zusammengehören.

**Was ist der Unterschied zwischen `id` und `class`?**
Eine `id` ist **eindeutig** pro Seite (ein Element) und dient oft als Ziel für Skripte oder Anker-Links. Eine `class` kann beliebig oft verwendet werden und dient dem Styling.

**Wofür ist das Sternchen `*` in den Labels?**
Es markiert Pflichtfelder für die Nutzer. Das technische `required` steckt im Eingabefeld.

**Warum gibt es zwei Möglichkeiten, die Seite für kleine Bildschirme anzupassen (`col-md-6` und `p-md-5`)?**
Bootstrap ist „mobile first“: Ohne Zusatz gilt eine Klasse für alle Größen. Mit Zusatz (`-md`, `-lg`) gilt sie **ab** dieser Breite. `col-md-6` heißt deshalb: auf dem Handy volle Breite, ab 768 Pixeln die Hälfte.

---

## Mach es selbst

1. Mache das Textfeld `priorKnowledge` zum Pflichtfeld (`required` in Z. 166). Was passiert beim Absenden mit einem leeren Feld?
2. Füge im Dropdown eine weitere Option hinzu (z. B. „Other“ mit `value="Other"`). Erscheint sie im Formular?
3. Ändere `col-lg-8` in Z. 66 auf `col-lg-6`. Wie ändert sich die Karte auf einem großen Bildschirm?
4. Entferne `novalidate` aus Z. 75 und sende das leere Formular ab. Welche Fehlermeldung erscheint jetzt, und wer zeigt sie an?
