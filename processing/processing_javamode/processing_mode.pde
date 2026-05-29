void setup() {
  size(800, 600);
  setupMotore(); // Inizializza il Motore TUIO
}

void draw() {
  aggiornaDatiTUIO(); // Prende i dati aggiornati dal "Motore"
  background(255);
  
  // --- LAVORA CON I FIDUCIALI (f) ---
  for (TuioObject f : fiduciali) {
    float x = f.getX() * width;
    float y = f.getY() * height;
    int id = f.getSymbolID();
    
    // Esempio: Disegna il fiduciale
    fill(0);
    ellipse(x, y, 20, 20);
    text("Fiduciale: " + id, x + 10, y);
  }
  
  // --- LAVORA CON I CURSORI (c) ---
  for (TuioCursor c : cursori) {
    float x = c.getX() * width;
    float y = c.getY() * height;
    
    // Esempio: Disegna il tocco
    fill(255, 0, 0, 150);
    ellipse(x, y, 50, 50);
  }
}
