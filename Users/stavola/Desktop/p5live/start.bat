@echo off
echo ==================================================
echo AVVIO SISTEMA DI TRACCIAMENTO TUIO
echo ==================================================

:: 1. Avvia il server Node in una nuova finestra separata (così rimane attiva)
start "Server Tracking" cmd /k "node server2.js"

:: 2. Attendi 3 secondi per dare tempo al server di aprirsi
echo Attendo il server...
timeout /t 3 >nul

:: 3. Apre il browser sulla pagina del laboratorio
echo Avvio il laboratorio nel browser...
start "" "index.html"

echo ==================================================
echo Sistema avviato! 
echo Lascia aperta la finestra del server.
echo ==================================================
pause