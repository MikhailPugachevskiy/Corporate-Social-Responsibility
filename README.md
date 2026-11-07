# Corporate Social Responsibility: Interaktive Web-Präsentation einer Studienarbeit

Diese Website präsentiert die Studienarbeit **„Fundamentals of Corporate Social Responsibility“** von Mikhail Pugachevskiy als interaktive Web-Anwendung. Besucher registrieren sich über ein kurzes Formular, schalten damit die Kapitel frei, laden die Arbeit als PDF herunter und lesen die sechs Kapitel in eigenen Seiten.

Die Oberfläche und die Inhalte der Website sind auf **Englisch**, die Lerndokumentation im Ordner `doc/` ist auf **Deutsch**.

---

## Funktionen

- **Landing Page** mit Hero-Bereich und Registrierungsformular (Vor- und Nachname, E-Mail, höchster Bildungsabschluss, Vorwissen zu CSR auf einer Skala von 0 bis 3, Freitext mit Wortbegrenzung)
- **Freischaltung** der Kapitel nach dem Absenden des Formulars
- **Automatischer PDF-Download** der vollständigen Studienarbeit
- **Sechs Kapitelseiten**: Introduction, Definitions, Facets of CSR, Case Studies, Pros & Cons, Perspectives
- **Zugriffsprüfung** auf allen Kapitelseiten: Ohne Freischaltung wird zur Landing Page zurückgeleitet
- **Responsives Layout** für Desktop, Tablet und Smartphone (Bootstrap-Raster, ausklappbare Navigation)
- **Abbildungen** aus der Arbeit (Triple-Bottom-Line-Modell, Carrolls Pyramide, Gliederung nach Verantwortungsbereichen)

## Technologien

| Technologie | Einsatz |
| --- | --- |
| HTML5 | Struktur der sieben Seiten |
| CSS3 | eigene Stile pro Seite (Farbverläufe, Hover-Effekte) |
| Bootstrap 4.5 | Raster, Karten, Formulare, Navigationsleiste (per CDN) |
| TypeScript | Logik des Formulars und der Zugriffsprüfung (`ts/`) |
| JavaScript | die aus TypeScript übersetzten Dateien, die der Browser ausführt |
| Browser `localStorage` | speichert Freischaltung und Formulardaten im Browser |

Die Website braucht **keinen Server** und keine Datenbank. Wegen der Bibliotheken von Bootstrap, jQuery und Google Fonts (per CDN) ist beim Öffnen eine Internetverbindung nötig.

---

## Aufbau des Projekts

```
Corporate-Social-Responsibility/
├── index.html              # Einstieg: leitet auf html/landing.html weiter
├── html/
│   ├── landing.html        # Landing Page mit Formular
│   ├── introduction.html
│   ├── definitions.html
│   ├── facets.html
│   ├── case-studies.html
│   ├── pros-cons.html
│   └── perspectives.html
├── css/                    # eine CSS-Datei pro Seite
├── ts/
│   ├── landing.ts          # Quelle: Formular, Wortzähler, Freischaltung, PDF-Download
│   ├── landing.js          # übersetzte Fassung, wird von landing.html geladen
│   ├── auth-check.ts       # Quelle: Zugriffsprüfung der Kapitelseiten
│   └── auth-check.js       # übersetzte Fassung, wird von allen Kapiteln geladen
├── assets/
│   ├── pdf/Studienarbeit.pdf
│   └── img/                # drei Abbildungen
├── doc/                    # Lerndokumentation (Deutsch)
├── README.md
├── .gitattributes
└── Governanceethik-als-Diskursethik.pptx   # zusätzliches Präsentationsmaterial, nicht Teil der Website
```

---

## Dokumentation

Der Ordner [`doc/`](doc/README.md) enthält eine **Lerndokumentation** des Codes. Sie erklärt die Dateien Zeile für Zeile, enthält typische Fragen aus Vorstellungsgesprächen mit Antworten und kleine Übungen.

| Kapitel | Thema |
| --- | --- |
| [0. Grundlagen](doc/00-grundlagen.md) | Projektidee, Aufbau, Bootstrap, TypeScript und JavaScript |
| [1. Einstieg und Navigation](doc/01-einstieg-und-navigation.md) | Weiterleitung, Navigationsleiste, Fußzeile |
| [2. Landing Page (HTML)](doc/02-landing-page-html.md) | Hero, Raster und Formular |
| [3. Landing Page (TypeScript)](doc/03-landing-page-typescript.md) | Wortzähler, Absenden, `localStorage`, PDF-Download |
| [4. Zugriffsschutz](doc/04-zugriffsschutz.md) | Freischalten und Prüfen, Grenzen |
| [5. Kapitelseiten](doc/05-kapitelseiten.md) | gemeinsame Vorlage und Besonderheiten der sechs Kapitel |
| [6. CSS-Architektur](doc/06-css-architektur.md) | Bootstrap und eigene Stile |
| [7. Fehlersuche und Wartung](doc/07-fehlersuche-und-wartung.md) | behobene Fehler, Prüfliste, offene Punkte |

---

## Die Website lokal öffnen

1. Repository herunterladen oder klonen.
2. Die Datei `index.html` im Browser öffnen. Sie leitet automatisch zur Landing Page weiter.
   Für die Entwicklung eignet sich ein lokaler Server, z. B. die VS-Code-Erweiterung **Live Server** (Rechtsklick auf `index.html`, „Open with Live Server“) oder `npx serve csr` im Terminal.
3. Das Formular ausfüllen und absenden. Danach sind die Kapitel freigeschaltet.

### TypeScript neu kompilieren

Der Browser führt nur die `.js`-Dateien aus. Wenn du eine `.ts`-Datei änderst, musst du sie neu übersetzen:

```bash
npx tsc ts/landing.ts ts/auth-check.ts
```

---

## Hinweise

- **Datenschutz:** Die Angaben im Formular (Name, E-Mail, Bildungsabschluss, Vorwissen) werden **nur im `localStorage` des eigenen Browsers** gespeichert und an keinen Server gesendet. Die E-Mail-Adresse wird derzeit nicht weiterverwendet.
- **Zugriffsschutz:** Die Freischaltung findet im Browser statt und ist ein Mittel zur Nutzerführung, **kein Sicherheitsmerkmal**. Wer den Status im Browser setzt oder die Seiten direkt aufruft, kann die Inhalte lesen. Das PDF liegt ebenfalls offen im Projekt (Details in [Kapitel 4](doc/04-zugriffsschutz.md)).
- **Weiterentwicklung:** Offene Verbesserungsideen stehen in [Kapitel 7](doc/07-fehlersuche-und-wartung.md).

---

## Fazit

Das Projekt zeigt, wie sich eine wissenschaftliche Arbeit mit einfachen Mitteln (HTML, CSS, Bootstrap und etwas TypeScript) zu einer interaktiven, responsiven Präsentation aufbereiten lässt, mit klarer Nutzerführung von der Registrierung bis zum letzten Kapitel.
