# Dokumentation zum Lernen

Hier ist Zeile für Zeile erklärt, wie der Code der Website **Corporate Social Responsibility (CSR)** funktioniert. Die Website präsentiert eine Studienarbeit als interaktive Web-Präsentation: Eine Landing Page mit Registrierungsformular schaltet sechs Kapitelseiten frei und löst den Download der Arbeit als PDF aus. Gebaut ist sie mit **HTML, CSS, Bootstrap 4 und TypeScript**, ohne Framework und ohne Server.

Die Erklärungen sind zum Lernen und für Vorstellungsgespräche gedacht. Sie sind nicht Teil der Website: Die Seiten laden diese Dateien nie. Zur Website selbst geht es in der [Haupt-README](../README.md).

## Die Website (HTML, CSS und TypeScript)

Lies die Kapitel in dieser Reihenfolge:

| Kapitel | Inhalt | Dateien im Code |
| --- | --- | --- |
| [0. Grundlagen](00-grundlagen.md) | Projektidee, Aufbau, Bootstrap, TypeScript und JavaScript, Aufbau einer Seite | `landing.html` (Kopf und Skripte) |
| [1. Einstieg und Navigation](01-einstieg-und-navigation.md) | Weiterleitung, relative Pfade, Bootstrap-Navbar, gesperrte Links, Fußzeile | `index.html`, `landing.html`, `introduction.html` |
| [2. Landing Page (HTML)](02-landing-page-html.md) | Hero, Bootstrap-Raster, Formular, Dropdown, Radio-Skala | `landing.html` |
| [3. Landing Page (TypeScript)](03-landing-page-typescript.md) | DOM, Ereignisse, Interface, Typ-Zusicherungen, `localStorage`, PDF-Download | `landing.ts`, `landing.js` |
| [4. Zugriffsschutz](04-zugriffsschutz.md) | Freischalten und Prüfen, Grenzen eines Schutzes im Browser | `auth-check.ts`, `auth-check.js` |
| [5. Kapitelseiten](05-kapitelseiten.md) | gemeinsame Vorlage, Karten, Zitate, Abbildungen, Besonderheiten jedes Kapitels | `introduction.html`, `definitions.html`, `facets.html`, `case-studies.html`, `pros-cons.html`, `perspectives.html` |
| [6. CSS-Architektur](06-css-architektur.md) | Bootstrap und eigene Stile, Kaskade, Farbverläufe, Media Query, Hover | `landing.css` und alle Kapitel-`.css` |
| [7. Fehlersuche und Wartung](07-fehlersuche-und-wartung.md) | behobene Fehler, Entwicklerwerkzeuge, Prüfliste, offene Punkte | das gesamte Projekt |

## So sind die Kapitel aufgebaut

1. **Der Code** mit den originalen Zeilennummern, wie er im Projekt steht. Bei längeren Dateien werden nur Auszüge gezeigt. Ausgelassene Stellen sind mit `...` oder einem Hinweis zum Zeilenbereich gekennzeichnet.
2. **Zeile für Zeile**: Jeder Punkt beginnt mit der Zeilennummer (zum Beispiel „Z. 4“) und erklärt, was die Zeile macht und warum.
3. **Typische Fragen**, wie sie in einem Vorstellungsgespräch kommen könnten, mit Antworten.
4. **Mach es selbst**: kleine Aufgaben, die du lokal ausprobieren kannst.

**Zu den Zeilennummern:** Sie stimmen für den Stand des Codes, als die Kapitel geschrieben wurden. Wenn du die Dateien später änderst, verschieben sie sich. Der Codeausschnitt steht aber immer direkt über den Erklärungen, damit man die Zuordnung auch dann findet.

## Tipps zum Arbeiten mit den Kapiteln

- **Öffne die Website parallel.** Am einfachsten geht das mit der VS-Code-Erweiterung „Live Server“ (Rechtsklick auf `csr/index.html`).
- **Öffne die Entwicklerwerkzeuge (F12).** Die Reiter **Console**, **Network** und **Application → Local Storage** werden in den Kapiteln 3, 4 und 7 oft gebraucht.
- **Ändere eine Datei nach jeder „Mach es selbst“-Aufgabe zurück.** Mit Git (`git restore <Datei>`) oder dem Rückgängig-Befehl des Editors.
- **Bei TypeScript-Änderungen neu kompilieren:** `npx tsc csr/ts/landing.ts csr/ts/auth-check.ts`. Sonst ändert sich im Browser nichts (Kapitel 0 und 7).
