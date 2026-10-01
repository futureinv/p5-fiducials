@echo off
chcp 65001 >nul
echo ========================================================
echo             AVVIO SERVER E LOCALTUNNEL IN CORSO...
echo ========================================================
echo.

:: 1. Apre una finestra separata per il Server Node
start "SERVER_TUIO" cmd /k "node server4.js"

:: 2. Breve attesa per permettere al server di avviarsi sulla porta 8080
timeout /t 3 /nobreak >nul

echo.
echo [INFO] Sto attivando il tunnel pubblico...
echo - Ricordati di cambiare "https://" in "wss://" nel codice p5.js!
echo ========================================================
echo.

:: 3. Avvia Localtunnel direttamente in questa finestra.
:: L'indirizzo comparirà a schermo all'istante.
title LOCALTUNNEL_TUNNEL
npx localtunnel --port 8080

pause
