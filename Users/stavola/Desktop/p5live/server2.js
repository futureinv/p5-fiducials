const OSC = require("osc");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("[Bridge Node] Server WebSocket pronto su ws://localhost:8080");

const oscPort = new OSC.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3333,
    metadata: true
});

oscPort.on("message", (oscMsg) => {
    if (oscMsg.address === "/tuio/2Dobj") {
        const comando = oscMsg.args[0].value;
        
        // 1. OGGETTO SUL TAVOLO (O IN MOVIMENTO)
        if (comando === "set") {
            const payload = JSON.stringify({
                type: "set",
                session_id: oscMsg.args[1].value, // ID della seduta (varia sempre)
                class_id: oscMsg.args[2].value,   // Il numero stampato sul marker
                x: oscMsg.args[3].value,
                y: oscMsg.args[4].value,
                angle: oscMsg.args[5].value
            });
            
            // Rimettiamo il razzo per farti vedere che Node sta lavorando!
            console.log(`🚀 [Node] Muovo ID: ${oscMsg.args[2].value} a X:${oscMsg.args[3].value.toFixed(2)}`);
            
            wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload); });
        } 
        
        // 2. L'APPELLO DI CHI E' ATTUALE SUL TAVOLO
        else if (comando === "alive") {
            let attivi = [];
            for (let i = 1; i < oscMsg.args.length; i++) {
                attivi.push(oscMsg.args[i].value); // Salviamo tutte le session_id presenti
            }
            
            const payload = JSON.stringify({
                type: "alive",
                session_ids: attivi
            });
            
            wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload); });
        }
    }
});

oscPort.open();
console.log("[Bridge Node] Ascolto reacTIVision su UDP 3333...");