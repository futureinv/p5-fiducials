// tracking.js
window.fiduciali = {}; 
let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  console.log("✅ WebSocket collegato al server!");
};

socket.onmessage = function(event) {
  let dati = JSON.parse(event.data);
  
  if (dati.type === "set") {
    // Gestione unificata: salviamo tutto in 'fiduciali' 
    // ma aggiungiamo un campo 'tipo' per distinguerli
    fiduciali[dati.session_id] = {
      tipo: dati.tipo_oggetto, // es: 'fiducial' o 'cursor'
      class_id: dati.class_id, 
      x: dati.x * width,
      y: dati.y * height,
      angolo: dati.angle || 0 // I cursori spesso non hanno angolo
    };
  }