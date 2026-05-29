function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(20);
  
  // Scriviamo qualcosa per vedere se il browser è vivo
  fill(255);
  textAlign(CENTER);
  text("Se vedi questo, il browser è collegato!", width/2, height/2);
  
  // Qui disegniamo i fiduciali
  for (let sid in fiduciali) {
    let f = fiduciali[sid];
    fill(0, 255, 200);
    ellipse(f.x*width, f.y*height, 50, 50);
  }
}