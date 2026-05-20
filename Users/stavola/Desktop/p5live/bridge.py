import asyncio
import socket
import struct
import json
import threading
import websockets

CLIENTS = set()

# Funzione per estrarre le stringhe dai byte del pacchetto OSC
def leggi_stringa(data, offset):
    start = offset
    while data[offset] != 0:
        offset += 1
    stringa = data[start:offset].decode('utf-8', errors='ignore')
    offset = (offset + 4) & ~3 # Allineamento a 4 byte standard OSC
    return stringa, offset

# Questo legge i dati UDP di reacTIVision a basso livello, senza librerie asincrone
def ascolta_reactivision():
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    sock.bind(("127.0.0.1", 3333))
    print("[Bridge] Ascolto nativo reacTIVision attivo su UDP 3333...")
    
    while True:
        try:
            data, addr = sock.recvfrom(65535)
            # Semplice parsing manuale del pacchetto TUIO
            if b'/tuio/2Dobj' in data:
                offset = data.find(b'/tuio/2Dobj')
                _, offset = leggi_stringa(data, offset) # Salta l'indirizzo
                types, offset = leggi_stringa(data, offset) # Legge i tipi (es. ",sifff...")
                
                # Cerchiamo se è un comando "set"
                cmd, offset = leggi_stringa(data, offset)
                if cmd == "set" and len(CLIENTS) > 0:
                    # Estraiamo i dati numerici (ID, X, Y, Angolo) basandoci sui tipi OSC
                    # i = int (4 byte), f = float (4 byte)
                    id_val = struct.unpack_from('>i', data, offset)[0]
                    x_val = struct.unpack_from('>f', data, offset + 4)[0]
                    y_val = struct.unpack_from('>f', data, offset + 8)[0]
                    angle_val = struct.unpack_from('>f', data, offset + 12)[0]
                    
                    print(f"[OSC Grezzo] ID: {id_val} -> X: {x_val:.2f}, Y: {y_val:.2f}")
                    
                    payload = json.dumps({
                        "id": id_val,
                        "x": x_val,
                        "y": y_val,
                        "angle": angle_val
                    })
                    
                    # Spediamo a p5.js usando il loop principale
                    for ws in CLIENTS:
                        try:
                            asyncio.run_coroutine_threadsafe(ws.send(payload), loop_principale)
                        except Exception:
                            pass
        except Exception as e:
            pass

async def socket_handler(ws):
    CLIENTS.add(ws)
    print(f"[Bridge] P5.js connesso! Client attivi: {len(CLIENTS)}")
    try:
        await ws.wait_closed()
    finally:
        CLIENTS.remove(ws)
        print(f"[Bridge] P5.js disconnesso. Client attivi: {len(CLIENTS)}")

async def main():
    global loop_principale
    loop_principale = asyncio.get_running_loop()
    
    # Facciamo partire l'ascolto UDP su un thread separato isolato
    threading.Thread(target=ascolta_reactivision, daemon=True).start()
    
    print("[Bridge] Server WebSocket in avvio...")
    async with websockets.serve(socket_handler, "localhost", 8080):
        print("[Bridge] Server WebSocket pronto su ws://localhost:8080")
        await asyncio.Future()

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n[Bridge] Server spento.")