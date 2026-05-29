# P5-Fiducials Tracking System

Sistema di tracciamento di **fiducials** (marker [reacTIVision](https://reactivision.sourceforge.net/)) per interazioni in tempo reale. Il sistema acquisisce i dati, li elabora tramite un server [Node.js](https://nodejs.org/) e li invia a sketch [p5.js](https://p5js.org/).

## 🛠 Modalità di Utilizzo

### 1. In Locale (VS Code o Processing - p5js mode)
VS è ideale per performance stabili e senza latenza di rete.
* **Ambiente:** [Visual Studio Code](https://code.visualstudio.com/) + estensione *Live Server*.
* **Setup:**
    1. Installa le dipendenze: `npm install osc`.
    2. Avvia il server: `node server.js` (o usa i file `.bat` inclusi).
    3. Avvia lo sketch tramite *Live Server* su VS Code.
    4. Il sistema comunicherà tramite `ws://localhost:8080`.
 
  A me l'interfaccia di VS non piace molto, quindi ho testato anche l'IDE di **[Processing](https://processing.org/)** in modalita p5js, funziona molto bene, ma non è ancora capace di rilevare errori... quindi il debug è un po' difficile. Giudizio valido come strumento didattico ma non di sviluppo.
  Per impostarlo per il javascript dal menù a tendina in alto a destra, dove di solito tovi la modalità "java", puoi aggiungere la **p5.js Mode (experimental)** che ti permette di inserire la struttura che vedi sotto "index.html", "sketch.js"...

### 2. Su Browser (P5LIVE o p5js.org + ngrok)
Ideale per demo, lezioni o condivisione rapida online.
* **Ambiente:** [P5LIVE](https://teddavis.org/p5live/).
* **Setup:**
    1. Avvia il server `node server.js` in locale.
    2. Avvia reactivision o un TUIO simulator
    3. Remixa questo [P5live project](https://p5live.org/?code=bGV0IGxvZ1N0YXRvID0gIkluIGF0dGVzYSBkZWwgU2VydmVyIE5vZGUuanMuLi4iOw0KZmlkdWNpYWxpID0ge307IA0KY3Vyc29yaSA9IHt9Ow0KDQoNCmZ1bmN0aW9uIHNldHVwKCkgew0KICBjcmVhdGVDYW52YXMod2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7DQogIA0KICBsZXQgc29ja2V0ID0gbmV3IFdlYlNvY2tldCgid3M6Ly9sb2NhbGhvc3Q6ODA4MCIpOw0KDQpzb2NrZXQub25tZXNzYWdlID0gZnVuY3Rpb24oZXZlbnQpIHsNCiAgbGV0IGRhdGkgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpOw0KICANCiAgLy8gMS4gR0VTVElPTkUgU0VUDQogIGlmIChkYXRpLnR5cGUgPT09ICIvdHVpby8yRG9iaiIpIHsNCiAgICBmaWR1Y2lhbGlbZGF0aS5zZXNzaW9uX2lkXSA9IHsgaWQ6IGRhdGkuY2xhc3NfaWQsIHg6IGRhdGkueCp3aWR0aCwgeTogZGF0aS55KmhlaWdodCwgYW5nbGU6IGRhdGkuYW5nbGUgfTsNCiAgfSBlbHNlIGlmIChkYXRpLnR5cGUgPT09ICIvdHVpby8yRGN1ciIpIHsNCiAgICBjdXJzb3JpW2RhdGkuc2Vzc2lvbl9pZF0gPSB7IHg6IGRhdGkueCp3aWR0aCwgeTogZGF0aS55KmhlaWdodCB9Ow0KICB9DQogIA0KICAvLyAyLiBHRVNUSU9ORSBQVUxJWklBIChBTElWRSkNCiAgZWxzZSBpZiAoZGF0aS50eXBlID09PSAiYWxpdmUiKSB7DQogICAgbGV0IHRhcmdldE9iaiA9IChkYXRpLnNvdXJjZSA9PT0gIi90dWlvLzJEb2JqIikgPyBmaWR1Y2lhbGkgOiBjdXJzb3JpOw0KICAgIGZvciAobGV0IHNpZCBpbiB0YXJnZXRPYmopIHsNCiAgICAgIGlmICghZGF0aS5zZXNzaW9uX2lkcy5pbmNsdWRlcyhOdW1iZXIoc2lkKSkpIHsNCiAgICAgICAgZGVsZXRlIHRhcmdldE9ialtzaWRdOw0KICAgICAgfQ0KICAgIH0NCiAgfQ0KfTsNCiAgDQp9DQoNCmZ1bmN0aW9uIGRyYXcoKSB7DQogYmFja2dyb3VuZCgwKTsgDQoNCmZvciAobGV0IHNpZCBpbiB3aW5kb3cuZmlkdWNpYWxpKSB7DQpsZXQgZiA9IHdpbmRvdy5maWR1Y2lhbGlbc2lkXTsNCg0KfQ0KDQpmb3IgKGxldCBzaWQgaW4gd2luZG93LmN1cnNvcmkpIHsNCmxldCBjID0gd2luZG93LmN1cnNvcmlbc2lkXTsNCg0KDQp9DQoNCg0KfQ0K)
  
 
* **Ambiente:** [p5.js Web Editor](https://editor.p5js.org/).
* **Setup con ngrok:**
    1. Avvia il server `node server.js` in locale.
    2. Crea un tunnel pubblico con `ngrok http 8080`.
    3. Copia l'indirizzo `wss://...` fornito da ngrok.
    4. Incolla l'indirizzo in questo progetto (https://editor.p5js.org/fabbrista/sketches/nUKw1eUHi) che rende dinamico una reinterpretazione di Mondrian con i fiducial.
    5. Remixa il progetto.


---

## 📂 Struttura del Progetto

* **`index.html`**: Struttura base.
* **`sketch.js`**: Logica di visualizzazione (la parte creativa).
* **`tracking.js`**: Motore di ricezione dati WebSocket (la parte tecnica).
* **`server.js`**: Backend di gestione connessioni.

> **Nota:** Per mantenere il codice pulito, il codice qui è estato diviso in `tracking.js` e `sketch.js`, il primo gestisce i dati TUIO il secondo i disegni, nell'HTML quindi va iserito *prima* `tracking.js` e *poi* `sketch.js`. In questo modo `sketch.js` potrà accedere liberamente alle variabili `window.fiduciali` e `window.cursori` senza dover gestire la rete. Questa cosa in *P5live* non può avvenire e quindi lo sketch è unico e contiene tutto.

---

## 🚀 Guida Rapida all'Avvio
Per automatizzare il setup su Windows, usa i file `.bat` presenti nella cartella:
* `AVVIA_SERVER.bat`: Lancia Node.js.
* `START_TUNNEL.bat`: Lancia ngrok (se necessario per il web).

---

## 🛠 Note Tecniche
* Il progetto è modulare: separa la logica di tracciamento dalla visualizzazione grafica.
* **Debug:** Se i dati non arrivano, apri la Console (F12) del browser. Se vedi errori WebSocket, verifica che l'URL `wss://` sia corretto e non contenga virgolette.
* **Persistent Storage:** Il codice utilizza `localStorage` per salvare automaticamente l'indirizzo dell'ultimo server utilizzato, evitando di doverlo incollare a ogni riavvio.

---
