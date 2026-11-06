# 7. Fehlersuche und Wartung: Was schiefgehen kann und wie man es findet

Dieses Kapitel unterscheidet sich von den anderen: Es erklärt keine einzelne Datei, sondern zeigt, **welche Fehler** bei der Prüfung des Projekts gefunden und behoben wurden, **woran man sie erkennt** und was **noch offen** ist. Solche Beispiele sind in Bewerbungsgesprächen sehr wertvoll, weil sie zeigen, dass man nicht nur Code schreibt, sondern ihn auch prüft und pflegt.

---

## 1. Die gefundenen und behobenen Fehler

| Nr. | Problem | Woran man es erkennt | Ursache | Lösung |
| --- | --- | --- | --- | --- |
| 1 | **Zitat-Marker im sichtbaren Text** (z. B. `[cite: 1]`) | Im Text der Kapitelseiten tauchen eckige Klammern mit „cite“ auf | Reste von automatisch erzeugtem Text, der aus einer Quelle kopiert wurde | Alle 77 Marker aus den sechs Kapitelseiten entfernt |
| 2 | **Skripte, die nicht existieren** | Im Reiter **Network** der Entwicklerwerkzeuge erscheinen rote Einträge mit Status **404** (`definitions.js`, `facets.js` usw.) | Fünf Kapitelseiten verlinkten Dateien, die nie angelegt wurden | Alle Kapitelseiten laden jetzt dasselbe Skript `auth-check.js` |
| 3 | **Zugriffsschutz nur auf einer Seite** | Eine Kapitelseite (z. B. `facets.html`) lässt sich ohne Registrierung öffnen | `auth-check.ts` war nirgends eingebunden und hatte keine kompilierte `.js`-Datei. Nur `introduction.js` prüfte den Status | `auth-check.js` (die kompilierte Fassung von `auth-check.ts`) ersetzt `introduction.js` und wird von allen Kapiteln geladen |
| 4 | **PDF-Download funktioniert nicht** | Nach dem Absenden meldet die Seite „Download startet“, aber es kommt ein Fehler bzw. nichts | Der Code verwies auf `Studienarbeit_CSR.pdf`, die Datei heißt aber `Studienarbeit.pdf` | Der Pfad in `landing.ts` und `landing.js` zeigt auf `Studienarbeit.pdf`. Der Name der heruntergeladenen Datei bleibt `Studienarbeit_CSR.pdf` |
| 5 | **Fehlende Bilder** | Auf `definitions.html` und `facets.html` erscheint nur der Alternativtext statt der Abbildung. Im Reiter Network steht **404** | Der Ordner `assets/img/` mit den drei Bildern war nicht im Projekt | Die Bilder `triple-bottom-line.png`, `carroll-pyramid.png` und `responsibilities-hiss.png` wurden aus dem PDF rekonstruiert und angelegt |
| 6 | **Platzhalter-Tooltip** | Beim Darüberfahren über einen Quellentitel erscheint „Source Title“ | `<cite title="Source Title">` ist ein Platzhalter aus einer Vorlage | Das Attribut wurde entfernt |

### Warum diese Fehler nicht auffielen

Alle sechs haben eines gemeinsam: **Die Seite sah beim schnellen Anklicken fast normal aus.** Ein fehlendes Skript, eine fehlende Datei oder ein falscher Dateiname löst im Browser keinen sichtbaren Absturz aus. Die Seite zeigt weiter an, was sie kann. Deshalb muss man gezielt nachsehen.

---

## 2. So findet man solche Fehler

### Die Entwicklerwerkzeuge des Browsers (F12)

| Reiter | Wofür | Beispiel in diesem Projekt |
| --- | --- | --- |
| **Console** | Fehlermeldungen von JavaScript | „Failed to load resource: 404“, „Uncaught TypeError …“ |
| **Network** | Alle geladenen Dateien mit Status | Rote Zeilen mit **404** zeigen fehlende Skripte, Bilder und PDFs |
| **Application → Local Storage** | Gespeicherte Daten ansehen und ändern | `csr_unlocked` und `csr_user_data` prüfen |
| **Elements** | Das DOM und die angewendeten CSS-Regeln | Prüfen, welche Klasse welche Regel auslöst |

Die wichtigste Regel: **Nach jeder Änderung die Seite im Reiter Network prüfen.** Ein 404 ist immer ein Hinweis auf einen falschen Pfad oder eine fehlende Datei.

### Die Prüfliste vor der Veröffentlichung

1. Jede Seite öffnen. Im Reiter **Network** darf kein roter Eintrag erscheinen.
2. Die **Console** muss leer sein (keine roten Fehler).
3. Alle **Links** anklicken: Navigationsleiste, Fußzeilen, Buttons.
4. Das **Formular** testen: leer absenden, mit zu langem Text, korrekt ausgefüllt.
5. Den **PDF-Download** testen, und prüfen, ob die Datei sich öffnen lässt.
6. Jede Kapitelseite **ohne Freischaltung** öffnen (Local Storage vorher leeren): Es muss zur Landing Page zurückgehen.
7. Das Fenster **auf Handy-Breite** verkleinern: Navigation, Formular und Bilder prüfen.
8. Den **Text nach Resten** durchsuchen, die nicht dahin gehören (`[cite`, `TODO`, `Lorem`, `Source Title`).
9. Prüfen, ob **alle Dateien im Repository** gebraucht werden (z. B. die `.pptx` im Hauptordner).

---

## 3. Was noch offen ist

Diese Punkte sind keine Abstürze, könnten aber verbessert werden. Sie sind gute Themen für die Frage „Was würdest du noch verbessern?“.

| Thema | Beschreibung | Wo | Mögliche Lösung |
| --- | --- | --- | --- |
| Nicht definierte Klasse `italic` | Das Zitat in `definitions.html` soll kursiv sein, aber `italic` ist keine Bootstrap-Klasse und in den eigenen CSS-Dateien nicht definiert | `definitions.html`, Z. 114 | `font-italic` verwenden (Bootstrap 4) |
| Badge nur beim ersten Listeneintrag | „Next Chapter →“ steht nur beim ersten Eintrag, bei den anderen vier fehlt es | `introduction.html`, Z. 110 | bei allen Einträgen ein Badge anzeigen oder es entfernen |
| Gesperrte Links per Tastatur erreichbar | `disabled` sperrt nur die Maus (`pointer-events: none`). Mit Tab und Enter lässt sich der Link öffnen | `landing.html`, Z. 30–45 | zusätzlich `aria-disabled="true"` und `tabindex="-1"` setzen und beim Freischalten entfernen |
| Inhalt blitzt vor der Prüfung auf | `auth-check.js` läuft erst nach dem Laden der Seite | `auth-check.ts` | Inhalt vor der Prüfung verstecken (Kapitel 4) |
| Zurück-Button führt in eine Schleife | `window.location.href` legt einen Verlaufseintrag an | `auth-check.ts`, Z. 7 | `window.location.replace(...)` verwenden |
| E-Mail wird nicht genutzt | Die Adresse wird nur im Browser gespeichert und nie gesendet oder gelesen | `landing.ts`, Z. 83 | Feld entfernen oder an einen Dienst anbinden (und die Datenschutzhinweise ergänzen) |
| Navigation in jeder Datei kopiert | Eine Änderung muss in sieben Dateien erfolgen | alle HTML-Dateien | ein Build-Werkzeug oder ein Framework mit Komponenten |
| Gemeinsames CSS wiederholt | `body`, `.navbar`, `.hero` stehen in jeder CSS-Datei | `csr/css/*.css` | eine gemeinsame `base.css` (Kapitel 6) |
| `role="main"` am `<main>` | Doppelt gemeint, hat aber keine negative Wirkung | alle Seiten | optional entfernen |
| `.pptx` im Hauptordner | Gehört thematisch nicht zur Website | Hauptordner | in einen eigenen Ordner (z. B. `materials/`) verschieben oder entfernen |
| Kein Build-Prozess für TypeScript | `.ts` und `.js` müssen von Hand synchron gehalten werden | `csr/ts/` | eine `tsconfig.json` und ein npm-Skript zum Kompilieren |

---

## 4. Wartung: Wie man Änderungen sicher macht

**Wenn du `landing.ts` oder `auth-check.ts` änderst:**

1. Ändere die `.ts`-Datei.
2. Kompiliere sie neu: `npx tsc csr/ts/landing.ts csr/ts/auth-check.ts`.
3. Prüfe, dass die `.js`-Dateien aktualisiert wurden (Zeitstempel oder Git-Änderungen).
4. Lade die Seite mit **Strg + F5** neu (leert den Cache für diese Seite).
5. Prüfe Console und Network.

**Wenn du einen Schlüssel im `localStorage` umbenennst** (z. B. `csr_unlocked`), musst du ihn **überall** ändern: in `landing.ts` (Z. 19 und 84) und in `auth-check.ts` (Z. 3) **und** in den beiden übersetzten `.js`-Dateien. Mit der Suchfunktion des Editors (Strg + Shift + F) findest du alle Stellen.

**Wenn du eine Datei umbenennst oder verschiebst,** suche zuerst im ganzen Projekt nach dem alten Namen. Der Fehler mit dem PDF-Namen (Nr. 4) entstand genau so: Die Datei und der Verweis darauf wurden nicht gleichzeitig angepasst.

---

## Typische Fragen

**Was war der größte Fehler, und warum?**
Der fehlende Zugriffsschutz auf fünf von sechs Kapiteln (Nr. 3), weil er der Kernidee des Projekts widersprach: Die Kapitel sollten nur nach der Registrierung lesbar sein. Er blieb unbemerkt, weil nur der Weg über die Landing Page getestet wurde, nicht der Direktaufruf.

**Wie stellst du sicher, dass solche Fehler nicht wiederkommen?**
Mit einer festen Prüfliste vor jeder Veröffentlichung (siehe oben), mit einem Blick in den Reiter Network, und indem Dateien und Verweise darauf immer gemeinsam geändert werden. Bei größeren Projekten kommen automatische Prüfungen dazu (Linting, Tests, Link-Checker).

**Was bedeutet der Statuscode 404?**
„Not Found“: Der Server hat unter dieser Adresse keine Datei gefunden. Bei lokalen Dateien oder GitHub Pages bedeutet das fast immer einen falschen Pfad oder Dateinamen (auch Groß- und Kleinschreibung zählt).

**Warum fällt ein Tippfehler im Dateinamen nicht sofort auf?**
Browser zeigen bei einem fehlenden Bild nur den Alternativtext, und bei einem fehlenden Skript läuft die Seite einfach ohne Skript weiter. Fehler im Pfad sieht man nur in der Console und im Network-Reiter.

**Wie würdest du den Zugriffsschutz richtig lösen?**
Serverseitig: Ein Server prüft eine Anmeldung und liefert die Kapitel nur dann aus. Das ginge z. B. mit einem kleinen Backend (Node.js) oder einem Dienst für Authentifizierung (Kapitel 4).

---

## Mach es selbst

1. Öffne die Seite `facets.html` in deinem Browser und lösche vorher `csr_unlocked` im Local Storage. Was passiert? Setze den Eintrag danach wieder auf `"true"` und lade die Seite neu.
2. Benenne testweise `Studienarbeit.pdf` in `Studienarbeit_alt.pdf` um und schicke das Formular ab. Was siehst du im Reiter Network?
3. Suche im ganzen Projekt (Strg + Shift + F) nach `cite:`. Wie viele Treffer erwartest du, und wie viele findest du?
4. Ersetze in `definitions.html` (Z. 114) die Klasse `italic` durch `font-italic`. Wie ändert sich das Zitat?
5. Setze `aria-disabled="true"` und `tabindex="-1"` an die gesperrten Navigationslinks (`landing.html`, Z. 30–45) und entferne sie in `unlockNavigation()` (`landing.ts`). Wie verhält sich die Tastatur-Bedienung jetzt?
