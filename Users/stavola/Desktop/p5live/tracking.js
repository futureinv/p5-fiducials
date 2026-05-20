
// tracking.js
let fiduciali = {};
let socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
  console.log("✅ WebSocket collegato al server!");
};

socket.onmessage = function(event) {
  console.log("📩 Dati ricevuti:", event.data); // Aggiungi questo log
  let dati = JSON.parse(event.data);
  // ... resto del codice

socket.onmessage = function(event) {
  let dati = JSON.parse(event.data);
  if (dati.type === "set") {
    fiduciali[dati.session_id] = { id: dati.class_id, x: dati.x * width, y: dati.y * height, angle: dati.angle };
  } else if (dati.type === "alive") {
    for (let sid in fiduciali) {
      if (!dati.session_ids.includes(Number(sid))) delete fiduciali[sid];
    }
  }
};