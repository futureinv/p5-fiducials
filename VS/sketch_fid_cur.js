function draw() {
  background(20);

  // Cicla sui fiduciali
  for (let sid in window.fiduciali) {
    let f = window.fiduciali[sid];
    // Disegna il fiduciale...
  }

  // Cicla sui cursori
  for (let sid in window.cursori) {
    let c = window.cursori[sid];
    // Disegna il cursore (es. un cerchio piccolo)...
    fill(255, 0, 0);
    ellipse(c.x * width, c.y * height, 20, 20);
  }
}