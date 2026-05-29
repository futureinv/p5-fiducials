@echo off
echo Avvio del sistema in corso...

:: 1. Apre una finestra separata per il Server Node
:: Il "title" serve per identificarla facilmente
start "SERVER_TUIO" cmd /k "node server.js"

:: 2. Breve attesa per permettere al server di inizializzare la porta 8080
timeout /t 2

:: 3. Apre una finestra separata per Ngrok
:: Rimarrà aperta così puoi copiare l'indirizzo con calma
start "NGROK_TUNNEL" cmd /k "ngrok http 8080"

echo.
echo ========================================================
echo Finito!
echo - Nella finestra 'SERVER_TUIO' vedrai i tuoi console.log.
echo - Nella finestra 'NGROK_TUNNEL' vedrai l'indirizzo HTTPS.
echo ========================================================
pause
