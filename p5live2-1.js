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
    ellipse(width-f.x, f.y, 90, 90);
    
    colorMode(HSB, 100);
    fill(f.y*100/height,100,100);
    stroke(0, 255, 200);
    strokeWeight(4);
    triangle(0,0,width,0,width-f.x, f.y, 90, 90);

    colorMode(RGB, 255);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    // Mostriamo il numero stampato (class_id), non la sessione!
    text(f.class_id, width-f.x, f.y);

    stroke(0,255, 200);
    strokeWeight(4);
    push();
    translate(width-f.x, f.y);
    rotate(f.angolo);
    line(0, 0, 45, 0);
    pop();
  }
}