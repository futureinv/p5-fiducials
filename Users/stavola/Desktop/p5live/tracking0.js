// tracking.js
window.fiduciali = {}; 
let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  console.log("✅ WebSocket collegato al server!");
};

socket.onmessage = function(event) {
  try {
    let dati = JSON.parse(event.data);
    
    if (dati.type === "set") {
      // Aggiorna o crea il fiduciale
      window.fiduciali[dati.session_id] = { 
        id: dati.class_id, 
        x: dati.x, 
        y: dati.y, 
        angle: dati.angle 
      };
    } 
    else if (dati.type === "alive") {
      // PULIZIA: confronta i fiduciali attivi con quelli che abbiamo in memoria
      let session_ids_attivi = dati.session_ids; // Array dei fiduciali visti ora
      
      for (let sid in window.fiduciali) {
        // Se l'ID in memoria NON è presente nell'array dei vivi, eliminalo
        if (!session_ids_attivi.includes(Number(sid))) {
          delete window.fiduciali[sid];
          console.log("Fiduciale rimosso:", sid);
        }
      }
    }
  } catch (err) {
    console.error("Errore nel parsing:", err);
  }
};