window.fiduciali = {}; 
window.cursori = {};
let socket = new WebSocket("ws://localhost:8080");

socket.onmessage = function(event) {
  let dati = JSON.parse(event.data);
  
  // 1. GESTIONE SET
  if (dati.type === "/tuio/2Dobj") {
    window.fiduciali[dati.session_id] = { id: dati.class_id, x: dati.x, y: dati.y, angle: dati.angle };
  } else if (dati.type === "/tuio/2Dcur") {
    window.cursori[dati.session_id] = { x: dati.x, y: dati.y };
  }
  
  // 2. GESTIONE PULIZIA (ALIVE)
  else if (dati.type === "alive") {
    let targetObj = (dati.source === "/tuio/2Dobj") ? window.fiduciali : window.cursori;
    for (let sid in targetObj) {
      if (!dati.session_ids.includes(Number(sid))) {
        delete targetObj[sid];
      }
    }
  }
};