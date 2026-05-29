const OSC = require("osc");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });
console.log("[Bridge] WebSocket pronto su ws://localhost:8080");

const oscPort = new OSC.UDPPort({
    localAddress: "127.0.0.1",
    localPort: 3333,
    metadata: true
});

oscPort.on("message", (oscMsg) => {
    // Filtriamo solo i messaggi che ci interessano
    if (oscMsg.address === "/tuio/2Dobj" || oscMsg.address === "/tuio/2Dcur") {
        const comando = oscMsg.args[0].value;
        
        if (comando === "set") {
            // Struttura dinamica: se è oggetto ha più dati, se è cursore ha solo X e Y
            const payload = {
                type: oscMsg.address, // "/tuio/2Dobj" o "/tuio/2Dcur"
                session_id: oscMsg.args[1].value
            };
			
			// Aggiungi questo subito dopo la creazione del JSON/Payload
if (oscMsg.address === "/tuio/2Dobj") {
    console.log(`📌 FIDUCIAL [ID: ${oscMsg.args[2].value}] -> Pos: ${oscMsg.args[3].value.toFixed(2)}, ${oscMsg.args[4].value.toFixed(2)}`);
} else if (oscMsg.address === "/tuio/2Dcur") {
    console.log(`🖐️ CURSORE [Session: ${oscMsg.args[1].value}] -> Pos: ${oscMsg.args[2].value.toFixed(2)}, ${oscMsg.args[3].value.toFixed(2)}`);
}

            if (oscMsg.address === "/tuio/2Dobj") {
                payload.class_id = oscMsg.args[2].value;
                payload.x = oscMsg.args[3].value;
                payload.y = oscMsg.args[4].value;
                payload.angle = oscMsg.args[5].value;
            } else {
                payload.x = oscMsg.args[2].value;
                payload.y = oscMsg.args[3].value;
            }

            const json = JSON.stringify(payload);
            wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(json); });
        } 
        else if (comando === "alive") {
            const payload = JSON.stringify({
                type: "alive",
                source: oscMsg.address, // Specifichiamo quale tipo di sorgente pulire
                session_ids: oscMsg.args.slice(1).map(a => a.value)
            });
            wss.clients.forEach(c => { if (c.readyState === WebSocket.OPEN) c.send(payload); });
        }
    }
});

oscPort.open();
