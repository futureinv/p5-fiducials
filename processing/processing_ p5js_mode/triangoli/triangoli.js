function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
background(0); // Fondo bianco candido tipico di Mondrian


for (let sid in window.fiduciali) {
let f = window.fiduciali[sid];
//if (f.id == 0) lineaX = f.x * width; // Il fiduciale 0 sposta la linea verticale
//if (f.id == 1) lineaY = f.y * height; // Il fiduciale 1 sposta la linea orizzontale
stroke("orange");
line(0,0,f.x*width,f.y*height);
colorMode(HSL,100);
fill(f.y*100,100,50);
triangle(f.x*width,f.y*height,0,height,width,height)

}


// 3. INTERAZIONE CON I CURSORI
// Se un cursore passa sopra, cambiamo il colore di quella zona (o aggiungiamo un effetto)
for (let sid in window.cursori) {
let c = window.cursori[sid];
fill(255, 100); // Bianco semitrasparente per "pulire"
ellipse(c.x * width, c.y * height, 100, 100);
}
}
