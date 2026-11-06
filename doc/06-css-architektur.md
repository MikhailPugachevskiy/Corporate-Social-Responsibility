# 6. CSS-Architektur: Bootstrap plus eigene Stile

Das Aussehen der Website entsteht aus **zwei Schichten**:

1. **Bootstrap 4.5** liefert das Grundgerüst: Raster, Karten, Buttons, Abstände, Navigationsleiste.
2. **Eigene CSS-Dateien** (`csr/css/`) ergänzen und überschreiben es: Farben, Farbverläufe, Hover-Effekte, Feinheiten.

Dieses Kapitel erklärt, wie diese beiden Schichten zusammenspielen, welche Regeln die eigenen Dateien enthalten und was man verbessern könnte.

---

## 1. Die Struktur der CSS-Dateien

Jede Seite lädt **zwei** Stylesheets, immer in dieser Reihenfolge (siehe Kapitel 0):

```html
 10 |     <!-- Bootstrap 4.5 CSS -->
 11 |     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
 12 |         integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
 13 |     <!-- Page-specific CSS for Landing Page (points one level up to css/) -->
 14 |     <link rel="stylesheet" href="../css/landing.css">
```

Die eigene Datei kommt **nach** Bootstrap. Bei gleicher Wichtigkeit gewinnt in CSS die **spätere** Regel („Kaskade“). So können die eigenen Dateien Bootstrap überschreiben.

| Datei | Zeilen | Inhalt |
| --- | --- | --- |
| `landing.css` | 69 | Basis-Stile, Navigation (mit Sperre), Hero, Formular |
| `introduction.css` | 28 | Basis-Stile, Hero, Hover-Effekt für die Kapitelliste |
| `definitions.css` | 27 | Basis-Stile, Hero, Zitatbox, Bildgröße |
| `facets.css` | 26 | Basis-Stile, Hero, Pyramiden-Kopfzeilen, Kartentitel |
| `case-studies.css` | 21 | Basis-Stile, Hero, Badge-Größe |
| `pros-cons.css` | 20 | Basis-Stile, Hero, Größe der Kartenüberschriften |
| `perspectives.css` | 20 | Basis-Stile, Hero, Zeilenhöhe |

Es gibt **keine** gemeinsame Basisdatei. Die ersten 16 Zeilen jeder Kapitel-CSS sind sehr ähnlich und wiederholen sich: `body`, `.navbar` und `.hero`.

---

## 2. Die Basis jeder Kapitel-CSS

Als Beispiel `definitions.css` komplett (27 Zeilen):

```css
  1 | /* Chapter 2: Definitions Styles */
  2 | body {
  3 |     font-family: 'Open Sans', sans-serif;
  4 |     background-color: #f8f9fa;
  5 |     padding-top: 56px;
  6 | }
  7 |
  8 | .navbar {
  9 |     background-color: #1a252f !important;
 10 | }
 11 |
 12 | .hero {
 13 |     min-height: 35vh;
 14 |     background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
 15 |     padding: 60px 0;
 16 | }
 17 |
 18 | /* Border Left Highlight for Quote Box */
 19 | .border-left-primary {
 20 |     border-left: 5px solid #007bff !important;
 21 | }
 22 |
 23 | /* Diagram Container Styling */
 24 | .img-fluid {
 25 |     max-height: 320px;
 26 |     object-fit: contain;
 27 | }
```

### Zeile für Zeile

- **Z. 2–6** Die Seite bekommt die Schrift „Open Sans“ (die in `<head>` von Google Fonts geladen wird, `sans-serif` ist der Ersatz, falls sie nicht lädt) und einen hellgrauen Hintergrund (`#f8f9fa`).
- **Z. 5** `padding-top: 56px` schafft Platz für die **fixierte Navigationsleiste**. Sie liegt über der Seite (`fixed-top`) und nimmt keinen Platz ein. Ohne diesen Abstand würde sie den Anfang des Banners verdecken. 56 Pixel ist die Standardhöhe einer Bootstrap-Navbar.
- **Z. 8–10** Der dunkle Hintergrund der Navigationsleiste (`#1a252f`). `!important` erzwingt die Regel gegenüber allen anderen. Hier wäre es vermutlich nicht nötig, weil Bootstrap für `.navbar` selbst keinen Hintergrund setzt, schadet aber nicht.
- **Z. 12–16** Das **Hero-Banner**: Mindesthöhe 35 % der Fensterhöhe (`vh` = *viewport height*), innerer Abstand und ein **Farbverlauf**. `linear-gradient(135deg, A 0%, B 100%)` mischt diagonal (135 Grad) von Farbe A zu Farbe B. Das ist die einzige Zeile, die sich in jeder Kapitel-CSS unterscheidet (Kapitel 5, Tabelle).
- **Z. 19–21** Die **eigene Klasse** `border-left-primary` für die Zitatbox (Kapitel 5): ein 5 Pixel breiter blauer Streifen links. `!important` ist hier nötig, weil Bootstraps Klasse `border-0` an der Karte den Rand sonst überschreiben würde.
- **Z. 24–27** `max-height: 320px` begrenzt die Höhe der Abbildungen und `object-fit: contain` sorgt dafür, dass das Bild nicht verzerrt, sondern vollständig im Rahmen sichtbar ist. **Achtung:** Die Regel gilt für **alle** Elemente mit der Klasse `img-fluid` auf dieser Seite, nicht nur für das eine Diagramm.

---

## 3. Die Landing-Page-CSS

### Navigation mit Sperre (Z. 1–33)

```css
  1 | /* Custom Global & Landing Page Styles */
  2 | body {
  3 |     font-family: 'Open Sans', sans-serif;
  4 |     background-color: #f8f9fa;
  5 |     color: #333333;
  6 |     padding-top: 56px;
  7 |     /* Offset for fixed navbar */
  8 | }
  9 |
 10 | /* Navbar Custom Styling */
 11 | .navbar {
 12 |     background-color: #1a252f !important;
 13 |     box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 14 | }
 15 |
 16 | .navbar-brand {
 17 |     font-size: 1.3rem;
 18 |     color: #ffffff !important;
 19 | }
 20 |
 21 | .nav-link.locked-nav.disabled {
 22 |     color: rgba(255, 255, 255, 0.4) !important;
 23 |     cursor: not-allowed;
 24 | }
 25 |
 26 | .nav-link.unlocked {
 27 |     color: #ffffff !important;
 28 |     transition: color 0.2s ease-in-out;
 29 | }
 30 |
 31 | .nav-link.unlocked:hover {
 32 |     color: #17a2b8 !important;
 33 | }
```

- **Z. 13** `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)`: ein feiner Schatten unter der Leiste (0 px seitlich, 2 px nach unten, 4 px weich, 10 % schwarz).
- **Z. 17** `rem` ist relativ zur Grundschriftgröße des Browsers (meist 16 px): `1.3rem` ≈ 21 px. Bei vergrößerter Browserschrift wächst der Wert mit.
- **Z. 21** Ein **zusammengesetzter Selektor** (`.nav-link.locked-nav.disabled`, ohne Leerzeichen): Er trifft nur Elemente, die **alle drei** Klassen haben. Das sind die gesperrten Links. Sie sind halb transparent weiß (`rgba(255, 255, 255, 0.4)`), und der Mauszeiger zeigt ein Verbotsschild (`cursor: not-allowed`).
- **Z. 26–29** Nach der Freischaltung (Kapitel 3, Z. 101–102) bekommen die Links die Klasse `unlocked`: volle weiße Farbe. `transition: color 0.2s` lässt den Farbwechsel weich ablaufen.
- **Z. 31–33** `:hover` färbt den Link beim Darüberfahren türkis (`#17a2b8`).

So **steuert JavaScript das Aussehen nur über Klassen**: Das Skript schaltet Klassen um, das CSS legt fest, wie jede Klasse aussieht. Das ist ein sauberes Muster, weil Logik und Gestaltung getrennt bleiben.

### Hero, Media Query und Formular (Z. 35–69)

```css
 35 | /* Hero Section */
 36 | .hero {
 37 |     min-height: 50vh;
 38 |     background: linear-gradient(135deg, #1a252f 0%, #2c3e50 100%);
 39 |     padding: 80px 0;
 40 | }
 41 |
 42 | .hero h1 {
 43 |     font-size: 2.5rem;
 44 |     line-height: 1.2;
 45 | }
 46 |
 47 | @media (min-width: 768px) {
 48 |     .hero h1 {
 49 |         font-size: 3.5rem;
 50 |     }
 51 | }
 52 |
 53 | /* Form Card Styling */
 54 | .card {
 55 |     border-radius: 10px;
 56 | }
 57 |
 58 | .custom-radio .custom-control-label {
 59 |     cursor: pointer;
 60 | }
 61 |
 62 | .text-small {
 63 |     font-size: 0.85rem;
 64 | }
 65 |
 66 | /* Word count display styling */
 67 | #wordCountDisplay {
 68 |     font-weight: bold;
 69 | }
```

- **Z. 37** Die Landing Page hat ein höheres Banner (50 vh) als die Kapitel (35 vh).
- **Z. 42–45** `.hero h1` ist ein **Nachfahren-Selektor** (mit Leerzeichen): Er trifft nur `<h1>` **innerhalb** von `.hero`.
- **Z. 47–51** Die **Media Query**: Die Regel darin gilt nur, wenn das Fenster **mindestens 768 Pixel** breit ist (`min-width`). Ab dieser Breite wird die Überschrift größer (3,5 statt 2,5 rem). So ist die Überschrift auf dem Handy kleiner und bricht nicht unschön um. Das Muster heißt „**Mobile First**“: erst die kleine Variante schreiben, dann für große Bildschirme erweitern.
- **Z. 54** `.card` überschreibt Bootstraps Eckenradius für **alle** Karten dieser Seite.
- **Z. 58** `.custom-radio .custom-control-label` (Nachfahren-Selektor) trifft die Beschriftungen der Auswahlknöpfe. `cursor: pointer` zeigt die „Hand“ beim Darüberfahren, damit klar ist, dass man das Label anklicken kann.
- **Z. 62** `.text-small` ist ein **eigenes Hilfsmittel** (eine „Utility-Klasse“) im Stil von Bootstrap. In `landing.html` wird sie für die Beschriftungen der Skala genutzt (Kapitel 2).
- **Z. 67** `#wordCountDisplay` ist ein **ID-Selektor** (mit `#`). Er trifft genau das Element mit dieser ID, das Zahlfeld des Wortzählers. IDs haben eine höhere Priorität als Klassen.

---

## 4. Ein Hover-Effekt: `introduction.css`

```css
 18 | /* Interactive Roadmap List Group */
 19 | .list-group-item {
 20 |     transition: all 0.2s ease-in-out;
 21 |     border-left: 4px solid transparent;
 22 | }
 23 |
 24 | .list-group-item:hover {
 25 |     background-color: #f1f3f5;
 26 |     border-left-color: #007bff;
 27 |     transform: translateX(4px);
 28 | }
```

- **Z. 21** Jeder Listeneintrag hat links einen **unsichtbaren** Rand (`transparent`). So ist der Platz schon da, und beim Hover springt nichts.
- **Z. 24–28** Beim Darüberfahren wird der Hintergrund heller, der Rand blau, und der Eintrag **rutscht 4 Pixel nach rechts** (`translateX(4px)`). Das Gefühl: „Dieser Eintrag ist anklickbar“.
- **Z. 20** `transition: all 0.2s` lässt **alle** Änderungen innerhalb von 0,2 Sekunden weich ablaufen, auch beim Verlassen. Die `transition` steht in der **Grundregel** und nicht in `:hover`, deshalb ist auch das Zurückgleiten animiert.

---

## 5. Die übrigen Seiten-Regeln im Überblick

| Datei | Regel | Wirkung |
| --- | --- | --- |
| `facets.css` | `.accordion .card-header { border-radius: 4px; }` | leicht abgerundete Kopfzeilen der Pyramidenstufen |
| `facets.css` | `.card-title { font-size: 1.15rem; }` | etwas kleinere Titel der Karten |
| `case-studies.css` | `.badge { font-size: 0.85rem; font-weight: 600; }` | lesbarere Badges |
| `pros-cons.css` | `.card-header h3 { font-size: 1.1rem; }` | einheitliche Größe der Überschriften in den Kartenköpfen |
| `perspectives.css` | `.leading-relaxed { line-height: 1.7; }` | lockerer Zeilenabstand im Fazit |

`.leading-relaxed` ist, wie `text-small`, eine eigene Klasse. Der Name stammt aus dem CSS-Framework Tailwind und wird hier als **eigene Definition** neu angelegt, damit er in `perspectives.html` (Z. 111) funktioniert.

---

## 6. Was man verbessern könnte

- **Gemeinsame Basisdatei.** Die Regeln für `body`, `.navbar` und das `.hero`-Gerüst stehen in sieben Dateien. Eine Datei `css/base.css`, die jede Seite lädt, würde das vereinfachen. In den seitenspezifischen Dateien blieben nur noch Farbverlauf und Besonderheiten.
- **CSS-Variablen für die Farben.** Farben wie `#1a252f` oder `#17a2b8` sind mehrfach eingetragen. Mit `:root { --color-navbar: #1a252f; }` und `var(--color-navbar)` würde eine Änderung genügen.
- **Die Klasse `italic` anlegen oder ersetzen.** In `definitions.html` (Z. 114) steht eine nicht definierte Klasse (Kapitel 5 und 7).
- **Weniger `!important`.** Wo es möglich ist, sollte man die Reihenfolge der Dateien und die Spezifität nutzen, statt Regeln zu erzwingen.
- **Bildhöhe begrenzen nur für Diagramme.** Statt `.img-fluid` global (`definitions.css`, Z. 24) besser eine eigene Klasse wie `.diagram` verwenden.

---

## Typische Fragen

**Was ist die Kaskade, und warum ist die Reihenfolge der Stylesheets wichtig?**
Wenn mehrere Regeln dasselbe Element betreffen, entscheidet (1) die **Wichtigkeit** (`!important`), dann (2) die **Spezifität** des Selektors (ID vor Klasse vor Elementname) und dann (3) die **Reihenfolge**: Spätere Regeln gewinnen. Weil die eigene Datei nach Bootstrap geladen wird, kann sie Bootstrap überschreiben.

**Was ist der Unterschied zwischen `.a .b` und `.a.b`?**
Mit Leerzeichen (`.a .b`): ein `.b` **innerhalb** eines `.a`. Ohne Leerzeichen (`.a.b`): ein Element, das **beide** Klassen hat.

**Was bedeuten `rem`, `px`, `vh` und `%`?**
`px` ist eine feste Größe, `rem` ist relativ zur Schriftgröße des Browsers, `vh` ist ein Prozent der Fensterhöhe und `%` ist relativ zum übergeordneten Element.

**Warum `padding-top: 56px` am `body`?**
Weil die Navigationsleiste fixiert ist und nicht im normalen Fluss liegt. Ohne den Abstand würde sie den Seitenanfang überdecken.

**Was heißt „Mobile First“?**
Die Grundregeln gelten für kleine Bildschirme. Mit `@media (min-width: …)` kommen Anpassungen für größere Bildschirme dazu. Bootstrap folgt demselben Prinzip.

**Wann nimmt man Bootstrap-Klassen und wann eigenes CSS?**
Für Standardfälle (Abstände, Raster, Farben, Karten) sind Bootstrap-Klassen schneller und einheitlich. Eigenes CSS braucht man für Besonderheiten wie die Farbverläufe der Banner, Hover-Effekte oder Zustände, die ein Skript steuert (`unlocked`).

---

## Mach es selbst

1. Ändere in `definitions.css` den Farbverlauf des Banners (Z. 14) auf `#ff6b6b` und `#feca57`. Wie wirkt die Seite?
2. Ändere in `landing.css` den Wert `min-width: 768px` (Z. 47) auf `1200px`. Ab wann wird die Überschrift größer?
3. Entferne in `landing.css` das `!important` in Z. 12 und lade die Landing Page neu. Ändert sich die Farbe der Leiste? (Vermutlich nicht, weil Bootstrap hier keine eigene Hintergrundfarbe setzt.)
4. Ändere in `introduction.css` den Wert `translateX(4px)` (Z. 27) auf `translateX(20px)`. Was passiert beim Darüberfahren, und wirkt es noch angenehm?
5. Lege eine Datei `css/base.css` an, verschiebe die `body`-Regeln dorthin und binde sie vor der Seiten-CSS ein. Funktioniert alles wie vorher?
