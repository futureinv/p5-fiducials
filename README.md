# P5-Fiducials Tracking System

Sistema di tracciamento di **fiducials**, i marker visivi di [reacTIVision](https://reactivision.sourceforge.net/) per interazioni in tempo reale. Il progetto gestisce l'acquisizione dei fiducials, la loro elaborazione tramite server [Node.js](https://nodejs.org/) e la visualizzazione dinamica in **VS Code**.
## 💻 Ambiente di Sviluppo
Il progetto è ottimizzato per l'utilizzo con [VS Code](https://code.visualstudio.com/). Si consiglia l'uso di questo editor per gestire il terminale integrato, il debugging dei file `.js` e la sincronizzazione con Git.
In alternativa è possibile utilizzare anche [P5LIVE](https://teddavis.org/p5live/)

## 📂 Componenti del Progetto

Il sistema è composto dai seguenti file principali:

* **`index.html`**: Struttura base dell'interfaccia.
* **`sketch.js`**: Logica di visualizzazione **p5.js** (versione corrente).
* **`tracking.js`**: Algoritmo di gestione del tracciamento dei fiducials.
* **`server.js`**: Motore backend per la gestione delle connessioni.

> **Nota:** Il repository include diverse versioni numerate (es. `sketch0.js`, `tracking0.js`) che rappresentano lo storico delle iterazioni del progetto.

## 🚀 Guida all'avvio

  # Per eseguire il progetto con [VS Code](https://code.visualstudio.com/)

  0.	**Assicurati di avere installati:** [VS Code](https://code.visualstudio.com/) e OSC

 
    
2.	**Installa le dipendenze:**
       anche direttamente dal terminale di VS
    
    ```bash
    npm install osc
    ```
    
3.	**Avvia il server:**
    
    ```bash
    node server.js
    ```
    
    oppure puoi utilizzare i file .bat inclusi (AVVIA_SERVER.bat o start.bat) per automatizzare l'avvio.
    
4.	**esegui lo Sketch**
      lanciando "index.html"
      
5.	**muovi i fiducial davanti la webcam**





# per eseguire il progetto con [P5LIVE](https://teddavis.org/p5live/)

  0. **vai alla pagina [P5LIVE](https://teddavis.org/p5live/)**
  
  1. **Installa le dipendenze e avvia il server dal terminale**
       
  
  ```bash
  npm install osc
  ```
  
  
  ```bash
  node server.js
  ```
  
  oppure puoi utilizzare i file .bat inclusi (AVVIA_SERVER.bat o start.bat) per automatizzare l'avvio.
  
  2. **esegui lo Sketch**
  copiando questo nell'editor
  ```javascript
  let logStato = "In attesa del Server Node.js...";
  let fiduciali = {}; // Qui salviamo gli oggetti usando la loro session_id
  
  function setup() {
    createCanvas(windowWidth, windowHeight);
    let socket = new WebSocket("ws://localhost:8080");
  
    socket.onopen = function() {
      logStato = "🟢 Node connesso! Sistema stabile e preciso.";
    };
  
    socket.onmessage = function(event) {
      let dati = JSON.parse(event.data);
      
      // Aggiorniamo o aggiungiamo il fiducial
      if (dati.type === "set") {
        fiduciali[dati.session_id] = {
          class_id: dati.class_id, // È il numero che ti interessa mostrare
          x: dati.x * width,
          y: dati.y * height,
          angolo: dati.angle
        };
      } 
      // Facciamo le pulizie quando la telecamera fa l'appello
      else if (dati.type === "alive") {
        let presenti = dati.session_ids; 
        
        // Controlliamo ogni oggetto che abbiamo in memoria
        for (let sid in fiduciali) {
          // Se la session_id non è più nella lista dei presenti... è stato sollevato!
          if (!presenti.includes(Number(sid))) {
            delete fiduciali[sid]; 
          }
        }
      }
    };
  }
  
  function draw() {
    background(20, 20, 35, 60);
  
    // Pannello Testi
    fill(255);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text(logStato, 20, 20);
    fill(0, 255, 200);
    text("Oggetti stabili sul tavolo: " + Object.keys(fiduciali).length, 20, 50);
  
    // Disegno oggetti
    for (let sid in fiduciali) {
      let f = fiduciali[sid];
  
      noFill();
      stroke(0, 255, 200);
      strokeWeight(4);
      ellipse(f.x, f.y, 90, 90);
  
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(22);
      // Mostriamo il numero stampato (class_id), non la sessione!
      text(f.class_id, f.x, f.y);
  
      stroke(255, 102, 0);
      strokeWeight(4);
      push();
      translate(f.x, f.y);
      rotate(f.angolo);
      line(0, 0, 45, 0);
      pop();
    }
  }
  ```
3. muovi i fiducial davanti la webcam

🛠 Note Tecniche
Il progetto utilizza una struttura modulare per facilitare il passaggio tra le diverse versioni di tracking.
Il file .gitignore è configurato per mantenere il repository pulito, ignorando le cartelle pesanti come node_modules.

📜 Note sulla versione (v1.0)
Questa è la prima release stabile. Il codice è stato organizzato per garantire una struttura chiara e una facile consultazione delle iterazioni passate.

# ENG VERSION
# P5-Fiducials Tracking System

A tracking system for **fiducials** (the visual markers from [reacTIVision](https://reactivision.sourceforge.net/)) for real-time interaction. The project manages fiducial acquisition, backend processing via [Node.js](https://nodejs.org/), and dynamic visualization in **VS Code**.

## 💻 Development Environment
The project is optimized for use with [VS Code](https://code.visualstudio.com/). We recommend using this editor to manage the integrated terminal, debug `.js` files, and handle Git synchronization.
Alternatively, you can also use [P5LIVE](https://teddavis.org/p5live/).

## 📂 Project Structure

The system consists of the following main files:

* **`index.html`**: Basic interface structure.
* **`sketch.js`**: Current version of the **p5.js** visualization logic.
* **`tracking.js`**: Algorithm for fiducial tracking management.
* **`server.js`**: Backend engine for connection management.

> **Note:** The repository includes several numbered versions (e.g., `sketch0.js`, `tracking0.js`) representing the project's development history.

## 🚀 Getting Started

### To run the project with [VS Code](https://code.visualstudio.com/)

0. **Ensure you have it installed.**

1. **Install dependencies:**
   You can run this directly from the VS Code terminal:
   ```bash
   npm install osc
   ```

2. **Start the server:**

 ```bash
  node server.js
   ```

   Alternatively, you can use the provided `.bat` files (`AVVIA_SERVER.bat` or `start.bat`) to automate the startup.

3. **Run the Sketch:**
   Open `index.html` in your browser.

4. **Tracking:**
   Move your fiducials in front of the webcam.

---

### To run the project with [P5LIVE](https://teddavis.org/p5live/)

0. **Visit the [P5LIVE](https://teddavis.org/p5live/) website.**

1. **Install dependencies and start the server from your terminal:**
   ```bash
   npm install osc
   ```
   ```Bash
   node server.js
   ```

(Or use the provided .bat files for automation).

2. **Run the Sketch:**
Copy and paste the following code into the P5LIVE editor:

```JavaScript
let logStato = "Waiting for Node.js Server...";
let fiduciali = {}; // Stores objects using their session_id

function setup() {
  createCanvas(windowWidth, windowHeight);
  let socket = new WebSocket("ws://localhost:8080");

  socket.onopen = function() {
    logStato = "🟢 Node connected! System stable and precise.";
  };

  socket.onmessage = function(event) {
    let dati = JSON.parse(event.data);

    if (dati.type === "set") {
      fiduciali[dati.session_id] = {
        class_id: dati.class_id,
        x: dati.x * width,
        y: dati.y * height,
        angolo: dati.angle
      };
    } 
    else if (dati.type === "alive") {
      let presenti = dati.session_ids; 
      for (let sid in fiduciali) {
        if (!presenti.includes(Number(sid))) {
          delete fiduciali[sid]; 
        }
      }
    }
  };
}

function draw() {
  background(20, 20, 35, 60);

  // Status Panel
  fill(255);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  text(logStato, 20, 20);
  fill(0, 255, 200);
  text("Objects on table: " + Object.keys(fiduciali).length, 20, 50);

  // Drawing Objects
  for (let sid in fiduciali) {
    let f = fiduciali[sid];

    noFill();
    stroke(0, 255, 200);
    strokeWeight(4);
    ellipse(f.x, f.y, 90, 90);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(f.class_id, f.x, f.y);

    stroke(255, 102, 0);
    strokeWeight(4);
    push();
    translate(f.x, f.y);
    rotate(f.angolo);
    line(0, 0, 45, 0);
    pop();
  }
}
```

3.	**Tracking:**
   Move your fiducials in front of the webcam.


## 🛠 Technical Notes
* The project uses a modular structure to facilitate switching between different tracking versions.
* The `.gitignore` file is configured to keep the repository clean by ignoring heavy folders like `node_modules`.

## 📜 Version History (v1.0)
This is the first stable release. The code has been organized to ensure a clear structure and easy reference to past iterations.

