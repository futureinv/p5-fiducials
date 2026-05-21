// Sketch.js - Versione con visualizzazione cerchi
let socket;
let fiducials = []; // Array per memorizzare i dati dei marker

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Connessione al server locale
  socket = io.connect('http://localhost:3000');
  
  socket.on('data', function(data) {
    // Aggiorniamo l'array dei fiducials con i dati ricevuti dal server
    fiducials = data; 
  });
}

function draw() {
  background(20); // Sfondo scuro per far risaltare i cerchi
  
  // Disegna un cerchio per ogni fiducial ricevuto
  for (let f of fiducials) {
    let x = map(f.x, 0, 1, 0, width);
    let y = map(f.y, 0, 1, 0, height);
    
    // Cambia colore in base all'ID del marker
    fill(f.id * 50 % 255, 150, 255);
    noStroke();
    
    // Disegna il cerchio
    ellipse(x, y, 50, 50);
    
    // Scrive l'ID sopra il cerchio
    fill(255);
    textAlign(CENTER, CENTER);
    text("ID: " + f.id, x, y);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}