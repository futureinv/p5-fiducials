function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  // Protezione: se window.fiduciali non esiste, crealo subito qui
  if (typeof window.fiduciali === 'undefined') {
    window.fiduciali = {};
  }
  
  // Ora possiamo contare in sicurezza
  let conteggio = Object.keys(window.fiduciali).length;
  
  fill(255);
  text("Fiduciali rilevati: " + conteggio, 20, 20);
  
  // Ciclo sicuro
  for (let sid in window.fiduciali) {
    let f = window.fiduciali[sid];
    fill(f.x*255, f.y*255, 126,f.angle*255/6.28);
    ellipse(f.x * width, f.y * height, 5, 5);
    triangle(0,0,width,0,f.x * width, f.y * height)
  }
}