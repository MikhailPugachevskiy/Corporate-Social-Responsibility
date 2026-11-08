# 4. Zugriffsschutz: Kapitel nur für freigeschaltete Nutzer

Die Kapitel sollen erst nach dem Ausfüllen des Formulars lesbar sein. Dafür gibt es zwei Teile:

1. **Freischalten:** `landing.ts` speichert nach dem Absenden den Wert `csr_unlocked = "true"` im `localStorage` (Kapitel 3).
2. **Prüfen:** Jede Kapitelseite lädt das kleine Skript `auth-check`, das diesen Wert liest. Fehlt er, wird der Besucher zur Landing Page zurückgeschickt.

Dieses Kapitel erklärt das Prüfskript und, genauso wichtig, **wo die Grenzen** eines solchen Schutzes liegen.

---

## Datei: `ts/auth-check.ts`

```ts
  1 | // Prüft auf Kapitelseiten, ob der Nutzer freigeschaltet ist
  2 | document.addEventListener("DOMContentLoaded", () => {
  3 |     const isUnlocked = localStorage.getItem("csr_unlocked") === "true";
  4 |
  5 |     if (!isUnlocked) {
  6 |         alert("Please complete the registration form on the landing page first to access the thesis chapters.");
  7 |         window.location.href = "landing.html";
  8 |     }
  9 | });
```

### Zeile für Zeile

- **Z. 1** Ein Kommentar auf Deutsch: Das Skript läuft auf den **Kapitelseiten**.
- **Z. 2** Wartet mit `DOMContentLoaded`, bis das HTML geladen ist (Kapitel 3).
- **Z. 3** Liest den Status aus dem `localStorage`. Der Vergleich `=== "true"` macht aus dem gespeicherten Text einen Wahrheitswert. Ist nichts gespeichert, liefert `getItem` den Wert `null`, und der Vergleich ergibt `false`.
- **Z. 5** `!isUnlocked` heißt: „Wenn der Nutzer **nicht** freigeschaltet ist“.
- **Z. 6** Zeigt eine Meldung. `alert` hält die Seite an, bis der Nutzer auf „OK“ klickt.
- **Z. 7** Schickt den Besucher zur Landing Page. Der Pfad `landing.html` gilt, weil alle Kapitelseiten im selben Ordner `html/` liegen.

## Datei: `ts/auth-check.js` (die übersetzte Fassung)

```js
  1 | // Prüft auf Kapitelseiten, ob der Nutzer freigeschaltet ist
  2 | document.addEventListener("DOMContentLoaded", function () {
  3 |     var isUnlocked = localStorage.getItem("csr_unlocked") === "true";
  4 |     if (!isUnlocked) {
  5 |         alert("Please complete the registration form on the landing page first to access the thesis chapters.");
  6 |         window.location.href = "landing.html";
  7 |     }
  8 | });
```

Die HTML-Seiten laden diese Datei, nicht die `.ts`-Datei. Die Logik ist identisch: nur `function` statt Pfeilfunktion und `var` statt `const`.

### Wie die Seiten das Skript einbinden

Alle sechs Kapitelseiten haben am Ende der Datei dieselbe Zeile, zum Beispiel `introduction.html` (Z. 165) und `definitions.html` (Z. 192):

```html
165 |     <script src="../ts/auth-check.js"></script>
```

**Ein gemeinsames Skript für alle Kapitel** hat Vorteile: Die Logik steht nur an einer Stelle, und ein Fehler (oder eine Änderung des Schlüssels) muss nur einmal korrigiert werden. Früher hatte jede Kapitelseite einen eigenen Dateinamen eingetragen, von denen die meisten nicht existierten. Dann lief die Prüfung nur auf einer Seite (siehe Kapitel 7).

---

## Der Ablauf im Überblick

| Situation | Was passiert |
| --- | --- |
| Besucher öffnet die Seite zum ersten Mal | Landing Page: Links in der Navigation sind gesperrt |
| Besucher füllt das Formular aus | `landing.ts` speichert `csr_unlocked = "true"` und `csr_user_data`, entsperrt die Links, startet den Download und öffnet Kapitel 1 |
| Besucher klickt auf ein Kapitel | Die Kapitelseite lädt `auth-check.js`, der Status stimmt, die Seite bleibt offen |
| Besucher öffnet ein Kapitel per Direktlink, ohne sich registriert zu haben | `auth-check.js` zeigt die Meldung und schickt den Besucher zur Landing Page |
| Besucher löscht den Local Storage | Der Status ist weg, der Zugriff ist wieder gesperrt |

Die beiden Schlüssel im `localStorage`:

| Schlüssel | Wert | Gesetzt von | Gelesen von |
| --- | --- | --- | --- |
| `csr_unlocked` | `"true"` | `landing.ts` (Z. 84) | `landing.ts` (Z. 19), `auth-check.js` (Z. 3) |
| `csr_user_data` | JSON-Text mit den Formulardaten | `landing.ts` (Z. 83) | wird derzeit nirgends gelesen |

---

## Die Grenzen des Schutzes

Das ist kein echter Zugriffsschutz. Es ist eine **Komfortsperre** für die Nutzerführung. Das sollte man in einem Gespräch deutlich sagen:

1. **Jeder kann den Status selbst setzen.** In der Konsole der Entwicklerwerkzeuge genügt `localStorage.setItem("csr_unlocked", "true")`.
2. **Die Inhalte sind öffentlich.** Das HTML jeder Kapitelseite wird vom Server an jeden ausgeliefert. Wer die URL kennt, kann den Quelltext lesen oder JavaScript im Browser abschalten, und das Skript läuft nicht.
3. **Das PDF ist ebenfalls öffentlich.** Wer den Pfad `…/assets/pdf/Studienarbeit.pdf` kennt, kann es direkt öffnen.
4. **Erst laden, dann prüfen.** Die Seite wird zuerst vollständig angezeigt und erst danach (nach `DOMContentLoaded`) geprüft. Der Besucher sieht den Inhalt also kurz, während die Meldung angezeigt wird.
5. **Die Daten gehören zum Browser.** `localStorage` gilt pro Browser und pro Adresse. Auf einem anderen Gerät oder in einem anderen Browser muss man das Formular erneut ausfüllen.

Ein **echter** Schutz müsste auf dem Server stattfinden: Der Server prüft eine Anmeldung (z. B. Sitzung oder Token) und liefert die Inhalte nur dann aus.

### Mögliche Verbesserungen

- **Inhalt verstecken, bis die Prüfung bestanden ist.** Die Seite startet z. B. mit einer Klasse `d-none` am `<main>`, und das Skript entfernt sie nur bei erfolgreicher Prüfung. So blitzt der Inhalt nicht kurz auf.
- **`window.location.replace("landing.html")` statt `window.location.href = …`.** Mit `href` landet die Landing Page im Browserverlauf. Der „Zurück“-Button führt dann wieder zur geschützten Seite, die sofort erneut umleitet (eine Schleife). `replace` ersetzt den Eintrag im Verlauf und vermeidet das.
- **Statt `alert` einen Hinweis in der Seite anzeigen,** der nicht blockiert.

---

## Typische Fragen

**Warum `localStorage` und nicht ein Cookie oder `sessionStorage`?**
`localStorage` bleibt auch nach dem Schließen des Browsers erhalten. `sessionStorage` würde beim Schließen des Tabs gelöscht (Nutzer müssten sich jedes Mal neu registrieren). Cookies werden bei jeder Anfrage an den Server geschickt und wären für eine rein clientseitige Lösung unnötig.

**Ist das sicher?**
Nein. Die Prüfung ist rein clientseitig und kann umgangen werden. Für eine Studienarbeit, bei der es um Führung und einen Lerneffekt geht und nicht um geheime Inhalte, ist das akzeptabel, solange man es so benennt.

**Warum liegt `auth-check` als eigene Datei vor und nicht in jeder Seite?**
So gibt es genau eine Stelle für die Logik. Das folgt dem Prinzip „Don’t repeat yourself“ (DRY). Alternativ könnte man das Skript auch in `landing.ts` einbauen, dann würde es aber auch auf der Landing Page laufen, wo es nicht gebraucht wird.

**Was würde passieren, wenn `csr_unlocked` den Wert `"True"` (großes T) hätte?**
Der Vergleich `=== "true"` wäre falsch, und der Zugriff bliebe gesperrt. Strings werden in JavaScript genau verglichen, auch in der Groß- und Kleinschreibung.

---

## Mach es selbst

1. Öffne `definitions.html` direkt, ohne dich registriert zu haben (zuerst `csr_unlocked` im Local Storage löschen). Was passiert?
2. Setze in der Konsole `localStorage.setItem("csr_unlocked", "true")` und lade `facets.html`. Was beweist das über die Sicherheit?
3. Ändere in Z. 7 `window.location.href` in `window.location.replace`. Teste den „Zurück“-Button, wenn du die Seite ohne Freischaltung öffnest. Was ist anders?
4. Setze in `auth-check.ts` den Schlüssel auf `"csr_access"`. Was musst du noch ändern, damit alles funktioniert (Hinweis: Kapitel 3, Z. 19 und 84, und die übersetzte `.js`-Datei)?
