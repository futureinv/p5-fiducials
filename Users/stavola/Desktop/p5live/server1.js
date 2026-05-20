const OSC = require("osc");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("[Bridge Node] Server WebSocket in attesa su ws://localhost:8080");

// Spia 1: Ci dice se P5.js riesce ad agganciarsi
wss.on("connection", () => {
    console.log("🟢 BINGO! P5.js si è connesso al server Node!");
});

const oscPort = new OSC.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3333,
    metadata: true
});

oscPort.on("message", (oscMsg) => {
    if (oscMsg.address === "/tuio/2Dobj" && oscMsg.args[0].value === "set") {
        
        // Indici corretti del protocollo TUIO!
        const payload = JSON.stringify({
            id: oscMsg.args[2].value,     // class_id (Il numero del marker)
            x: oscMsg.args[3].value,      // Posizione X reale
            y: oscMsg.args[4].value,      // Posizione Y reale
            angle: oscMsg.args[5].value   // Angolo reale
        });

        console.log("Spedisco a p5:", payload);

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(payload);
            }
        });
    }
});

oscPort.open();
console.log("[Bridge Node] Ascolto reacTIVision attivo su UDP 3333...");