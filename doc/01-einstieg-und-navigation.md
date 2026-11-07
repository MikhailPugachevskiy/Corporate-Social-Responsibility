# 1. Einstieg und Navigation: Wie die Seiten miteinander verbunden sind

Eine Multi-Page-Website besteht aus vielen HTML-Dateien, die über **Links** verbunden sind. Dieses Kapitel zeigt die drei Mittel, mit denen die Seiten hier verknüpft werden:

1. die **Weiterleitung** in `index.html`,
2. die **Navigationsleiste** (Bootstrap-Navbar) auf jeder Seite,
3. die **Fußzeile mit „Zurück/Weiter“-Buttons** auf den Kapitelseiten.

---

## Datei: `index.html` (Die Weiterleitung)

```html
  1 | <!DOCTYPE html>
  2 | <html lang="en">
  3 |
  4 | <head>
  5 |     <meta charset="UTF-8">
  6 |     <meta http-equiv="refresh" content="0; url=html/landing.html">
  7 |     <title>Redirecting to CSR Webapp...</title>
  8 | </head>
  9 |
 10 | <body>
 11 |     <p>If you are not redirected automatically, <a href="html/landing.html">click here</a>.</p>
 12 | </body>
 13 |
 14 | </html>
```

### Zeile für Zeile

- **Z. 6** Die Weiterleitung. `http-equiv="refresh"` weist den Browser an, die Seite neu zu laden. `content="0; url=html/landing.html"` bedeutet: „nach 0 Sekunden zu `html/landing.html` wechseln“. Der Pfad ist relativ zu `index.html`, deshalb beginnt er mit `html/`.
- **Z. 7** Der Tab-Titel, der nur kurz sichtbar ist.
- **Z. 11** Ein **Fallback**: Falls die Weiterleitung nicht klappt, kann der Nutzer den Link anklicken. Das ist gute Praxis, weil manche Browser oder Einstellungen die Weiterleitung blockieren.

**Warum gibt es `index.html`?** Server und Hosting-Dienste (z. B. GitHub Pages) öffnen bei der Adresse automatisch die Datei `index.html`. So landet jeder Besucher auf der Landing Page, ohne dass er den Pfad `html/landing.html` kennen muss.

---

## Relative Pfade

Die Seiten liegen in verschiedenen Ordnern. Deshalb sind die Pfade wichtig:

| Von | Nach | Pfad | Erklärung |
| --- | --- | --- | --- |
| `index.html` | Landing Page | `html/landing.html` | in den Unterordner `html/` |
| `html/landing.html` | CSS | `../css/landing.css` | `..` = eine Ebene hoch, dann `css/` |
| `html/landing.html` | Skript | `../ts/landing.js` | `..` = eine Ebene hoch, dann `ts/` |
| `html/landing.html` | andere Seite | `introduction.html` | gleicher Ordner, kein Präfix nötig |
| `html/definitions.html` | Bild | `../assets/img/triple-bottom-line.png` | eine Ebene hoch, dann `assets/img/` |

Ein falscher Pfad führt zu einem **404-Fehler**: Die Datei wird nicht geladen, und die Seite verhält sich fehlerhaft, ohne dass man es sofort sieht (siehe Kapitel 7).

---

## Die Navigationsleiste auf der Landing Page

### Datei: `html/landing.html` (Z. 18–50)

```html
 18 |     <!-- Main Navigation Bar with 6 main chapters (Locked initially until user completes form) -->
 19 |     <header>
 20 |         <nav class="navbar navbar-expand-lg navbar-dark fixed-top">
 21 |             <a class="navbar-brand font-weight-bold" href="landing.html">CSR Thesis</a>
 22 |             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
 23 |                 aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
 24 |                 <span class="navbar-toggler-icon"></span>
 25 |             </button>
 26 |
 27 |             <div class="collapse navbar-collapse" id="navbarCollapse">
 28 |                 <ul class="navbar-nav ml-auto" id="mainNavLinks">
 29 |                     <li class="nav-item">
 30 |                         <a class="nav-link locked-nav disabled" href="introduction.html">1. Introduction</a>
 31 |                     </li>
 32 |                     <li class="nav-item">
 33 |                         <a class="nav-link locked-nav disabled" href="definitions.html">2. Definitions</a>
 34 |                     </li>
 35 |                     <li class="nav-item">
 36 |                         <a class="nav-link locked-nav disabled" href="facets.html">3. Facets of CSR</a>
 37 |                     </li>
 38 |                     <li class="nav-item">
 39 |                         <a class="nav-link locked-nav disabled" href="case-studies.html">4. Case Studies</a>
 40 |                     </li>
 41 |                     <li class="nav-item">
 42 |                         <a class="nav-link locked-nav disabled" href="pros-cons.html">5. Pros & Cons</a>
 43 |                     </li>
 44 |                     <li class="nav-item">
 45 |                         <a class="nav-link locked-nav disabled" href="perspectives.html">6. Perspectives</a>
 46 |                     </li>
 47 |                 </ul>
 48 |             </div>
 49 |         </nav>
 50 |     </header>
```

### Zeile für Zeile

- **Z. 19** Das semantische Element `<header>` für den Kopfbereich.
- **Z. 20** `<nav>` ist das semantische Element für Navigation. Die Bootstrap-Klassen:
  - `navbar` ist der Grundbaustein der Leiste.
  - `navbar-expand-lg`: Ab großer Breite stehen die Links nebeneinander. Darunter werden sie hinter einem Menü-Button versteckt.
  - `navbar-dark`: helle Schrift für dunklen Hintergrund (den Hintergrund setzt `landing.css`).
  - `fixed-top`: Die Leiste bleibt beim Scrollen oben kleben.
- **Z. 21** Das Logo bzw. der Name. Er verlinkt auf die Landing Page.
- **Z. 22–25** Der Menü-Button („Hamburger“) für kleine Bildschirme. `data-toggle="collapse"` und `data-target="#navbarCollapse"` sagen Bootstrap: „Beim Klick den Bereich mit der ID `navbarCollapse` ein- oder ausklappen.“ Dafür braucht es das Bootstrap-JavaScript (Kapitel 0). Die `aria-…`-Attribute teilen Screenreadern mit, was der Button macht und ob das Menü offen ist.
- **Z. 27** Der Bereich, der ein- und ausgeklappt wird (`collapse navbar-collapse`).
- **Z. 28** Die Linkliste. `ml-auto` (margin-left: auto) schiebt sie an den rechten Rand. Die ID `mainNavLinks` ist vorhanden, wird vom Skript aber nicht benutzt.
- **Z. 29–46** Sechs Navigationspunkte, je ein `<li>` mit einem Link.
- **Z. 30** Jeder Link hat die Klassen `locked-nav` und `disabled`. `locked-nav` ist die **Markierung für das Skript**: `landing.ts` sucht alle Elemente mit dieser Klasse und schaltet sie nach der Registrierung frei (Kapitel 3). `disabled` ist eine Bootstrap-Klasse, die den Link ausgegraut und unklickbar macht (`pointer-events: none`). `landing.css` färbt ihn zusätzlich blasser (Kapitel 6).

> **Hinweis:** `disabled` sperrt nur das Klicken mit der Maus. Der Link hat weiterhin sein `href`, ein Nutzer könnte ihn also mit der Tastatur (Tab, Enter) erreichen. Deshalb prüft jede Kapitelseite zusätzlich selbst, ob der Nutzer freigeschaltet ist (Kapitel 4).

---

## Die Navigationsleiste auf den Kapitelseiten

Auf den Kapitelseiten ist die Navigationsleiste gleich aufgebaut, aber **ohne Sperre**. Stattdessen wird die aktuelle Seite markiert. Hier `introduction.html` (Z. 28–31):

```html
 28 |                 <ul class="navbar-nav ml-auto">
 29 |                     <li class="nav-item active">
 30 |                         <a class="nav-link font-weight-bold" href="introduction.html">1. Introduction <span
 31 |                                 class="sr-only">(current)</span></a>
```

- **Z. 29** Die Klasse `active` am `<li>` hebt den aktuellen Menüpunkt hervor.
- **Z. 30** `font-weight-bold` macht ihn zusätzlich fett.
- **Z. 30–31** `<span class="sr-only">(current)</span>` ist ein Text, der **nur für Screenreader** sichtbar ist („sr-only“ = screen reader only). Er teilt mit, dass dies die aktuelle Seite ist.

Dieser Block wiederholt sich auf allen sechs Kapitelseiten. Nur die Position von `active` ändert sich.

---

## Die Fußzeile auf den Kapitelseiten

### Datei: `html/introduction.html` (Z. 153–159)

```html
153 |     <!-- Footer Navigation Controls -->
154 |     <footer class="bg-light py-4 border-top">
155 |         <div class="container d-flex justify-content-between align-items-center">
156 |             <a href="landing.html" class="btn btn-outline-secondary">&larr; Landing Page</a>
157 |             <a href="definitions.html" class="btn btn-primary font-weight-bold">Chapter 2: Definitions &rarr;</a>
158 |         </div>
159 |     </footer>
```

- **Z. 154** `bg-light` (heller Hintergrund), `py-4` (vertikaler Innenabstand) und `border-top` (Linie oben).
- **Z. 155** `d-flex justify-content-between`: Der linke Button steht links, der rechte rechts.
- **Z. 156–157** Zwei Links, die wie Buttons aussehen (`btn`). `&larr;` und `&rarr;` sind **HTML-Entities** für die Pfeile ← und →.

Die Seiten sind so zu einer **Kette** verbunden:

| Seite | Zurück | Weiter |
| --- | --- | --- |
| 1. Introduction | Landing Page | 2. Definitions |
| 2. Definitions | 1. Introduction | 3. Facets of CSR |
| 3. Facets of CSR | 2. Definitions | 4. Case Studies |
| 4. Case Studies | 3. Facets of CSR | 5. Pros & Cons |
| 5. Pros & Cons | 4. Case Studies | 6. Perspectives |
| 6. Perspectives | 5. Pros & Cons | „Finish & Return Home“ (Landing Page) |

Zusätzlich verlinkt die Introduction-Seite alle Kapitel in einer Liste (Kapitel 5).

---

## Typische Fragen

**Was ist der Unterschied zwischen `<a href="…">` und einem JavaScript-Wechsel (`window.location.href`)?**
Der Link ist die einfache, zugängliche Lösung: Er funktioniert ohne JavaScript, man kann ihn in einem neuen Tab öffnen, und Suchmaschinen verstehen ihn. Ein JavaScript-Wechsel (wie nach dem Absenden des Formulars in Kapitel 3) ist nur sinnvoll, wenn zuerst etwas berechnet oder gespeichert werden muss.

**Warum ist die Navigation auf jeder Seite kopiert und nicht an einer Stelle definiert?**
Ohne Framework oder Server-Includes gibt es in reinem HTML kein Mittel für „gemeinsame Bausteine“. Jede Seite braucht ihre eigene Kopie. Das ist ein Nachteil: Ändert man einen Menüpunkt, muss man alle sieben Dateien anpassen. In einer React-App wäre die Navigation eine Komponente.

**Was bedeutet `fixed-top`, und warum hat `body` ein `padding-top`?**
Eine fixierte Leiste liegt über dem Inhalt und nimmt keinen Platz im Seitenfluss ein. Damit sie nicht den Anfang der Seite verdeckt, bekommt der `body` oben einen Abstand von 56 Pixeln (die Höhe der Leiste, siehe Kapitel 6).

**Was macht `aria-label="Toggle navigation"`?**
Es gibt dem Menü-Button einen Namen für Screenreader. Der Button zeigt nur ein Symbol, ohne Text würde ein Screenreader nur „Button“ vorlesen.

---

## Mach es selbst

1. Verkleinere dein Browserfenster auf Handy-Größe. Was passiert mit der Navigationsleiste, und wie klappst du die Links auf?
2. Ändere in `landing.html` den Text „1. Introduction“ (Z. 30) in „Start“. Was siehst du? Auf welchen anderen Seiten musst du den Text ebenfalls ändern?
3. Ändere in `index.html` die Zahl `0` in Z. 6 auf `5`. Was passiert beim Öffnen?
4. Ändere in einer Kapitelseite den Pfad eines Footer-Links absichtlich falsch (z. B. `definition.html` statt `definitions.html`). Was zeigt der Browser, und wie erkennst du das in den Entwicklerwerkzeugen (Reiter **Network**)?
