let logStato = "In attesa del Server Node.js...";
fiduciali = {}; 
cursori = {};


function setup() {
  createCanvas(windowWidth, windowHeight);
  
  let socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function(event) {
  let dati = JSON.parse(event.data);
  
  // 1. GESTIONE SET
  if (dati.type === "/tuio/2Dobj") {
    fiduciali[dati.session_id] = { id: dati.class_id, x: dati.x*width, y: dati.y*height, angle: dati.angle };
  } else if (dati.type === "/tuio/2Dcur") {
    cursori[dati.session_id] = { x: dati.x*width, y: dati.y*height };
  }
  
  // 2. GESTIONE PULIZIA (ALIVE)
  else if (dati.type === "alive") {
    let targetObj = (dati.source === "/tuio/2Dobj") ? fiduciali : cursori;
    for (let sid in targetObj) {
      if (!dati.session_ids.includes(Number(sid))) {
        delete targetObj[sid];
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
    
    
   //if (f.class_id !== undefined) {
   //   //drawFiducial(f);
    noFill();
    stroke(0, 255, 200);
    strokeWeight(4);
    ellipse(f.x, f.y, 90, 90);
    
    colorMode(HSB, 100);
    fill(f.y*100/height,100,100);
    stroke(0, 255, 200);
    strokeWeight(4);
    triangle(0,0,width,0,f.x, f.y, 90, 90);

    colorMode(RGB, 255);
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    // Mostriamo il numero stampato (class_id), non la sessione!
    text(f.id, width-f.x, f.y);

    stroke(0,255, 200);
    strokeWeight(4);
    push();
    translate(f.x, f.y);
    rotate(f.angle);
    line(0, 0, 45, 0);
    pop();
    
    }
    
    for (let sid in cursori) {
    let c = cursori[sid];
  
    // Altrimenti, è un CURSORE (tocco)
    // else {
      
      // Disegno specifico per i cursori (es. un cerchio pieno più piccolo)
      fill(255, 0, 100);
      noStroke();
      ellipse(c.x, c.y, 30, 30);
    // }
  }
}
