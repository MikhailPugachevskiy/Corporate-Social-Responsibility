# 0. Grundlagen: Projektidee, Aufbau und Technologien

Dieses Kapitel erklärt zuerst, was das Projekt ist und aus welchen Bausteinen es besteht. Danach wird gezeigt, wie eine Seite aufgebaut ist (am Beispiel von `landing.html`). Die weiteren Dateien folgen in den nächsten Kapiteln.

---

## 1. Was ist das Projekt?

**Corporate Social Responsibility (CSR)** ist eine **statische Website**, die eine Studienarbeit als interaktive Web-Präsentation zeigt. Die Studienarbeit („Fundamentals of Corporate Social Responsibility“) liegt als PDF im Projekt.

Der Ablauf für Besucher:

1. Die **Landing Page** erklärt das Thema und enthält ein **Registrierungsformular** (Name, E-Mail, Bildungsabschluss, Vorwissen).
2. Nach dem Absenden werden die **Kapitel freigeschaltet**, und das **PDF** wird heruntergeladen.
3. Die Besucher lesen die **sechs Kapitel** in eigenen Seiten: Introduction, Definitions, Facets of CSR, Case Studies, Pros & Cons, Perspectives.

Es gibt **keinen Server** und keine Datenbank. Alles läuft im Browser. Der Freischalt-Status und die Formulardaten liegen im `localStorage` des Browsers.

## 2. Die Technologien

| Technologie | Wofür | Wo im Projekt |
| --- | --- | --- |
| **HTML5** | Struktur und Inhalt der Seiten | `csr/html/*.html`, `csr/index.html` |
| **CSS3** | eigenes Aussehen (Farben, Verläufe, Hover-Effekte) | `csr/css/*.css` |
| **Bootstrap 4.5** | fertiges Raster, Karten, Buttons, Navigationsleiste | per CDN in jeder Seite eingebunden |
| **TypeScript** | typisierte Programmlogik für das Formular und den Zugriffsschutz | `csr/ts/landing.ts`, `csr/ts/auth-check.ts` |
| **JavaScript** | die kompilierte Fassung der TypeScript-Dateien, die der Browser ausführt | `csr/ts/landing.js`, `csr/ts/auth-check.js` |
| **jQuery (slim) und Popper** | werden von Bootstrap 4 für die ausklappbare Navigation benötigt | per CDN eingebunden |
| **Google Fonts** | die Schrift „Open Sans“ | per CDN eingebunden |
| **localStorage** | speichert Freischaltung und Formulardaten im Browser | `landing.ts`, `auth-check.ts` |

**CDN** (Content Delivery Network) bedeutet: Bootstrap, jQuery und die Schrift werden nicht aus dem Projekt geladen, sondern von einem fremden Server. Dafür braucht die Seite beim Öffnen eine Internetverbindung.

## 3. Der Aufbau des Projekts

```
Corporate-Social-Responsibility/
├── csr/
│   ├── index.html            # Einstieg: leitet auf html/landing.html weiter
│   ├── html/                 # sieben Seiten: landing + sechs Kapitel
│   ├── css/                  # pro Seite eine CSS-Datei
│   ├── ts/                   # TypeScript-Quellen und die kompilierten JS-Dateien
│   └── assets/
│       ├── pdf/              # die Studienarbeit als PDF
│       └── img/              # drei Abbildungen für die Kapitel 2 und 3
├── doc/                      # Lerndokumentation (diese Dateien)
└── Governanceethik-als-Diskursethik.pptx   # zusätzliches Präsentationsmaterial (nicht Teil der Website)
```

**Zuordnung der Dateien:**

| Seite | HTML | CSS | JavaScript |
| --- | --- | --- | --- |
| Einstieg | `index.html` | – | – |
| Landing Page | `html/landing.html` | `css/landing.css` | `ts/landing.js` |
| 1. Introduction | `html/introduction.html` | `css/introduction.css` | `ts/auth-check.js` |
| 2. Definitions | `html/definitions.html` | `css/definitions.css` | `ts/auth-check.js` |
| 3. Facets of CSR | `html/facets.html` | `css/facets.css` | `ts/auth-check.js` |
| 4. Case Studies | `html/case-studies.html` | `css/case-studies.css` | `ts/auth-check.js` |
| 5. Pros & Cons | `html/pros-cons.html` | `css/pros-cons.css` | `ts/auth-check.js` |
| 6. Perspectives | `html/perspectives.html` | `css/perspectives.css` | `ts/auth-check.js` |

Jede Seite ist **eine eigene HTML-Datei**. Wenn der Nutzer auf einen Link klickt, lädt der Browser eine **neue Seite** (anders als bei einer React-App, die nur Teile austauscht). Man nennt das eine **Multi-Page-Website**.

## 4. TypeScript und JavaScript

Browser verstehen nur JavaScript. **TypeScript** ist JavaScript mit zusätzlichen **Typen** (z. B. `string`, `HTMLFormElement`). Ein Compiler (`tsc`) übersetzt TypeScript in JavaScript. Die Typen verschwinden dabei.

Im Projekt liegen deshalb **beide** Dateien nebeneinander:

- `landing.ts` ist die Quelle, die man bearbeitet.
- `landing.js` ist das Ergebnis der Übersetzung und wird von `landing.html` geladen.

Die HTML-Seiten binden immer die `.js`-Datei ein, nie die `.ts`-Datei. **Wichtig:** Wenn man eine `.ts`-Datei ändert, muss man sie neu kompilieren, sonst ändert sich im Browser nichts. Im Projekt gibt es dafür weder `package.json` noch Build-Werkzeuge. Das Kompilieren geschieht von Hand, z. B. mit `npx tsc csr/ts/landing.ts csr/ts/auth-check.ts`.

---

## Wie eine Seite aufgebaut ist: `landing.html`

### Der Kopf der Seite (Z. 1–15)

```html
  1 | <!DOCTYPE html>
  2 | <html lang="en">
  3 |
  4 | <head>
  5 |     <meta charset="UTF-8">
  6 |     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  7 |     <title>CSR Webapp - Landing Page</title>
  8 |     <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">
  9 |
 10 |     <!-- Bootstrap 4.5 CSS -->
 11 |     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
 12 |         integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
 13 |     <!-- Page-specific CSS for Landing Page (points one level up to css/) -->
 14 |     <link rel="stylesheet" href="../css/landing.css">
 15 | </head>
```

- **Z. 1** Sagt dem Browser, dass es sich um ein HTML5-Dokument handelt.
- **Z. 2** `lang="en"` teilt Screenreadern und Suchmaschinen mit, dass der Inhalt auf Englisch ist.
- **Z. 4–15** Der `<head>` enthält Angaben, die nicht direkt auf der Seite sichtbar sind.
- **Z. 5** `charset="UTF-8"` sorgt dafür, dass Sonderzeichen wie ä, ö, ü korrekt angezeigt werden.
- **Z. 6** Der Viewport-Tag sorgt dafür, dass die Seite auf Smartphones in der richtigen Größe angezeigt wird und nicht verkleinert.
- **Z. 7** Der Text im Browser-Tab.
- **Z. 8** Lädt die Schrift „Open Sans“ von Google Fonts (Stärken 300, 400 und 700).
- **Z. 11–12** Lädt Bootstrap 4.5. Das Attribut `integrity` ist eine **Prüfsumme**: Der Browser vergleicht die geladene Datei damit und blockiert sie, wenn sie verändert wurde. `crossorigin="anonymous"` ist dafür nötig.
- **Z. 14** Lädt die **eigene** CSS-Datei **nach** Bootstrap. Die Reihenfolge ist wichtig: Spätere Regeln überschreiben frühere (siehe Kapitel 6). Der Pfad `../css/` bedeutet: „eine Ordnerebene nach oben, dann in `css/`“, weil `landing.html` im Ordner `html/` liegt.

### Die Skripte am Ende (Z. 185–190)

```html
185 |     <!-- JS Libraries & Page Script -->
186 |     <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
187 |     <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
188 |     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
189 |     <script src="../ts/landing.js"></script>
190 | </body>
```

- **Z. 186–188** Die Bibliotheken, die Bootstrap 4 für interaktive Teile braucht (hier: das Aufklappen der Navigation auf kleinen Bildschirmen). Die Reihenfolge ist vorgegeben: erst jQuery, dann Popper, dann Bootstrap.
- **Z. 189** Das eigene Skript der Seite. Es steht **am Ende des `<body>`**, damit das HTML schon geladen ist, wenn das Skript läuft.

---

## Bootstrap in Kürze

Bootstrap liefert fertige CSS-Klassen. Statt jedes Aussehen selbst zu schreiben, setzt man Klassen an die Elemente. Die wichtigsten Gruppen in diesem Projekt:

| Gruppe | Beispiele | Bedeutung |
| --- | --- | --- |
| **Raster** | `container`, `row`, `col-md-6`, `col-lg-9` | Die Seite hat 12 Spalten. `col-md-6` heißt: ab mittlerer Breite 6 von 12 Spalten, darunter volle Breite. |
| **Abstände** | `mb-5`, `my-4`, `p-4`, `px-3` | `m` = Außenabstand, `p` = Innenabstand, `t/b/y/x` = oben, unten, vertikal, horizontal, Zahl = Größe (0 bis 5). |
| **Text** | `font-weight-bold`, `text-muted`, `text-center`, `lead` | Schriftstärke, Farbe, Ausrichtung, Einleitungstext. |
| **Flexbox** | `d-flex`, `align-items-center`, `justify-content-between` | Elemente nebeneinander anordnen und ausrichten. |
| **Komponenten** | `card`, `btn btn-primary`, `badge`, `list-group`, `navbar` | Fertige Bausteine. |
| **Formulare** | `form-control`, `form-group`, `form-row`, `custom-radio` | Gestaltete Eingabefelder. |

Mit eigenen CSS-Dateien werden diese Klassen ergänzt oder überschrieben (Kapitel 6).

---

## Typische Fragen

**Warum gibt es mehrere HTML-Dateien und nicht nur eine?**
Weil das eine klassische Multi-Page-Website ist. Jedes Kapitel hat seine eigene Seite mit eigener URL. Das ist einfach zu verstehen und braucht kein Framework.

**Warum wird Bootstrap von einem CDN geladen?**
Das spart eigenen Speicherplatz, und häufig genutzte Dateien sind oft schon im Browser-Cache. Der Nachteil: Ohne Internet funktioniert das Design nicht, und man ist von einem fremden Server abhängig.

**Wofür ist das `integrity`-Attribut?**
Es ist ein Sicherheitsmerkmal („Subresource Integrity“). Der Browser prüft die Prüfsumme der geladenen Datei. Wäre die Datei auf dem CDN manipuliert worden, würde der Browser sie nicht ausführen.

**Was ist der Unterschied zwischen TypeScript und JavaScript?**
TypeScript fügt JavaScript Typen hinzu und findet Fehler schon beim Schreiben (z. B. wenn man auf ein Element zugreift, das `null` sein kann). Der Browser führt aber nur das übersetzte JavaScript aus.

**Warum steht das Skript am Ende des `<body>`?**
Weil das Skript auf HTML-Elemente zugreift. Stünde es im `<head>`, wären diese noch nicht geladen. Zusätzlich wartet `landing.ts` mit `DOMContentLoaded` (Kapitel 3).

---

## Mach es selbst

1. Öffne `csr/index.html` in deinem Browser (am besten über die VS-Code-Erweiterung „Live Server“). Wohin wirst du geleitet?
2. Ändere in `landing.html` den Text im `<title>` (Z. 7). Was siehst du im Browser-Tab?
3. Öffne die Entwicklerwerkzeuge (F12) und den Reiter **Network**. Lade `landing.html` neu. Welche Dateien kommen von fremden Servern (CDN) und welche aus dem Projekt?
4. Schalte die Internetverbindung aus und lade die Seite neu. Was ändert sich am Aussehen?
