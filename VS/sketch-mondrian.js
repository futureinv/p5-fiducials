// DICHIARA LE VARIABILI QUI (fuori dalle funzioni)
let lineaX, lineaY, lineaXX, lineaYY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Valori iniziali di default
  lineaX = width / 3;
  lineaY = height / 3;
  lineaXX = width * 2 / 3;
  lineaYY = height * 2 / 3;
}

function draw() {
  background(255); 
  stroke(0);
  strokeWeight(8);

  // 1. AGGIORNAMENTO DINAMICO
  for (let sid in window.fiduciali) {
    let f = window.fiduciali[sid];
    if (f.id == 0) {
      lineaX = f.x * width;
      lineaY = f.y * height;
    }
    if (f.id == 1) {
      lineaXX = f.x * width;
      lineaYY = f.y * height;
    }
  }

  // 2. DISEGNO GRIGLIA
  line(lineaX, 0, lineaX, height);
  line(0, lineaY, width, lineaY);
  line(lineaXX, 0, lineaXX, height);
  line(0, lineaYY, width, lineaYY);

  // 3. COLORI (Rettangoli)
 // Definiamo i colori per semplicità
  let c0 = "#FF0000"; // Rosso
  let c1 = "#0000FF"; // Blu
  let c2 = "#FFFF00"; // Giallo
  let c3 = "#000000"; // Nero

  noStroke();

  // RIGA 1
  fill(c0); rect(0, 0, lineaX, lineaY);                                  // Rettangolo 1
  fill(c1); rect(lineaX, 0, lineaXX - lineaX, lineaY);                 // Rettangolo 2
  fill(c2); rect(lineaXX, 0, width - lineaXX, lineaY);                 // Rettangolo 3

  // RIGA 2
  fill(c3); rect(0, lineaY, lineaX, lineaYY - lineaY);                 // Rettangolo 4
  fill(c0); rect(lineaX, lineaY, lineaXX - lineaX, lineaYY - lineaY);  // Rettangolo 5
  fill(c1); rect(lineaXX, lineaY, width - lineaXX, lineaYY - lineaY);  // Rettangolo 6

  // RIGA 3
  fill(c2); rect(0, lineaYY, lineaX, height - lineaYY);                // Rettangolo 7
  fill(c3); rect(lineaX, lineaYY, lineaXX - lineaX, height - lineaYY); // Rettangolo 8
  fill(c0); rect(lineaXX, lineaYY, width - lineaXX, height - lineaYY); // Rettangolo 9

  
  // ... (aggiungi gli altri rect allo stesso modo)

  // 4. INTERAZIONE CURSORI
  for (let sid in window.cursori) {
    let c = window.cursori[sid];
    fill(255, 100);
    ellipse(c.x * width, c.y * height, 100, 100);
  }
}