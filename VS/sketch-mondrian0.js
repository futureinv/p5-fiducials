function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
background(255); // Fondo bianco candido tipico di Mondrian
stroke(0); // Linee nere spesse
strokeWeight(8);

// 1. CREIAMO LE LINEE DINAMICHE
// Usiamo il primo fiduciale trovato (se esiste) per muovere una linea verticale
let lineaX = width / 2;
let lineaY = height / 2;

for (let sid in window.fiduciali) {
let f = window.fiduciali[sid];
if (f.id == 0) lineaX = f.x * width; // Il fiduciale 0 sposta la linea verticale
if (f.id == 1) lineaY = f.y * height; // Il fiduciale 1 sposta la linea orizzontale
}

line(lineaX, 0, lineaX, height);
line(0, lineaY, width, lineaY);

// 2. CREIAMO I "COLORI" (i rettangoli)
// Definiamo 4 zone (i 4 quadranti creati dalle linee)
let colori = ["#FF0000", "#0000FF", "#FFFF00", "#000000"]; // Rosso, Blu, Giallo, Nero

noStroke();
fill(colori[0]); rect(0, 0, lineaX, lineaY);
fill(colori[1]); rect(lineaX, 0, width - lineaX, lineaY);
fill(colori[2]); rect(0, lineaY, lineaX, height - lineaY);
fill(colori[3]); rect(lineaX, lineaY, width - lineaX, height - lineaY);

// 3. INTERAZIONE CON I CURSORI
// Se un cursore passa sopra, cambiamo il colore di quella zona (o aggiungiamo un effetto)
for (let sid in window.cursori) {
let c = window.cursori[sid];
fill(255, 100); // Bianco semitrasparente per "pulire"
ellipse(c.x * width, c.y * height, 100, 100);
}
}