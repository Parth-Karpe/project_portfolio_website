@echo off
echo Starting ProjectGate AI...
cd /d "%~dp0"

where node >nul 2>nul
if %errorlevel% equ 0 (
    echo Launching with Node.js server (Static + /api/chat Proxy - Zero CORS)...
    node server.js 4174
) else (
    echo Launching with Python static server...
    python -m http.server 4174 --bind 127.0.0.1 --directory dist
)
pause
