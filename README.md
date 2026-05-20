# P5-Fiducials Tracking System

Sistema di tracciamento di "fiducials" (marker visivi) per interazioni in tempo reale. Il progetto gestisce l'acquisizione dei marker, la loro elaborazione tramite server Node.js e la visualizzazione dinamica in **p5.js**.
## 💻 Ambiente di Sviluppo
Il progetto è ottimizzato per l'utilizzo con **Visual Studio Code (VS Code)**. Si consiglia l'uso di questo editor per gestire il terminale integrato, il debugging dei file `.js` e la sincronizzazione con Git.

## 📂 Componenti del Progetto

Il sistema è composto dai seguenti file principali:

* **`index.html`**: Struttura base dell'interfaccia.
* **`sketch.js`**: Logica di visualizzazione **p5.js** (versione corrente).
* **`tracking.js`**: Algoritmo di gestione del tracciamento dei fiducials.
* **`server.js`**: Motore backend per la gestione delle connessioni.

> **Nota:** Il repository include diverse versioni numerate (es. `sketch0.js`, `tracking0.js`) che rappresentano lo storico delle iterazioni del progetto.

## 🚀 Guida all'avvio

Per eseguire il progetto, assicurati di avere [Node.js](https://nodejs.org/) installato.

1. **Installa le dipendenze:**

```bash
npm install
```

2. **Avvia il server:**

```bash
node server.js
```

oppure puoi utilizzare i file .bat inclusi (AVVIA_SERVER.bat o start.bat) per automatizzare l'avvio.

🛠 Note Tecniche
Il progetto utilizza una struttura modulare per facilitare il passaggio tra le diverse versioni di tracking.

Il file .gitignore è configurato per mantenere il repository pulito, ignorando le cartelle pesanti come node_modules.

📜 Note sulla versione (v1.0)
Questa è la prima release stabile. Il codice è stato organizzato per garantire una struttura chiara e una facile consultazione delle iterazioni passate.

