const OSC = require("osc");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("[Bridge Node] Server WebSocket pronto su ws://localhost:8080");

let sessioniAttive = {}; // Qui teniamo il registro di chi è sul tavolo

const oscPort = new OSC.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3333,
    metadata: true
});

oscPort.on("message", (oscMsg) => {
    if (oscMsg.address === "/tuio/2Dobj") {
        const comando = oscMsg.args[0].value;

        // 1. IL MOMENTO DELL'APPELLO
        if (comando === "alive") {
            // Raccogliamo gli ID di tutti gli oggetti attualmente inquadrati
            let presenti = [];
            for (let i = 1; i < oscMsg.args.length; i++) {
                presenti.push(oscMsg.args[i].value);
            }

            // Controlliamo se qualcuno è stato rimosso dal tavolo
            for (let s_id in sessioniAttive) {
                if (!presenti.includes(parseInt(s_id))) {
                    const class_id = sessioniAttive[s_id];
                    // Diciamo a p5.js di CANCELLARLO
                    const payload = JSON.stringify({ action: "remove", id: class_id });
                    wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload); });
                    
                    delete sessioniAttive[s_id]; // Lo togliamo dal registro
                }
            }
        }
        
        // 2. IL MOMENTO DEL MOVIMENTO
        else if (comando === "set") {
            const s_id = oscMsg.args[1].value;
            const class_id = oscMsg.args[2].value;
            
            // Lo registriamo
            sessioniAttive[s_id] = class_id;

            // Diciamo a p5.js di AGGIORNARLO
            const payload = JSON.stringify({
                action: "update",
                id: class_id,
                x: oscMsg.args[3].value,
                y: oscMsg.args[4].value,
                angle: oscMsg.args[5].value
            });

            wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload); });
        }
    }
});

oscPort.open();
console.log("[Bridge Node] Ascolto reacTIVision attivo su UDP 3333...");